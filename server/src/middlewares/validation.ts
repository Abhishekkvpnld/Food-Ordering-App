import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Middleware to handle validation errors
const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) throw errors.array();
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      error: true,
      errors: error,
    });
  }
};

export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("Restaurant name is required...❌"),
  body("city").notEmpty().withMessage("City is required...❌"),
  body("country").notEmpty().withMessage("Country is required...❌"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number...❌"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive number...❌"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array...❌")
    .not()
    .isEmpty()
    .withMessage("Cuisines array can not be empty"),
    body("menuItems")
    .isArray()
    .withMessage("Menu items must be an array...❌"),
  body("menuItems.*.name").notEmpty()
    .withMessage("Menu items name is required...❌"),
    body("menuItems.*.price").isFloat({min:0})
    .withMessage("Menu items price is required and must be a positive number...❌"),
    handleValidationErrors
];
