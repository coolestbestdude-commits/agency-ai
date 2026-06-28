import { db } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, appointment_date, start_time, end_time } = req.body;

    // Generate Africa/Harare local time
    const localTime = new Date().toLocaleString("sv-SE", {
      timeZone: "Africa/Harare"
    });

    const result = await db.query(
      `
      INSERT INTO customer.contacts
      (created_at, name, email, phone, appointment_date, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        localTime,
        name || null,
        email || null,
        phone || null,
        appointment_date || null,
        start_time || null,
        end_time || null
      ]
    );

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    console.error("CONTACTS API ERROR:", err);

    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
}