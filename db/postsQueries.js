import prisma from "./prismaClient.js";

const getAllPublishedPosts = async () => {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        published: true,
      },
    });
    return allPosts;
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
    console.error("Error getting creating post", error);
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

export {
  getAllPublishedPosts,
  createSinglePost,
  getAllPosts,
  updateSinglePost,
  findUniquePost,
};
