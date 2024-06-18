import express from "express";
import sql from "mssql";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Database configuration using environment variables
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Depending on your SQL server configuration, this might need to be adjusted.
    enableArithAbort: true,
  },
};

// Connect to the database
async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to the database");
    return pool;
  } catch (err) {
    console.error("Connection error:", err.message);
    throw err;
  }
}

// Define API endpoints
app.get("/movies", async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`SELECT * FROM movies`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error retrieving movies");
  }
});

app.get("/movies/title/:title", async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("title", sql.NVarChar, `%${req.params.title}%`)
      .query("SELECT * FROM movies WHERE title LIKE @title");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error retrieving movies by title");
  }
});

app.get("/movies/year/:year", async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("year", sql.Int, req.params.year)
      .query("SELECT * FROM movies WHERE year = @year");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error retrieving movies by year");
  }
});

app.post("/movies", async (req, res) => {
  const { title, director, year, length_minutes } = req.body;
  try {
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("director", sql.NVarChar, director)
      .input("year", sql.Int, year)
      .input("length_minutes", sql.Int, length_minutes)
      .query(
        "INSERT INTO movies (title, director, year, length_minutes) VALUES (@title, @director, @year, @length_minutes)"
      );
    res.status(201).send({ message: "Movie added successfully" });
  } catch (err) {
    res.status(500).send("Error adding movie");
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
