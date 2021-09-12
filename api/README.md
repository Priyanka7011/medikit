## API

### Models
-   **Item :**

    ```json
    {
    	"id": "(int) item id",
    	"name": "(str) item name",
    	"amount": "(int) item amount available in pharmacy",
    	"price": "(float) item price sold by pharmacy",
    	"retail_price": "(float) item MRP",
    	"image_url": "(str) item image url"
    }
    ```
    
-   **Cart :**

    ```json
    [
        "{item_id}":"{item_amount}"
    ]
    ```

-   **Pharmacy :**
    ```json
    {
    	"distance": "(int) distance from location",
    	"eLoc": "(str) location id",
    	"orderIndex": "(int) index if in list",
    	"placeAddress": "(str) address of pharmacy",
    	"placeName": "(str) name of pharmacy"
    }
    ```

### Get Nearby Pharmacies

-   **URL :** `/api/pharmacy/`

-   **Method :** `GET`

-   **Params :**

    -   `latitude:` (float) location latitude
    -   `longitude:` (float) location longitude

-   **Responses:**

    -   STATUS 200 OK

    ```json
    {
    	"status": "200 OK",
    	"nearby_pharmacies": "[Pharmacy(sorted nearest to farthest)]"
    }
    ```

    -   STATUS 400 BAD REQUEST

    ```json
    {
    	"status": "400 BAD REQUEST",
    	"Bad request": "longitude/latitude missing"
    }
    ```

### Get Details of Pharmacy

-   **URL :** `/api/pharmacy/<str:pharmacy_id>/`

-   **Method :** `GET`

-   **Responses:**

    -   STATUS 200 OK

    ```json
    {
    	"status": "200 OK",
    	"pharmacy": "{Pharmacy}"
    }
    ```

    -   STATUS 404 NOT FOUND

    ```json
    {
    	"status": "404 NOT FOUND",
    	"Not found": "Cannot find the pharmacy you are looking for"
    }
    ```

### Get Cart

-   **URL :** `/api/cart/`

-   **Method :** `GET`

-   **Responses:**

    -   STATUS 200 OK

    ```json
    {
    	"cart": "{Cart}"
    }
    ```

    -   STATUS 400 BAD REQUEST

    ```json
    {
    	"Bad request": "longitude/latitude missing"
    }
    ```

### Add Item To Cart

-   **URL :** `/api/cart/`

-   **Method :** `POST`

-   **Data :**

    -   `username:` username of the user
    -   `total_amount:` total amount
    -   `total_price:` total price
    -   `cart:` "{Cart}"

-   **Responses:**

    -   STATUS 200 OK

    ```json
    {
    	"cart": "{Cart}"
    }
    ```

    -   STATUS 400 BAD REQUEST

    ```json
    	{
    		"Bad request": "id missing"
    	}
    	{
    		"Bad request": "amount missing"
    	}
    ```

    -   STATUS 404 NOT FOUND

    ```json
    {
    	"Not Found": "item with id ID not found"
    }
    ```

    -   STATUS 416 REQUESTED RANGE NOT SATISFIABLE

    ```json
    {
    	"Invalid range": "ITEM_NAME out of stock"
    }
    ```

### Postman Example :

[Link](https://www.getpostman.com/collections/a34e4c67768d49335e69)

```json
{
    "info": {
        "_postman_id": "b961f515-6181-497c-ac2d-c4039e19b9ff",
        "name": "Medikit api calls",
        "schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
    },
    "item": [
        {
            "name": "Nearby Pharmacies",
            "id": "5c078031-75fc-4151-a1d5-a60c53ae825d",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "localhost:8000/api/pharmacy?latitude=23.2587264&longitude=77.4569984",
                    "host": [
                        "localhost"
                    ],
                    "port": "8000",
                    "path": [
                        "api",
                        "pharmacy"
                    ],
                    "query": [
                        {
                            "key": "latitude",
                            "value": "23.2587264"
                        },
                        {
                            "key": "longitude",
                            "value": "77.4569984"
                        }
                    ]
                },
                "description": "Nearby Pharmacies"
            },
            "response": []
        },
        {
            "name": "Pharmacy Details",
            "id": "d8109b71-4a80-4319-926e-e45cdc25a20e",
            "request": {
                "method": "GET",
                "header": [],
                "url": "http://localhost:8000/api/pharmacy/09UIEC"
            },
            "response": []
        },
        {
            "name": "Cart",
            "id": "6726f17b-5898-4819-8257-34e2574ec201",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "http://localhost:8000/api/cart/?username=1/",
                    "protocol": "http",
                    "host": [
                        "localhost"
                    ],
                    "port": "8000",
                    "path": [
                        "api",
                        "cart",
                        ""
                    ],
                    "query": [
                        {
                            "key": "username",
                            "value": "1/"
                        }
                    ]
                }
            },
            "response": []
        },
        {
            "name": "Cart",
            "id": "5a5b5e08-1521-48f9-8c9e-9e1d4b1edf95",
            "request": {
                "method": "POST",
                "header": [],
                "body": {
                    "mode": "raw",
                    "raw": "{\"username\":\"1\",\"cart\":{},\"total_amount\":0,\"total_price\":0}",
                    "options": {
                        "raw": {
                            "language": "json"
                        }
                    }
                },
                "url": "http://localhost:8000/api/cart/"
            },
            "response": []
        }
    ]
}
```