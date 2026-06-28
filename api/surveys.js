import { db } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { experience, source, recommend } = req.body;

    // Generate Africa/Harare local time
    const localTime = new Date().toLocaleString("sv-SE", {
      timeZone: "Africa/Harare"
    });

    const result = await db.query(
      `
      INSERT INTO customer.surveys 
      (created_at, experience, source, recommend)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        localTime,
        experience || null,
        source || null,
        recommend || null
      ]
    );

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    console.error("SURVEYS API ERROR:", err);

    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
}