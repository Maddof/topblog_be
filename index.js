import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { navRouter } from "./routes/main.js";
import { postRouter } from "./routes/posts.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Get directory & file names using ES module compatible methods

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use(navRouter);
app.use("/posts", postRouter);

// ERROR HANDLING

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
