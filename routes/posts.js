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

const postRouter = express.Router();

// @desc Get all posts
// @route GET /posts/
postRouter.get("/", posts.all);

// @desc Get all published posts
// @route GET /posts/public/
postRouter.get("/public/", posts.allPublished);

// @desc Get a single post and associated comments by postId
// @route GET /posts/:postId
postRouter.get("/:postId", posts.getSingle);

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

// @desc Get all comments per post
// @route GET /posts/:postId/comments/

postRouter.get("/:postId/comments/", comments.allPerPost);

// @desc Create a new comment
// @route POST /posts/:postId/newComment

postRouter.post(
  "/:postId/newComment",
  commentValidationRules(),
  validateComment,
  comments.create
);

// @desc Delete a comment
// @route DELETE /posts/:postId/newComment

postRouter.delete(
  "/:postId/comments/:commentId",
  verifyToken,
  verifyAdmin,
  comments.delete
);

export { postRouter };
