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

const postRouter = express.Router();

// @desc Get all posts
// @route GET /posts/
postRouter.get("/", posts.all);

// @desc Get all published posts
// @route GET /posts/public/
postRouter.get("/public/", posts.allPublished);

// @desc Create new post
// @route POST /posts/
postRouter.post(
  "/",
  verifyToken,
  postValidationRules(),
  validatePost,
  posts.create
);

// @desc Update a post
// @route PUT /posts/:postId
postRouter.put("/:postId", verifyToken, posts.update);

// @desc Create a new comment
// @route POST /posts/:postId/newComment

postRouter.post(
  "/:postId/newComment",
  commentValidationRules(),
  validateComment,
  comments.create
);

export { postRouter };
