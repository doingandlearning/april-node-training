---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---
# REST and Express

---

By the end of this section:

- Understand REST architecture
- Be able to use Express to implement REST
- Be able to compare/contrast Express with native http library
- Be able to reason about organising your code

---

# What are we discussing?

- Concepts
- Verbs
- Status Codes
- Headers
- API Contracts and Tooling

---

# The REST Pyramid of Greatness

<img src="/assets/ssss.png" />

---
layout: two-cols
---

# REST-ish

Anything but full Hypermedia

```
GET /characters
 
{
  "action": "POST",
  "data": {
    "user": {
      "id": 1,
      "name": "Luke Skywalker",
      "affilations": [
      	{
          "Jedi",
          "Rebels",
          "Resistance"
        }
      ]
    }
  }
}
```

::right::

```

GET /star-wars-characters

{
  "data": {
    "user": {
      {
        "id": 1,
        "name": "Luke Skywalker",
        "affilations": [
          {
            "Jedi",
            "Rebels",
            "Resistance"
          }
        ],
        "roles": [
          "star pilot",
          "death star killer"
        ],
        "weapon": "Lightsaber",
        "friends": [
          "Obi-Wan",
          "Biggs Darklighter",
          "Princess Leia",
          "Chewie",
          "Han Solo"
        ]
      },
      {
        "id": 2,
        "name": "Anakin Skywalker",
        "affilations": [
          {
            "Jedi",
            "Sith",
            "Empire",
            "Galatic Republic"
          }
        ],
        "roles": [
          "general",
          "star pilot",
          "pod racing",
          "youngling slayer"
        ],
        "weapon": "Lightsaber",
        "friends": [
          "Obi-Wan",
          "Palpatine",
          "Ahsoka Tano",
          "R2-D2",
          "Captain Rex"
        ]
      }
    }
  }
}
```

---

# What is REST?

- Representation State Transfer (REST)
- Theorized in a doctoral thesis by Roy Fielding in 2000.

6 Architectural Constraints

<v-clicks>

1. Client Server Architecture
2. Statelessness
3. Cacheability
4. Layered System
5. Code On Demand (optional)
6. Uniform Interface

</v-clicks>

---

# CORS

<v-clicks>

> Cross Origin Resource Sharing

Mechanism to determine is remote origin is allowed to access local server assets or data.

<i>The bane of every single developer.</i>

</v-clicks>

---

# HATEOAS

<v-clicks>

Hypermedia As The Engine Of Application State

Better described as, Links and Discoverability

```
	
GET /api/users
 
200 OK
 
Content-type: application/json
Etag: 0bba161a7165a211c7435c950ee78438
Cache-control: max-age=3600 // 1 hour
 
{
  "data": [
    {
      "id": 1,
      "name": "Luke Skywalker",
      "links": {
        "rel": "self",
        "href": "/api/users/1",
        "metbod": "GET"
      }
    },
    {
      "id": 2,
      "name": "Anakin Skywalker",
      "links": {
      	"rel": "self",
        "href": "/api/users/2",
        "method": "GET"
      }
    }
  ]
}
```

</v-clicks>

---

# Authentication

<v-clicks>

> Who the heck are you?

HTTP Basic - username & password

API Keys - random generated string, authentication only

OAuth - handles both authentication and authorization

</v-clicks>

---

# Authorization

> Are you allowed to do that?

---

# URI Best Practices

<v-clicks>

Resource Based instead Action Based

Pluralized

Hyphened instead of underscored

URIs should describe relationships

Use UUIDs for public API ids

</v-clicks>

---

# URIs 

<v-clicks>

GOOD https://api.starwars.com/characters

BAD https://api.starwars.com/get_characters

GOOD https://api.starwars.com/characters/ac5b605a-661e-4083-857f-d65e30e3467a
tip: you dont need to use the full uuid

BAD https://api.starwars.com/characters/1

</v-clicks>

---

# Verbs

Get
Post
Put
Patch
Delete
Options

---

# Verbs - Get

requests a representation of the specified resource

 
- No Request Body
- Response will have body
- Safe
- Idempotent
- Cacheable

---

# Verbs - Post

send data to the server to create a resource

- Request has body
- Response may have body
- Not Safe
- Not Idempotent
- Cacheable If Freshness Headers is provided

---

# Verbs - Put

update or create data on the server

- Request will have a body
- Successful response will not have body
- Not Safe
- Idempotent
- Not cacheable
- Status Codes: 201, 204

---

# Verbs - Patch
complete update of a resource on a server

- Request will have a body
- Response may have body
- Not Safe
- Not Idempotent
- Cacheable If Freshness Data is provided
- May be restricted via headers
- Status Codes: 200, 204

---

# Verbs - Delete
complete removal of a resource on a server

- Request may have body
- Response may have body
- Not Safe
- Not Idempotent
- Cacheable If Freshness Data is provided
- Status Codes: 200, 202, 204

---

# Verbs - Options

requests permitted communication options for a given URL or server

- Request will not have body
- Response will have body
- Safe
- Idempotent
- Not cacheable
- Status Codes: 204

---

# Status Codes

<v-clicks>

- 100s Informational
- 200s Success
- 300s Redirection
- 400s Client Errors
- 500s Server Errors

</v-clicks>

---

# Headers

Information sent with the request and response

