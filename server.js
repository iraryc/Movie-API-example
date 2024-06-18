import express from "express";
import sql from "mssql";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

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
    console.error("Error retrieving movies:", err.message);
    res.status(500).json({ error: "Error retrieving movies" });
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
    console.error("Error retrieving movies by title:", err.message);
    res.status(500).json({ error: "Error retrieving movies by title" });
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
    console.error("Error retrieving movies by year:", err.message);
    res.status(500).json({ error: "Error retrieving movies by year" });
  }
});

app.post("/movies", async (req, res) => {
  const { title, director, year, length_minutes } = req.body;
  try {
    const pool = await connectToDatabase();
    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("director", sql.NVarChar, director)
      .input("year", sql.Int, year)
      .input("length_minutes", sql.Int, length_minutes)
      .query(
        "INSERT INTO movies (title, director, year, length_minutes) VALUES (@title, @director, @year, @length_minutes)"
      );
    res.status(201).json({ message: "Movie added successfully" });
  } catch (err) {
    console.error("Error adding movie:", err.message, err.stack); // Log full error details
    res.status(500).json({ error: "Error adding movie", details: err.message }); // Include error details in response
  }
});

// Add DELETE endpoint
app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await connectToDatabase();
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM movies WHERE id = @id");
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Error deleting movie:", err.message);
    res.status(500).json({ error: "Error deleting movie" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Something went wrong", details: err.message });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
