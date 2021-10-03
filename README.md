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

7. Install node module

    ```npm i```
8. Start react server :
 
    ```npm start```
9. You can view the webapp by going to the [localhost:3000](http://127.0.0.1:3000/) on you web browser.

## Documents 
You can find the [api guide](https://github.com/Priyanka7011/medHacks-medikit/blob/main/api/README.md) in the api folder.

You can find the [frontend guide](https://github.com/Priyanka7011/medHacks-medikit/blob/main/frontend/README.md) in the frontend folder.

## What it does
Our App allows the patient  to consult with the doctor regarding the medicines availability and prices of medicine nearby the patient, and discuss the total cost of the prescription with the doctor. ( So that doctor can suggest better alternative ).

## How we built it
- Backend : **Django**
- Frontend : **React**
- VC Server : **Socket io**
- Database : **CockroachDB**
- Nearby Api : [**mapmyindia**](https://www.mapmyindia.com/api/advanced-maps/doc/nearby-api#/)

## What's next for MedGuide
- Categorising medicines
- Adding OAuth2
- Integrating Google Maps
- Adding chat to VC
- Read prescription from image
- Finding the best price for prescription

### Contributors :
<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/Priyanka7011">
            <img src="https://avatars.githubusercontent.com/u/54627940?v=4" width="100;" alt="Priyanka7011"/>
            <br />
            <sub><b>Priyanka Kumari</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/manan2110">
            <img src="https://avatars.githubusercontent.com/u/55996661?v=4" width="100;" alt="manan2110"/>
            <br />
            <sub><b>Manan Gyanchandani</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Ayush6602">
            <img src="https://avatars.githubusercontent.com/u/54628493?v=4" width="100;" alt="Ayush6602"/>
            <br />
            <sub><b>Ayush Das</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->