4 Types of Headers

<v-clicks>

General Headers
Request Headers
Response Headers
Entity Headers

</v-clicks> 

---

# Headers - Accept | Content-Type

```
# Request
Accept: application/json
Accept: application/vnd.github+json 
Accept: application/xml
Accept: text/plain
Accept: text/csv

# Response
Content-type: application/json
Content-type: text/html
Content-type: text/csv
Content-type: application/vnd.github+json
```

These headers allow for content negotiation: where the server decides between the mime types which is best to send.

---

# Headers - Authorization

```
# Request
Authorization: Bearer 5eb63bbbe01eeed093cb22bb8f5acdc3
Authorization: Basic a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
```

---

# Headers - Cache-Control

```
# Request 
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: only-if-cached

# Response
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: public
Cache-Control: private
Cache-Control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-Control: s-maxage=<seconds>
```

---

# Headers - Location

```
# Response
Content-Location: /api/characters/3

Location: /api/characters/3
```

---

# Headers - Etag | Age | Last-Modified

```
# Response
Etag: 5eb63bbbe01eeed093cb22bb8f5acdc3

Age: 60 // in seconds

Last-modified: Wed, 24 Mar 2021-03-24 12:00:00 GMT // “HTTP-date” format as defined by RFC 7231
```

---

# Headers - Content-length | Content-language | Expires

```
# Response
Content-length: 128 // represented by 8-bit bytes

Content-language: en

Expires: Tue, 29 Mar 2021 23:59:59 GMT
```

---

# Headers - CORS

```
Access-Control-Allow-Origin
Access-Control-Allow-Credentials
Access-Control-Expose-Headers
Access-Control-Max-Age
Access-Control-Allow-Methods
Access-Control-Allow-Headers
```

---

# API Contracts

What Is An API Contract?

> It is something that both API provider and API consumer can agree upon, and get to work developing and delivering, and then integrating and consuming. An API contract is a shared understanding of what the capabilities of a digital interface are, allowing for applications to be programmed on top of.

---

# OpenAPI

The artist formerly known as Swagger

A description language that allows for documentation generation, testing, SDK generation, and more.

The resulting file creates the "contract" that both the server and client can reliable consume.

---

# OpenAPI

<img src="/assets/OpenAPIDrivenDevelopment.png" />

---

# Tooling

- Postman - HTTP Testing
- Paw (Mac Only)  - HTTP Testing
- HTTPie (CLI)  - HTTP Testing
- Insomnia  - HTTP Testing
- Postwoman  - HTTP Testing
- Stoplight Studio - Documentation
- Stoplight Spectral - Linting 
- Dredd.io - Testing
- jq - CLI JSON map/filter/slice

---

# What is Express?

A framework intended to overcome some common development challenges.

It's the most popular but not necessarily the best!

It has a large community and you can find help easily around the web.

---

# Why Express?

Really? Popularity and ease of use.

Alternatives:
- HAPI 
- fastify
- Total
- Koa

---

# Express HelloWorld

---

# Express HTTP methods and urls

---

# Express Middleware

```js
function myMiddleware(request, response, next) {
  // do something with the request
  // change the response or finish it 
  // call the next function
}
```

---

# Serving Static Files

```js
app.use(express.static("public"))
```

---
layout: two-cols
---

# Router file

In birds.js:

```js
const router = require('express').Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```

::right::

Then, load the router module in the app:

```js
const birds = require('./birds')

// ...

app.use('/birds', birds)
```

---

# Template Engines

This is no longer a huge use case for Node but you can have Node serve your whole app, with no separate front end.

There are a number of templating engines that you combine with views/routes to generate these.

There is a list [here](https://expressjs.com/en/resources/template-engines.html) but as this is less relevant to the ecosystem these libraries have largely fallen out of use.

---
layout: two-cols
---
# Parsing and Responding with JSON

## Body Parsers

<v-clicks>

- express.json()
- express.urlencoded()

</v-clicks>

<div v-click="3">

```js
app.use(express.json())
app.use(express.urlencoded())
```
</div>

::right:: 

## Response methods
<div v-click="4">

| | |
| --- | --- |
| Method	| Description |
| res.download() |	Prompt a file to be downloaded.|
| res.end()	|End the response process. |
| res.json() |	Send a JSON response. |
| res.jsonp()	| Send a JSON response with JSONP support. |
| res.redirect() |	Redirect a request. |
| res.render() |	Render a view template. |
| res.send()	 | Send a response of various types. |
| res.sendFile() |	Send a file as an octet stream. |
| res.sendStatus() |	Set the response status code and send its string representation as the response body. |
</div>
---

# Express Application Generator

```bash
npx express-generator
```

---
layout: two-cols
---

# Project structure top tips

<v-clicks>

- Create a folder structure
- Separate business logic and API routes
- Use a service layer
- Use a config folder to organize configuration files
- Establish a scripts folder for long npm scripts

</v-clicks>

<img v-click="4" src="assets/config-folder.avif">
<img v-click="5" src="assets/scripts-folder.png">

::right::

<img v-click="1"  src="assets/folder-structure.png">
<img v-click="3" src="assets/business-logic-api-routes-1.avif">

---

# Exercise

1. Refactor our http based API to Express. 

Can you:
- Extract the route into a separate file/folder
- Parse and send JSON


