import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT
const generateToken = (user) => {
  // Payload data: You can add more user-specific data as needed.
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role, // Optional, but helpful if you need role-based access
  };

  // Sign the token with the payload and secret key, and set an expiration time (e.g., 1 hour)
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export { generateToken };
