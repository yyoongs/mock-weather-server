"use strict"

var request = require('request')
var express = require('express')
var app = express()

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./modules/swagger.yaml');
const bodyParser = require("body-parser");
const axios = require('axios');
const { json } = require('express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io','http://localhost:3000/v1/auth'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

const port = 3000;
const host = "0.0.0.0"

// app.set("port",port)

app.listen(port,host,() => {console.log('Node.js Express server is running on docker local host port 3000...');
})

app.get('/v1/weather',(req,res) => {
  var authHeaderToken = req.headers.authorization.replace('Bearer ', '');

  if (authHeaderToken == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNob3lvbmdzIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkifQ.XFjI5dtX3wbvK4Ps9q2F4A48sUw041oLQoiDYdOn5dg") {
    const options = {
      uri: "https://api.openweathermap.org/data/2.5/weather",
      qs:{
        q:"corvallis",
        appid:"8a6f0159e2a07ce14b465d65c119d72b"
      }
    }
    request(options, (err,response,body) => {
        console.log(body)
        res.send("You are authorized user!\n\nHere is weather data : "+body)
        }
      )
  }
  else {
    res.send("Authorization failed.")
  }

    
  });

app.get('/v1/hello',(req,res) => {
  // res.send("hello world! Welcome to CS561 assignment4 test API!\ndata : test")  
  // get tocken by using v1/auth
  var authHeaderToken = req.headers.authorization.replace('Bearer ', '');
  console.log(authHeaderToken)
  if (authHeaderToken == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNob3lvbmdzIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkifQ.XFjI5dtX3wbvK4Ps9q2F4A48sUw041oLQoiDYdOn5dg") {
    res.send("hello world! Welcome to CS561 assignment4 test API!\nYou are authorized user!\n")
  }
  else {
    res.send("Authorization failed.")
  }
});
  
app.post('/v1/auth', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNob3lvbmdzIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkifQ.XFjI5dtX3wbvK4Ps9q2F4A48sUw041oLQoiDYdOn5dg"
  const now = new Date();
  now.setMinutes(now.getMinutes()-now.getTimezoneOffset());
  now.setDate(now.getDate() + 7);

  console.log("## post request"); 
  console.log(req.body); 
  console.log("## post request"); 
  console.log("User name = "+username+", password is "+password);

  if (username == "choyongs" && password=="123456789") {
    res.json({
      "AccessToken": jwt,
      "Expires": now
    })
  }
  else {
    res.send("Authentication failed")
  }
});
