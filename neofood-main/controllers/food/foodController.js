const foodModel = require("../../models/FoodSchema");

const getAll = async (req, res) => {
  /**
     * #swagger.tags = ['Food'] 
    
     * #swagger.security = [{
               "authorization": []
        }]
     * #swagger.description = 'get all foods'
     * #swagger.responses[200] = { description: 'success' }
     * #swagger.responses[404] = { description: 'not found.' }
     * #swagger.responses[500] = { description: 'Internal server error.' }
     */

  const filters = req.query;
  console.log(filters);

  let filterMain = {};
  for (key in filters) {
    // console.log(filters[key]);

    if (key.includes("exclude")) {
      // console.log(true);
      let arr = key.split("exclude");
      let keyy = arr[1];

      // filterMain.keyy={ $ne: filters[key] }
      filterMain[keyy] = { $ne: filters[key] };
    }

    if (key == "minCarbs" || key == "maxCarbs") {
      // let str="minCarbs"
      // const words = str.split('min');
      // console.log(words[1]);
      // let Carbs=words[1]
      let minCarbs = filters.minCarbs;
      let maxCarbs = filters.maxCarbs;
      // let obj={
      //   Carbs:{"%gt":minCarbs,"%lt":maxCarbs}
      // }
      if (minCarbs && maxCarbs) {
        filterMain.Carbs = { $gt: Number(minCarbs), $lt: Number(maxCarbs) };
      } else if (minCarbs) {
        filterMain.Carbs = { $gt: Number(minCarbs) };
      } else {
        filterMain.Carbs = { $lt: Number(maxCarbs) };
      }
    }
    if (key == "minProtein" || key == "maxProtein") {
      let minProtein = filters.minProtein;
      let maxProtein = filters.maxProtein;

      if (minProtein && maxProtein) {
        filterMain.Protein = {
          $gt: Number(minProtein),
          $lt: Number(maxProtein),
        };
      } else if (minProtein) {
        filterMain.Protein = { $gt: Number(minProtein) };
      } else {
        filterMain.Protein = { $lt: Number(maxProtein) };
      }
    }
    if (key == "minCalories" || key == "maxCalories") {
      let minCalories = filters.minCalories;
      let maxCalories = filters.maxCalories;

      if (minCalories && maxCalories) {
        filterMain.Calories = {
          $gt: Number(minCalories),
          $lt: Number(maxCalories),
        };
      } else if (minCalories) {
        filterMain.Calories = { $gt: Number(minCalories) };
      } else {
        filterMain.Calories = { $lt: Number(maxCalories) };
      }
    }
    if (key == "minFat" || key == "maxFat") {
      let minFat = filters.minFat;
      let maxFat = filters.maxFat;

      if (minFat && maxFat) {
        filterMain.Fat = {
          $gt: Number(minFat),
          $lt: Number(maxFat),
        };
      } else if (minFat) {
        filterMain.Fat = { $gt: Number(minFat) };
      } else {
        filterMain.Fat = { $lt: Number(maxFat) };
      }
    }
    if (key == "minAlcohol" || key == "maxAlcohol") {
      let minAlcohol = filters.minAlcohol;
      let maxAlcohol = filters.maxAlcohol;

      if (minAlcohol && maxAlcohol) {
        filterMain.Alcohol = {
          $gt: Number(minAlcohol),
          $lt: Number(maxAlcohol),
        };
      } else if (minAlcohol) {
        filterMain.Alcohol = { $gt: Number(minAlcohol) };
      } else {
        filterMain.Alcohol = { $lt: Number(maxAlcohol) };
      }
    }
    if (key == "minCaffeine" || key == "maxCaffeine") {
      let minCaffeine = filters.minCaffeine;
      let maxCaffeine = filters.maxCaffeine;

      if (minCaffeine && maxCaffeine) {
        filterMain.Caffeine = {
          $gt: Number(minCaffeine),
          $lt: Number(maxCaffeine),
        };
      } else if (minCaffeine) {
        filterMain.Caffeine = { $gt: Number(minCaffeine) };
      } else {
        filterMain.Caffeine = { $lt: Number(maxCaffeine) };
      }
    }
    if (key == "minCopper" || key == "maxCopper") {
      let minCopper = filters.minCopper;
      let maxCopper = filters.maxCopper;

      if (minCopper && maxCopper) {
        filterMain.Copper = {
          $gt: Number(minCopper),
          $lt: Number(maxCopper),
        };
      } else if (minCopper) {
        filterMain.Copper = { $gt: Number(minCopper) };
      } else {
        filterMain.Copper = { $lt: Number(maxCopper) };
      }
    }
    if (key == "minCalcium" || key == "maxCalcium") {
      let minCalcium = filters.minCalcium;
      let maxCalcium = filters.maxCalcium;

      if (minCalcium && maxCalcium) {
        filterMain.Calcium = {
          $gt: Number(minCalcium),
          $lt: Number(maxCalcium),
        };
      } else if (minCalcium) {
        filterMain.Calcium = { $gt: Number(minCalcium) };
      } else {
        filterMain.Calcium = { $lt: Number(maxCalcium) };
      }
    }
    if (key == "minCholine" || key == "maxCholine") {
      let minCholine = filters.minCholine;
      let maxCholine = filters.maxCholine;

      if (minCholine && maxCholine) {
        filterMain.Choline = {
          $gt: Number(minCholine),
          $lt: Number(maxCholine),
        };
      } else if (minCholine) {
        filterMain.Choline = { $gt: Number(minCholine) };
      } else {
        filterMain.Choline = { $lt: Number(maxCholine) };
      }
    }
  }
  // console.log(filterMain);
  foodModel
    .aggregate([{ $match: filterMain }])
    .then((data) => {
      res.json({ err: 0, success: true, status_code: 200, data: data });
    })
    .catch((err) => {
      res.json({
        err: 1,
        success: false,
        message: "Something went wrong",
        // error_message: err.errmsg,
      });
    });

  
};

