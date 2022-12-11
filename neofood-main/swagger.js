const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  autoBody: false,
  autoHeaders: false,
};
require("dotenv").config();

const swaggerAutogen = require("swagger-autogen")(options);
console.log(process.env.baseUrlForApi);

const doc = {
  info: {
    version: "1.0.0", // by default: '1.0.0'
    title: "NeoFood", // by default: 'REST API'
    description: "This API is for NeoFood.", // by default: ''
  },
  host: process.env.baseUrlForSwagger || "localhost:9988", // by default: 'localhost:3000'
  basePath: "/", // by default: '/'
  schemes: ["http", "https"], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    {
      name: "Food",
      description: "Endpoints",
    },
    {
      name: "User",
      description: "Endpoints",
    },
  ],
  securityDefinitions: {
    authorization: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
