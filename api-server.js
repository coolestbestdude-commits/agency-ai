import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();

app.use(cors());
app.use(express.json());


// Local MySQL connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "jacques",
  password: "1234567",
  database: "customer",
});


console.log("MySQL connected");


// Appointment API
app.post("/api/contact", async (req, res) => {

  console.log("Appointment received:", req.body);

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

    console.error("CONTACT ERROR:", error);

    res.status(500).json({
      success:false,
      error:error.message
    });

  }

});



// Survey API
app.post("/api/survey", async (req, res) => {

  console.log("Survey received:", req.body);


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
      success:true,
      message:"Survey saved"
    });


  } catch(error) {

    console.error("SURVEY ERROR:", error);


    res.status(500).json({
      success:false,
      error:error.message
    });

  }

});



// Start server
app.listen(4000, () => {

  console.log(
    "API running on http://localhost:4000"
  );

});
