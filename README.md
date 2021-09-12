# Medikit
## How to run 
1. Clone the repo to your local system

    ```git clone https://github.com/manan2110/MedGuide.git ```
2. Create a virtual environment. You can use this [link](https://docs.python.org/3/library/venv.html) for reference.

    ``` python -m venv venv ```
3. Activate your virtual environment using : 
    
    ```venv/Scripts/activate``` 
    
    Here venv is the name of virtual environment.

4. Install all the requirements required to run the project : 
    
    ```pip install -r requirements.txt```

5. Run the django server : 
    
    ```python manage.py runserver```

6. In another terminal change directory to server :

    ``` cd server ``` 
7. Install node module

    ```npm i```
8. Start the VC server

    ```npm start ```

6. In another terminal change directory to frontend :

    ``` cd frontend ``` 
7. Install node module

    ```npm i```
8. Start react server :
 
    ```npm start```
9. You can view the webapp by going to the [localhost:3000](http://127.0.0.1:3000/) on you web browser.

## Documents 
You can find the [api guide](https://github.com/Priyanka7011/medHacks-medikit/blob/main/api/README.md) in the api folder.

You can find the [frontend guide](https://github.com/Priyanka7011/medHacks-medikit/blob/main/frontend/README.md) in the frontend folder.
## Inspiration
During covid-19 people were under a lot of mental stress because they could not access medical facilities, which include access to medicines, consultancy and much more as freely as they could before. Also, previously doctors prescribed medicines without the knowledge of availability and cost of them near the patient which caused inconvenience to many people.

## What it does
Our App allows the patient  to consult with the doctor regarding the medicines availability and prices of medicine nearby the patient, and discuss the total cost of the prescription with the doctor. ( So that doctor can suggest better alternative ).

## How we built it
- Backend : **Django**
- Frontend : **React**
- VC Server : **Socket io**
- Database : **CockroachDB**
- Nearby Api : [**mapmyindia**](https://www.mapmyindia.com/api/advanced-maps/doc/nearby-api#/)

## Challenges we ran into
- ### Using django asgi :
    - Most api(s) in django use django-rest-framework which does not support async, so we have do all its work our self.
    - Using django ORM async.
    - Using djnago sessions async.
    - Using django auth async.

- ### Integrating django with React :
    - using the same session for requests in React.
    - bypassing cors in django.
    - making react use django csrf tokens.
    - using url encoded data in React.

- ### Using mapmyindia api :
    - nearby api had a small limit for free use.
    - using their token based auth.

- ### Using Sawo :
    - Using sawo auth in django and react.
    - Using sawo integration documentation.

- ### Integrating CockroachDB with django:
    - Cockroach uses ssl certificate based authentication.

- ### Integrating Twilio with django:
    - Understanding the twilio-django sample app was a bit challenging.
    
## Accomplishments that we're proud of
We are proud that we were able to address an important problem and build a product that could help solve it.

## What we learned
We learned from every challenged we faced.
- Using django asgi
- Integrating django with React
- Using mapmyindia api
- Using Sawo 
- Using CockroachDB
- Using Twilio

## What's next for MedGuide
- Categorising medicines
- Adding OAuth2
- Integrating Google Maps
- Adding chat to VC
- Read prescription from image
- Finding the best price for prescription

### Contributors :
<!-- readme: contributors -start -->

<!-- readme: contributors -end -->
