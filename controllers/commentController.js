import { createSingleComment } from "../db/commentsQueries.js";
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
};

export { comments };
