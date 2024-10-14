// validators/postValidator.js
import { body, validationResult } from "express-validator";

const commentValidationRules = () => {
  return [
    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 5 })
      .withMessage("Content must be at least 5 characters long")
      .trim()
      .escape(),
    body("gName")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters long")
      .trim()
      .escape(),
    body("gEmail")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters long")
      .trim()
      .escape(),
  ];
};

// Middleware to handle validation errors
const validateComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { commentValidationRules, validateComment };