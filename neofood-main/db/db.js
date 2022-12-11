const mongoose = require("mongoose");
//db connection
MONGO_URL = "mongodb://localhost:27017/foodapi";
const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
      console.log("mongo db connected");
    } catch (err) {
      console.log(err.message);
    }
  };

  module.exports= connectDB;