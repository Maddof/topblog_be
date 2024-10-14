import {
  createSingleComment,
  deleteSingleComment,
  findCommentsByPostId,
} from "../db/commentsQueries.js";
import { findUniquePost } from "../db/postsQueries.js";

const comments = {
  create: async (req, res) => {
    try {
      const { content, gName, gEmail } = req.body;
      // const postId = 1; // Replace with actual postId
      const postId = req.params.postId;

      // Check if post exists
      const post = await findUniquePost(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });

      // Creates the comment using prisma
      const newComment = await createSingleComment(
        content,
        gName,
        gEmail,
        postId
      );

      res.status(201).json({
        message: "Comment created successfully",
        comment: newComment,
      });
    } catch (error) {
      console.error("Error creating comment", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      const postId = parseInt(req.params.postId);

      // Ensure the comment belongs to the post before deletion
      const deletedComment = await deleteSingleComment(commentId, postId);
      if (!deletedComment) {
        return res.status(404).json({
          error: "Comment not found or does not belong to this post.",
        });
      }

      res.status(200).json({
        message: "Comment deleted successfully",
        comment: deletedComment,
      });
    } catch (error) {
      console.error("Error creating comment", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  allPerPost: async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);

      // Fetch all comments for the given post
      const postComments = await findCommentsByPostId(postId);

      if (!postComments || postComments.length === 0) {
        return res.status(404).json({
          message: "No comments found for this post",
          count: 0,
          comments: [],
        });
      }

      res.status(200).json({
        message: "Comments fetched successfully",
        count: postComments.length, // Return the length of the comments array
        comments: postComments,
      });
    } catch (error) {
      console.error("Error fetching comments", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export { comments };
