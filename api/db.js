import "dotenv/config";
console.log("DB URL inside db.js:", process.env.DATABASE_URL);
import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});