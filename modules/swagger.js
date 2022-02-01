const swaggerUi = require('swagger-ui-express'); 
const swaggereJsdoc = require('swagger-jsdoc'); 
const express = require('express');

const options = {
  swaggerDefinition: { 
    info: { 
      title: 'Test API',
      version: '1.0.0',
      description: 'Test API with express' 
    }, 
    host: 'localhost:3000', 
    basePath: '/'
  }, 
  apis: [__dirname + '/../routes/*.js', './swagger/*'] };     

const specs = swaggereJsdoc(options); 

module.exports = { 
  swaggerUi, 
  specs
};
