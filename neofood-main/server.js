const { application } = require("express");
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/db");
const swaggerDocs=require('./swagger')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = 9988;
const app = express();
const swaggerDocument = require('./swagger-output.json');

  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("uploads")); //for img
app.use(cors());
//load routes
const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/food/", foodRoutes);
app.use("/user/", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("work on 9988");
});
connectDB();
