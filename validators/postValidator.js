// validators/postValidator.js
import { body, validationResult } from "express-validator";

const postValidationRules = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long")
      .trim()
      .escape(),
    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters long")
      .trim()
      .escape(),
  ];
};

// Middleware to handle validation errors
const validatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { postValidationRules, validatePost };
