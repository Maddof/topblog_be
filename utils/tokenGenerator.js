import jwt from "jsonwebtoken";

const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY_15M || "15m";
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY_7D || "7d";

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT
const generateTokens = (user) => {
  // Payload data: You can add more user-specific data as needed.
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role, // Optional, but helpful if you need role-based access
  };

  // Sign the token with the payload and secret key, and set an expiration time (e.g., 1 hour)

  // Short-lived access token
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: accessTokenExpiry,
  });

  // Long-lived refresh token
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: refreshTokenExpiry,
  });

  return { accessToken, refreshToken };
};

export { generateTokens };
