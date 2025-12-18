**'GET/api/categories'**

**Authorization Required** 
Yes

**Request Header**
Authorization = Bearer Access Token
Content-Type = application/json

**RequestBody** 
None


**Response**
JSON object containing status and an aarray of categories

**Status Code**
200 - Ok
401 - User is not authorized
500 - Internal Server error

**POST /api/categories**
post new categories to the DB

**Authorization Required**
Yes

**Request Header**
Authorization = Bearer Access Token 
Content-Type = application/json

**Request Body**
id
created _at
name
user_id
type
account_id
isActive
is_system

**Status Code**
200 - Ok
401 - User is not authorized
500 - Internal Server error

**Response**
Status code with a JSON response hohling an object with the response body


**PUT /api/categories**
update categories in the DB

**Authorization Required**
Yes

**Request Header**
Authorization = Bearer Access Token 
Content-Type = application/json

**Request Body**
id
created _at
name
user_id
type
account_id
isActive
is_system

**Status Code**
200 - Ok
401 - User is not authorized
500 - Internal Server error

**Response**
Status code with a JSON response holding an object with the response body


**DELETE /api/categories**
delete categories in the DB

**Authorization Required**
Yes

**Request Header**
Authorization = Bearer Access Token 
Content-Type = application/json

**Request Body**
id
created _at
name
user_id
type
account_id
isActive
is_system

**Status Code**
200 - Ok
401 - User is not authorized
500 - Internal Server error

**Response**
Status code with a JSON response hohling an object with the response body
