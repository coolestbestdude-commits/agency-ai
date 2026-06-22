import express from "express";
import { Pool } from "pg";
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

// Test connection on startup
db.connect((err, client, release) => { 
  if (err) {
    return console.error("❌ Error acquiring client from Postgres pool:", err.stack);
  }
  console.log("🚀 Connected to Neon Postgres database successfully!");
  release();
});

// ----------------------
// ROUTES
// ----------------------

// 1. Fetch all surveys (Handles both /surveys and /api/surveys)
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

// 3. Update an existing contact
app.put(["/contacts/:id", "/api/contacts/:id"], async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, appointment_date, start_time, end_time } = req.body;

  const updateQuery = `
    UPDATE customer.contacts
    SET
      name = $1,
      email = $2,
      phone = $3,
      appointment_date = $4,
      start_time = $5,
      end_time = $6
    WHERE id = $7
    RETURNING *;
  `;
  const values = [name, email, phone, appointment_date, start_time, end_time, id];

  try {
    const result = await db.query(updateQuery, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Contact record not found" });   
    }
    res.json({ success: true, contact: result.rows[0] });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Database failure updating contact info" });
  }
});

// 4. Create a new Survey Submission (Handles any combination Vercel routes down)
app.post(["/surveys", "/survey", "/api/surveys", "/api/survey"], async (req, res) => {
  const { experience, source, recommend } = req.body;

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
    res.status(500).json({ error: "Database failure saving survey info" });
  }
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});
