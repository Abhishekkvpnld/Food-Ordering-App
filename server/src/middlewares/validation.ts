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
