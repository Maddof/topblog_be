import prisma from "./prismaClient.js";

const createSingleComment = async (content, gName, gEmail, postId) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: content,
        guestName: gName,
        guestEmail: gEmail,
        post: {
          connect: { id: parseInt(postId) },
        },
      },
    });
    return newComment;
  } catch (error) {
    console.error("Error creating comment", error);
    throw error;
  }
};

const deleteSingleComment = async (commentId, postId) => {
  try {
    // First, check if the comment exists and belongs to the specified post
    const existingComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        postId: postId, // Ensure the comment belongs to the correct post
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
    console.error("Error deleting comment", error);
    throw error;
  }
};

const findCommentsByPostId = async (postId) => {
  try {
    // Query to find all comments associated with a given post
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId, // Filter by postId
      },
      orderBy: {
        createdAt: "desc", // Optionally, order by creation time (descending or ascending)
      },
    });
    return comments;
  } catch (error) {
    console.error("Error finding comments for post", error);
    throw error;
  }
};

export { createSingleComment, deleteSingleComment, findCommentsByPostId };
