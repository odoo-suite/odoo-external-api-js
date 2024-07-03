# ODOO External API JS

## Project setup

```
npm install
```

## Environment Variables

```
ENVIRONMENT=development
PORT=3000
ODOO_URL=http://127.0.0.1:8069
ODOO_DATABASE=database_name
ODOO_USERNAME=username@mail.com
ODOO_PASSWORD=password123
JWT_SECRET=secret-token
JWT_EXPIRATION=4h
CRYPTO_PASSWORD=millavedeencriptacion
CRYPTO_SALT=10
CRYPTO_KEYSIZE=48
CRYPTO_ITERATIONS=256
```

### Compiles and hot-reloads for development
```
nodemon index.js
```

### Compiles and minifies for production
```
npm run start
```

## Requests

### Base URL
`http://localhost:3000/api/v1/`

### Get Version
#### Request
> GET `http://localhost:3000/api/v1/base/`

##### Result:
```json
{
    "payload": {
        "server_version": "15.0+e-20230227",
        "server_version_info": [
            15,
            0,
            0,
            "final",
            0,
            "e"
        ],
        "server_serie": "15.0",
        "protocol_version": 1
    },
    "success": true,
    "message": "Version"
}
```

### Connection test 
#### Request
> GET `http://localhost:3000/api/v1/base/connection`

#### Result:
```json
{
    "payload": 2, // uid odoo user
    "success": true,
    "message": "Connection"
}
```

### Open Connection with JWT 
#### Request
> POST `http://localhost:3000/api/v1/base/session`

Data encrypted with crypto utils (crypto-js):
```json
{
    "database": "aOhHDPfqD=",
    "username": "P+rwwYY1g=",
    "password": "OSsO5tu0a="
}
```
It is recommended to encrypt your data to send it in the body of the request.

#### Result:
```json
{
    "payload": {
        "access_token": "access-token",
        "refresh_token": "refresh-token",
        "uid": 2 // uid odoo user
    },
    "success": true,
    "message": "Session"
}
```

### Refresh Token JWT
> POST `http://localhost:3000/api/v1/base/refresh`

#### Request

```json
{
    "refresh": "refresh-token"
}
```

#### Result

```json
{
    "payload": {
        "access_token": "access-token",
        "refresh_token": "refresh-token",
        "uid": 2 // uid odoo user
    },
    "success": true,
    "message": "Refresh"
}
```

## Data Query Requests
### Endpoint Query Request
> POST `http://localhost:3000/api/v1/query`

The Bearer token generated on the Open Connection with JWT endpoint is required (access_token).
### List records
#### Request
```json
{
    "model": "res.partner",
    "method": "search", 
    "where": [[["active", "=", "True"]]]
}
```
#### Result
```json
{
    "payload": [
        1,
        2,
        3,
        4
    ],
    "success": true,
    "message": "Query"
}
```

### Pagination using offset and limit
#### Request
```json
{
    "model": "res.partner",
    "method": "search",
    "where": [[["active", "=", "True"]]],
    "params": { "limit": 2, "offset": 10 }
}
```

#### Result
```json
{
    "payload": [
        398,
        16,
        415,
        390,
        400,
        399,
        3,
        406,
        405,
        404
    ],
    "success": true,
    "message": "Query"
}
```

### Listing record fields
```json
{
    "model": "res.partner",
    "method": "fields_get",
    "where": [],
    "params": {}
}
```

#### Result
```json
{
    "payload": {
        "name": {
            "type": "char",
            "change_default": false,
            "company_dependent": false,
            "depends": [],
            "manual": false,
            "readonly": false,
            "required": false,
            "searchable": true,
            "sortable": true,
            "store": true,
            "string": "Asentamiento",
            "translate": false,
            "trim": true,
            "name": "name"
        },
        "id": {
            "type": "integer",
            "change_default": false,
            "company_dependent": false,
            "depends": [],
            "manual": false,
            "readonly": true,
            "required": false,
            "searchable": true,
            "sortable": true,
            "store": true,
            "string": "ID",
            "name": "id"
        },
        {...},
    },
    "success": true,
    "message": "Query"
}
```

### Count records
#### Request
```json
{
    "model": "res.partner",
    "method": "search_count",
    "where": [[["active", "=", "True"]]]
}
```
#### Result
```json
{
    "payload": 45, // Count
    "success": true,
    "message": "Query"
}
```

### Search and read
#### Request
```json
{
    "model": "res.partner",
    "method": "search_read",
    "where": [[["active", "=", "True"]]],
    "params": { "fields": [ "id", "name"], "limit": 2}
}
```
#### Result
```json
{
    "payload": [
        {
            "id": 1,
            "name": "BARRY ALLEN"
        },
        {
            "id": 2,
            "name": "BRUCE WAYNE"
        }
    ],
    "success": true,
    "message": "Query"
}
```

### Create record
#### Request
```json
{
    "model": "res.partner",
    "method": "create",
    "where": [[
        {
            "name": "CLARK KENT"
        }
    ]]
}
```
#### Result
```json
{
    "payload": [
        31322
    ],
    "success": true,
    "message": "Query"
}
```

### Update record
#### Request
```json
{
    "model": "res.partner",
    "method": "write",
    "where": [[31322], { "name": "CLARK KENT SUPERMAN" }]
}
```
#### Result
```json
{
    "payload": true,
    "success": true,
    "message": "Query"
}
```
### get record name after having changed it
#### Request

```json
{
    "model": "res.partner",
    "method": "name_get",
    "where": [[31322]]
}
```

#### Result

```json
{
    "payload": [
        [
            31322,
            "CLARK KENT SUPERMAN"
        ]
    ],
    "success": true,
    "message": "Query"
}
```

### Delete record

#### Request

```json
{
    "model": "res.partner",
    "method": "unlink",
    "where": [[31322]]
}
```

#### Result

```json
{
    "payload": true,
    "success": true,
    "message": "Query"
}
```

### Custom method

#### Request

```json
{
    "model": "res.partner",
    "method": "my_new_custom_method",
    "where": [false, "PÚBLICO EN GENERAL", "XAXX010101000"]
}
```

#### Odoo Custom method
```py
from odoo import fields, models, api, _

class ResPartner(models.Model):
    _inherit = "res.partner"

    def my_new_custom_method(self, business_name, vat):
        return True
```

#### Result

```json
{
    "payload": true,
    "success": true,
    "message": "Query"
}
```