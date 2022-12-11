const { application } = require("express");
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/db");
const morgan = require("morgan");
// const swaggerDocs=require('./swagger')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = 9988;
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const swaggerDocument = require('./swagger-output.json');
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NeoFood API",
      version: "1.0.0",
      description: " API Information",
    },
    servers: [{ url: "http://localhost:9988", description: "local dev" }],
    // paths: {
    //   "/food/trending_food": {
    //     get: {
    //       tags: ["food"],
    //       description: "trending food",
    //       responses: {
    //         description: "OK",
    //         content:{
    //           "application/json":{
    //             schemas:{
    //               type:"object"
    //             }
    //           }

    //         }
    //       },
    //     },
    //   },
    // },
  },
  apis: [".routes/*.js"],
  // ['.routes/*.js']
};
// const specs = swaggerJsDoc(swaggerDocument);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("uploads")); //for img

app.use(cors());
//load routes
const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/", foodRoutes);
app.use("/", userRoutes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("work on 9988");
});
connectDB();
