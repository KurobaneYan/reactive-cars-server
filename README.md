# reactive cars server

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

it's a server for [reactive caps](https://github.com/KurobaneYan/reactive-cars), by default it runs on port 4000

## download dependencies

```sh
$ yarn
```

or

```sh
$ npm install
```

## run it

```sh
$ yarn start
```

or

```sh
$ npm start
```

## routes

| Route | HTTP Verb | Description |
| ----- | ----- | ----- |
| / | GET | Get all cars |
| /catalog | GET | get a catalog of cars |
| /show/:id | GET | get a car by id with incremented views field |
| /create | POST | create a new car |
| /read/:id | GET | get a car |
| /update/:id | PUT | update a car |
| /delete/:id | DELETE | get a car |

## examples

request: `GET /catalog`

response:
```json
{
  "Mitsubishi": ["Lancer"],
  "BMW": ["I6", "X7"]
}
```

request: `PUT /update/5946448342f6c140084be79a`

request body:

```json
{
	"manufacturer": "Dodge",
	"model": "Viper",
	"year": 2017,
	"kilometrage": 381,
	"fuelType": "Gasoline",
	"engineDisplacement": 4000,
	"transmissionType": "Manual",
	"price": 350000,
	"views": 382,
	"photos": [
		"https://www.mitsubishi-motors.ca/media/vehicle/nav/15LanEvoFE_Titanium-Grey_09_medium.png"
	]
}
```

response:

```json
{
	"_id": "5946448342f6c140084be79a",
	"manufacturer": "Dodge",
	"model": "Viper",
	"year": 2017,
	"kilometrage": 381,
	"fuelType": "Gasoline",
	"engineDisplacement": 4000,
	"transmissionType": "Manual",
	"price": 350000,
	"views": 382,
	"__v": 0,
	"photos": [
		"https://www.mitsubishi-motors.ca/media/vehicle/nav/15LanEvoFE_Titanium-Grey_09_medium.png"
	]
}
```
