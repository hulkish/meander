# geocoding-exercise-app

## Prerequisites
* Node.js >= 6.9.2
* npm >= 4.0.5

## Setup

###/api/service1
* Similar to `/api/service2`, except with the benefits of [GraphQL](http://graphql.org/)

##### usage examples
```sh
# compressed
curl -v -X POST --compressed \
-H "Accept-Encoding: gzip,deflate" \
-H "Accept: application/graphql" \
-d ''
"http://localhost:3000/api/service2"
```
```sh
# not compressed
curl -v -X POST \
-H "Accept: application/json" \
"http://localhost:3000/api/service2"
```
