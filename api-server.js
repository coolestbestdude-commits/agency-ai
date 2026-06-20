import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();

app.use(cors());
app.use(express.json());


const db = await mysql.createConnection({
  host: "localhost",
  user: "jacques",
  password: "1234567",
  database: "customer"
});


console.log("MySQL connected");


app.post("/api/contact", async (req, res) => {

  console.log("Received:", req.body);

  const {
    name,
    email,
    phone,
    date,
    startTime,
    endTime
  } = req.body;


  try {

    await db.execute(
      `
      INSERT INTO contacts
      (
        name,
        email,
        phone,
        appointment_date,
        start_time,
        end_time
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        email,
        phone,
        date,
        startTime,
        endTime
      ]
    );


    res.json({
      success: true,
      message: "Appointment saved"
    });


  } catch (error) {

    console.error("MYSQL ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
app.post("/api/survey", async (req, res) => {

  console.log("Survey Received:", req.body);

  const {
    experience,
    foundUs,
    recommend
  } = req.body;


  try {

    await db.execute(
      `
      INSERT INTO surveys
      (
        experience,
        found_us,
        recommend
      )
      VALUES (?, ?, ?)
      `,
      [
        experience,
        foundUs,
        recommend
      ]
    );


    res.json({
      success: true,
      message: "Survey saved"
    });


  } catch (error) {

    console.error("SURVEY MYSQL ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});
app.post("/api/survey", async (req, res) => {

  console.log("Received survey:", req.body);

  const {
    experience,
    foundUs,
    recommend
  } = req.body;


  try {

    await db.execute(
      `
      INSERT INTO surveys
      (
        experience,
        found_us,
        recommend
      )
      VALUES (?, ?, ?)
      `,
      [
        experience,
        foundUs,
        recommend
      ]
    );


    res.json({
      success: true,
      message: "Survey saved"
    });


  } catch (error) {

    console.error("SURVEY MYSQL ERROR:", error);


    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});
