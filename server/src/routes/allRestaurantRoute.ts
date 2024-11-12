import express from "express";
import { param } from "express-validator";
import {
  getRestaurant,
  searchRestaurant,
} from "../controller/allrestaurantController";

const router = express.Router();

//api/allRestaurant/
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string...!"),
  searchRestaurant
);

router.get(
  "/getRestaurant/:restaurantId",
  param("restaurantId") 
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id parameter must be a valid string...!"),
  getRestaurant
);

export default router;
