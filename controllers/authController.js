import bcrypt from "bcryptjs";
import prisma from "../db/prismaClient.js"; // Assuming you have this setup for Prisma
import { generateTokens } from "../utils/tokenGenerator.js";
import { findUserByEmail, createUser } from "../db/userQueries.js";

// Function to handle user registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await createUser(username, email, hashedPassword);

    // Return the created user (omit the password for security)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token in HttpOnly cookie (ensure to configure cookie options properly)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use 'secure' in production
      sameSite: "Strict", // Mitigate CSRF
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    // Send access token as JSON (client stores it in memory or local storage)

    res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logout successful" });
};

export { login, registerUser, logout };
