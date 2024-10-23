import {
  getAllPublishedPosts,
  getAllPosts,
  createSinglePost,
  updateSinglePost,
  findPostAndCommentsByPostId,
} from "../db/postsQueries.js";

import sanitizeHtml from "../utils/purifyDom.js";

const posts = {
  // Method to get all posts from the database
  all: async (req, res, next) => {
    try {
      const allPosts = await getAllPosts();
      res.json({
        posts: allPosts,
      });
    } catch (error) {
      return next(error);
    }
  },

  // Method to get all published posts
  allPublished: async (req, res, next) => {
    const { page = 1, limit = 2 } = req.query; // Default to page 1, 10 comments per page
    try {
      const { allPosts, totalPosts } = await getAllPublishedPosts(
        Number(page),
        Number(limit)
      );
      res.status(200).json({
        posts: allPosts,
        count: allPosts.length,
        totalPages: Math.ceil(totalPosts / limit), // Total number of pages
        totalPosts,
        currentPage: page,
      });
    } catch (error) {
      return next(error);
    }
  },

  // Method to fetch a single post by ID
  getSingle: async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);

      const post = await findPostAndCommentsByPostId(postId);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      res.status(200).json({
        message: "Post fetched successfully",
        post,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Method to create a post
  create: async (req, res) => {
    try {
      const sanitizedContent = sanitizeHtml(req.body.content);
      const { title, published = false } = req.body;
      const authorId = req.user.userId;

      // Create the post using Prisma
      const newPost = await createSinglePost(
        title,
        sanitizedContent,
        published,
        authorId
      );

      res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  update: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content, published = false } = req.body;
      const updatedPost = await updateSinglePost(
        postId,
        title,
        content,
        published
      );
      res.status(201).json({
        message: "Post updated successfully",
        post: updatedPost,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export { posts };
