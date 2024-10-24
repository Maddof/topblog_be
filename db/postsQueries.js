import prisma from "./prismaClient.js";

const getAllPublishedPosts = async (page, limit) => {
  const skip = (page - 1) * limit; // Calculate how many posts to skip
  const take = limit; // Limit number of posts per page
  try {
    const allPosts = await prisma.post.findMany({
      skip: skip,
      take: take,
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Optionally, get the total count of posts for pagination metadata
    const totalPosts = await prisma.post.count({
      where: {
        published: true,
      },
    });
    return { allPosts, totalPosts };
  } catch (error) {
    console.error("Error getting all posts", error);
  }
};

const getAllPosts = async () => {
  try {
    const allPosts = await prisma.post.findMany();
    return allPosts;
  } catch (error) {
    console.error("Could not get all posts", error);
  }
};

const findUniquePost = async (postId) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });
    return post;
  } catch (error) {
    console.error("Error getting unique post", error);
    throw error;
  }
};

const findPostAndCommentsByPostId = async (postId) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          // Include the author of the post
          select: {
            username: true,
            email: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          // Include the comments for the post
          select: {
            id: true,
            content: true,
            createdAt: true,
            guestName: true,
            guestEmail: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post, author, and comments", error);
    throw error;
  }
};

const createSinglePost = async (title, content, pubStatus, authorId) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: pubStatus,
        publishedAt: pubStatus ? new Date() : null, // Set publishedAt if published
        author: {
          connect: { id: authorId },
        },
      },
    });
    return newPost;
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }
};

const updateSinglePost = async (id, title, content, published) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        published,
        publishedAt: published ? new Date() : null, // Update publishedAt when published
      },
    });
    return updatedPost;
  } catch (error) {
    console.error("Error updating post", error);
    throw error;
  }
};

const deleteSinglePost = async (postId) => {
  try {
    // First, check if the post exists
    const existingComment = await prisma.comment.findFirst({
      where: {
        id: postId,
      },
    });

    if (!existingComment) {
      return null; // If not found, return null to indicate the comment doesn't exist for the post
    }

    // Delete the found comment
    await prisma.comment.delete({
      where: { id: existingComment.id },
    });

    return existingComment; // Return the original comment or confirmation if needed
  } catch (error) {
    console.error("Error deleting post", error);
    throw error;
  }
};

export {
  getAllPublishedPosts,
  createSinglePost,
  getAllPosts,
  updateSinglePost,
  findUniquePost,
  findPostAndCommentsByPostId,
  deleteSinglePost,
};
