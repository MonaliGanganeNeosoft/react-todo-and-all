const express = require("express");
const foodController = require("../controllers/food/foodController.js");
const router = express.Router();



router.get("/food/complexSearch/", foodController.getAll);
router.get("/food/trending_food", foodController.getTrendingFood);
router.get("/food/popular_foods/", foodController.getPopularFoods);
router.post("/food/get_all_foods/", foodController.getAllFoods);




module.exports = router;
