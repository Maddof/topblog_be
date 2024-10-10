import prisma from "./prismaClient.js";

// Function to check if a user already exists by email
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Function to create a new user
const createUser = async (username, email, password) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password,
      role: "USER", // Assuming you want to set a default role
    },
  });
};

export { findUserByEmail, createUser };