const getTrendingFood = (req, res) => {
  /**
     * #swagger.tags = ['Food'] 
    
     * #swagger.security = [{
               "authorization": []
        }]
     * #swagger.description = 'trending food API'
     * #swagger.responses[200] = { description: 'success' }
     * #swagger.responses[404] = { description: 'not found.' }
     * #swagger.responses[500] = { description: 'Internal server error.' }
     */
  foodModel
    .find({})
    .then((data) => {
      console.log(data);
      let randomNum = Math.floor(Math.random() * data.length);
      res.json({
        err: 0,
        success: true,
        status_code: 200,
        data: data[randomNum],
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        err: 1,
        success: false,
        message: "Something went wrong",
        error_message: err,
      });
    });
};
const getPopularFoods = (req, res) => {
  /**
     * #swagger.tags = ['Food'] 
    
     * #swagger.security = [{
               "authorization": []
        }]
     * #swagger.description = 'get popular food API'
     * #swagger.responses[200] = { description: 'success' }
     * #swagger.responses[404] = { description: 'not found.' }
     * #swagger.responses[500] = { description: 'Internal server error.' }
     */
  foodModel
    .find({})
    .sort({ rating: -1 })
    .limit(8)
    .then((data) => {
      res.json({
        err: 0,
        success: true,
        status_code: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        err: 1,
        success: false,
        message: "Something went wrong",
        // error_message: err,
      });
    });
};

const getAllFoods = async (req, res) => {
  /**
     * #swagger.tags = ['Food'] 
     *   #swagger.parameters['obj'] = {
                in: 'body',
                type: 'object',
                description: 'body data',
                schema: {
                    "pageNumber":2,
                     "sortBy":""
                }
        } 
     * #swagger.security = [{
               "authorization": []
        }]
     * #swagger.description = 'get all foods'
     * #swagger.responses[200] = { description: 'success' }
     * #swagger.responses[404] = { description: 'not found.' }
     * #swagger.responses[500] = { description: 'Internal server error.' }
     */
  if (!req.body.pageNumber) {
    res.json({ err: 1, success: false, message: "Please send pageNumber" });
  }
  const filters = req.body;
  // console.log(filters);

  let filterMain = {};
  let sortCondition = { _id: 1 };
  for (key in filters) {
    // console.log(filters[key]);
    if (key == "cuisine") {
      filterMain.cuisine = filters[key];
    }
    if (key == "sortByRating" && filters[key] == 1) {
      sortCondition.rating = -1;
    }
    if (key == "sortByCost" && filters[key] == 1) {
      sortCondition.cost = 1;
    }
    // console.log(sortCondition);
  }
  // console.log(filterMain);
  foodModel
    .aggregate([{ $match: filterMain }])
    .sort(sortCondition)
    .then((data) => {
      if (filters.pageNumber) {
        let totalElements = data.legnth;
        let pageSize = 4;
        let pageNumber = filters.pageNumber;
        let resData = data;
        // let newdata=resData.splice((pageNumber - 1) * pageSize, pageNumber * pageSize);
        // console.log(newdata);
        function paginate(array, page_size, page_number) {
          // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
          return array.slice(
            (page_number - 1) * page_size,
            page_number * page_size
          );
        }
        const calculatePagesCount = (pageSize, totalCount) => {
          // we suppose that if we have 0 items we want 1 empty page
          return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
        };

        let newdata = paginate(resData, pageSize, pageNumber);
        let sendData = {
          pageSize,
          pageNumber,
          totalPages: calculatePagesCount(4, data.length),
          totalElements: data.length,
          data: newdata,
        };
        res.json({ err: 0, success: true, status_code: 200, data: sendData });
      }
    })
    .catch((err) => {
      res.json({
        err: 1,
        success: false,
        message: "Something went wrong",
        // error_message: err.errmsg,
      });
    });
};

module.exports = { getAll, getTrendingFood, getPopularFoods, getAllFoods };
