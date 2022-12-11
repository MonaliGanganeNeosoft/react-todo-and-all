const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  name: { type: String },
  cuisine: { type: String },
  Carbs:{type:Number},
  Protein:{type:Number},
  rating:{type:Number},
  cost:{type:Number},
  description:{type:String},
  food_subImages: {
    type: [String],
  },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("food", FoodSchema);
