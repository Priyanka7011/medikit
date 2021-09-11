## API

### Models

-   **Cart :**

    ```json
    {
    	"items": "[Item]",
    	"total_amount": "(int) total number of items in cart",
    	"total_price": "(float) total price of all items"
    }
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

    -   `id:` key of the item to be added to cart
    -   `amount:` amount of item to be in cart

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
