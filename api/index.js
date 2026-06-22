import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ----------------------
// DB CONNECTION (Neon Postgres)
// ----------------------
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true, // Required for Neon secure connections
  },
});

// ----------------------
// ROUTES
// ----------------------

// 1. Fetch all surveys
app.get(["/surveys", "/api/surveys"], async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customer.surveys ORDER BY created_at DESC;");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    res.status(500).json({ error: "Internal server error reading surveys" });
  }
});

// 2. Create/Update a Contact (Appointment Booking)
app.post(["/contacts", "/api/contacts"], async (req, res) => {
  const { name, email, phone, appointment_date, start_time, end_time } = req.body;

  const insertQuery = `
    INSERT INTO customer.contacts (name, email, phone, appointment_date, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [name, email, phone, appointment_date, start_time, end_time];

  try {
    const result = await db.query(insertQuery, values);
    res.status(201).json({ success: true, contact: result.rows[0] });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Database failure saving contact info" });
  }
}); 

// 3. Create a new Survey Submission (Fixed schema mapping)
app.post(["/surveys", "/survey", "/api/surveys", "/api/survey"], async (req, res) => {
  const { experience, source, recommend } = req.body;

  // Fixed target variable to match 'found_us' column inside Neon DB schema
  const insertQuery = `
    INSERT INTO customer.surveys (experience, source, recommend)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [experience, source, recommend];

  try {
    const result = await db.query(insertQuery, values);
    res.status(201).json({ success: true, survey: result.rows[0] });
  } catch (error) {
    console.error("❌ Error saving survey to Neon:", error);
    res.status(500).json({ error: error.message || "Database failure saving survey info" });
  }
});

// ----------------------
// EXPORT FOR VERCEL SERVERLESS
// ----------------------
// Vercel serverless requires exporting the express app handler instance directly
export default app;

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}