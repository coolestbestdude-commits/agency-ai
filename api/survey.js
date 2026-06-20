import mysql from "mysql2/promise";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }


  const {
    experience,
    foundUs,
    recommend
  } = req.body;


  try {

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });


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


    await db.end();


    res.json({
      success: true,
      message: "Survey saved"
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      success:false,
      error:error.message
    });

  }

}
