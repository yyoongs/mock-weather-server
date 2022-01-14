"use strict"

var express = require('express')
var app = express()

app.listen(3000)
console.log('Node.js Express server is running on port 3000...')

app.get('/',get_weather)

function get_weather(request, response) {
  response.json({"temperature_infarenheit":52})
}
