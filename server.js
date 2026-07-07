// Load environment variables FIRST
import "dotenv/config";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

import express from "express";
import cors from "cors";

// Import API route handlers (default exports)
import contactsHandler from "./api/contacts.js";
import surveysHandler from "./api/surveys.js";

import pkg from "pg";
const { Pool } = pkg;

// Create database pool using DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST routes
app.post("/api/contacts", contactsHandler);
app.post("/api/surveys", surveysHandler);

// ⭐ GET all contacts
app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customer.contacts ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET CONTACTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// ⭐ GET all surveys
app.get("/api/surveys", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customer.surveys ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET SURVEYS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});