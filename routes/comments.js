import express from "express";
import { posts } from "../controllers/postController.js";
import { comments } from "../controllers/commentController.js";
import {
  postValidationRules,
  validatePost,
} from "../validators/postValidator.js";
import {
  commentValidationRules,
  validateComment,
} from "../validators/commentsValidator.js";
import { verifyToken } from "../middleware/verifyAndRefreshToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const commentRouter = express.Router();

// @desc Get all comments
// @route GET /comments/

commentRouter.get("/", comments.all);

export { commentRouter };
