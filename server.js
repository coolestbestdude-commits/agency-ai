// Load environment variables FIRST
import "dotenv/config";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

import express from "express";
import cors from "cors";

// Import API route handlers (default exports)
import contactsHandler from "./api/contacts.js";
import surveysHandler from "./api/surveys.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.post("/api/contacts", contactsHandler);
app.post("/api/surveys", surveysHandler);

app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});