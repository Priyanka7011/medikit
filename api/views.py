import asyncio
import random
import environ
import aiohttp
import json
from traceback import print_exc
from django.http import HttpRequest, JsonResponse
from django.db.models.query import QuerySet
from django.conf import settings
from django.core.serializers import serialize
from asgiref.sync import sync_to_async
from .models import *

env = environ.Env()
env.read_env(str(settings.BASE_DIR / ".env"))
map_my_india_api = "https://atlas.mapmyindia.com"
map_my_india_ids = env.list("MAP_MY_INDIA_IDS")
map_my_india_secrets = env.list("MAP_MY_INDIA_SECRETS")
map_my_india_idx = 0
token_api = "/api/security/oauth/token"
nearby_api = "/api/places/nearby/json"
default_json_response = JsonResponse({"Forbidden": "wrong method"}, status=403)


async def get_auth_header(session: aiohttp.ClientSession) -> str:
    """Generates tokens by cycling through all ids and secrets"""
    global map_my_india_idx
    async with session.post(
        url=map_my_india_api + token_api,
        data={
            "grant_type": "client_credentials",
            "client_id": map_my_india_ids[map_my_india_idx],
            "client_secret": map_my_india_secrets[map_my_india_idx],
        },
    ) as res:
        map_my_india_idx = (map_my_india_idx + 1) % len(map_my_india_ids)
        res_json = await res.json()
        return res_json["token_type"] + " " + res_json["access_token"]


async def get_request_data(request: HttpRequest, method: str, **kwargs) -> dict:
    """Checks if the request contains the required data"""
    data = {}
    for key, val_type in kwargs.items():
        val = request.__getattribute__(method).get(key)
        if val is None:
            return {"Bad Request": f"{key} missing"}
        try:
            val = val_type(val)
        except ValueError as _:
            return {"Bad Request": f"{key} must be {val_type.__name__}"}
        data[key] = val
    return data


def is_authenticated(request: HttpRequest) -> bool:
    """wrapper function for use with sync_to_async"""
    return request.user.is_authenticated


async def json_serializer(queryset: QuerySet) -> list[dict]:
    qjsons_str = await sync_to_async(serialize)("json", queryset)
    qjsons = json.loads(qjsons_str)
    for qjson in qjsons:
        qjson.pop("model")
        qjson.update(qjson.pop("fields"))
    return qjsons


# Create your views here.


async def index(request: HttpRequest):
    return default_json_response


# cart related views


async def cart(request: HttpRequest):

    if request.method == "GET":
        cart_object = await sync_to_async(Cart.objects.filter)(
            username=request.GET["username"]
        )
        if await sync_to_async(cart_object.if_exists)():
            cart_object = await sync_to_async(cart_object.first)()
            return JsonResponse({"cart": cart_object.cart_json}, status=200)
        return JsonResponse({"cart": {}}, status=200)

    if request.method == "POST":
        body = json.load(request)
        cart_object = await sync_to_async(Cart.objects.filter)(
            username=body["username"]
        )
        if await sync_to_async(cart_object.if_exists)():
            cart_object = await sync_to_async(cart_object.first)()
            cart_object.cart_json = body["cart"]
        else:
            cart_object = Cart(username=body["username"], cart=body["cart"])
        await sync_to_async(cart_object.save)()
        return JsonResponse({"cart": cart_object.cart_json}, status=200)

    return default_json_response


# pharmacy realated views


async def get_nearby_pharmacies(session: aiohttp.ClientSession, location: str) -> dict:
    """Gets nearby pharmacies from mapmyindia api"""
    async with session.get(
        url=map_my_india_api + nearby_api,
        headers={
            "Authorization": await get_auth_header(session),
        },
        params={
            "keywords": "pharmacy",
            "refLocation": location,
        },
    ) as res:
        return await res.json()


async def pharmacy_get_nearby(request: HttpRequest):
    data, nearby_pharmacies = await asyncio.gather(
        get_request_data(request, "GET", latitude=str, longitude=str),
        sync_to_async(request.session.get)("nearby_pharmacies"),
    )
    if "Bad Request" in data:
        return JsonResponse(
            data,
            status=400,
        )
    location = data["latitude"] + "," + data["longitude"]
    if nearby_pharmacies is not None:
        # was present in session
        print("from session")
        return JsonResponse(
            {"nearby_pharmacies": nearby_pharmacies},
            status=200,
        )
    # not in session
    async with aiohttp.ClientSession() as session:
        # send request till we get response
        res = await get_nearby_pharmacies(session, location)
        while "suggestedLocations" not in res:
            res = await get_nearby_pharmacies(session, location)
        nearby_pharmacies = res["suggestedLocations"]
        # fill response with images and items
        # TODO: convert list of items to json
        items = []
        json_data = open("frontend/src/res.json")
        data1 = json.load(json_data)
        for i in data1["nearby_pharmacies"]:
            items.extend(i["items"])
        items_json = items
        random.shuffle(items_json)
        item_start_idx = 0
        item_skip = len(items_json) // len(nearby_pharmacies)
        for nearby_pharmacy in nearby_pharmacies:
            nearby_pharmacy["items"] = items_json[
                item_start_idx : item_start_idx + item_skip
            ]
            item_start_idx += item_skip
            nearby_pharmacy["image_url"] = items_json[item_start_idx - 1]["image_url"]
    request.session["nearby_pharmacies"] = nearby_pharmacies
    return JsonResponse({"nearby_pharmacies": nearby_pharmacies}, status=200)


async def pharmacy_get(request: HttpRequest, pharmacy_eloc: str):
    nearby_pharmacies = await sync_to_async(request.session.get)("nearby_pharmacies")
    if nearby_pharmacies is None:
        return JsonResponse(
            {"Precondition Required": "call with location first"},
            status=428,
        )
    for nearby_pharmacy in nearby_pharmacies:
        if nearby_pharmacy["eLoc"] == pharmacy_eloc:
            return JsonResponse({"pharmacy": nearby_pharmacy}, status=200)
    return JsonResponse(
        {"Not Found": f"pharmacy with eLoc {pharmacy_eloc} not found"},
        status=404,
    )


async def pharmacy(request: HttpRequest, pharmacy_eloc: str = None):
    try:
        if request.method == "GET":
            if pharmacy_eloc is not None:
                return await pharmacy_get(request, pharmacy_eloc)
            return await pharmacy_get_nearby(request)
    except Exception as _:
        print_exc()
    return default_json_response


async def update(request: HttpRequest, pharmacy_eloc: str = None):
    try:
        if request.method == "GET":
            if pharmacy_eloc is not None:
                return await pharmacy_get(request, pharmacy_eloc)
            return default_json_response
            return await pharmacy_get_nearby(request)
    except Exception as _:
        print_exc()
    return default_json_response
