import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Get directory & file names using ES module compatible methods

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BODY PARSER MIDDLEWARE
app.use(express.json({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
