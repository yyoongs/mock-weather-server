"use strict"

var request = require('request')
var express = require('express')
var app = express()

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./modules/swagger.yaml');
const bodyParser = require("body-parser");
const axios = require('axios')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
const host = "0.0.0.0"

// app.set("port",port)

app.listen(port,host,() => {console.log('Node.js Express server is running on docker local host port 3000...');
})

app.get('/v1/weather',(req,res) => {
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

app.get('/v1/hello',(req,res) => {
  // res.send("hello world! Welcome to CS561 assignment4 test API!\ndata : test")  
  // get tocken by using v1/auth
  var jsonData = {"username":"choyongs", "password":"123456789"}
  request.post({
    headers:{'content-type':'application/json'},
    url: 'http://localhost:3000/v1/auth',
    body: jsonData,
    json: true
  }, function(error, response,body){
    res.json(body);
  })

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
      "access-token": jwt,
      "expires": now
    })
  }
  else {
    res.send("Authentication failed")
  }
});
