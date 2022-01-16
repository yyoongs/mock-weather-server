"use strict"

var request = require('request')
var express = require('express')
var app = express()

app.listen(3000)
console.log('Node.js Express server is running on port 3000...')

app.get('/data/2.5/weather',(req,res) => {
    const options = {
      uri: "https://api.openweathermap.org/data/2.5/weather",
      qs:{
        q:"corvallis",
        appid:"8a6f0159e2a07ce14b465d65c119d72b"
      }
    }
    request(options, (err,response,body) => {
        console.log(body)
        res.send(body)

    })});

