import express from "express";
import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Database configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
  },
};

// Create a single connection pool instance
const poolPromise = sql
  .connect(config)
  .then((pool) => {
    console.log("Connected to the database");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    throw err;
  });

// Get all movies
app.get("/movies", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT id, title, director, year, length_minutes FROM movies");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error retrieving movies:", err.message);
    res.status(500).send("Error retrieving movies");
  }
});

// Get movies by title
app.get("/movies/title/:title", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("title", sql.NVarChar, `%${req.params.title}%`)
      .query(
        "SELECT id, title, director, year, length_minutes FROM movies WHERE title LIKE @title"
      );
    res.json(result.recordset);
  } catch (err) {
    console.error("Error retrieving movies by title:", err.message);
    res.status(500).send("Error retrieving movies by title");
  }
});

// Get movies by year
app.get("/movies/year/:year", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("year", sql.Int, req.params.year)
      .query(
        "SELECT id, title, director, year, length_minutes FROM movies WHERE year = @year"
      );
    res.json(result.recordset);
  } catch (err) {
    console.error("Error retrieving movies by year:", err.message);
    res.status(500).send("Error retrieving movies by year");
  }
});

// Add a new movie
app.post("/movies", async (req, res) => {
  const { id, title, director, year, length_minutes } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("director", sql.NVarChar, director)
      .input("year", sql.Int, year)
      .input("length_minutes", sql.Int, length_minutes)
      .query(
        "INSERT INTO movies (id, title, director, year, length_minutes) VALUES (@id, @title, @director, @year, @length_minutes)"
      );
    res.status(201).send("Movie added successfully");
  } catch (err) {
    console.error("Error adding movie:", err.message);
    res.status(500).send("Error adding movie");
  }
});

app.listen(port, () => {
  console.log(`Movies API is running at http://localhost:${port}`);
});
