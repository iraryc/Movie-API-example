import express from "express";
import sql from "mssql";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Database configuration
const config = {
  user: "myusername", // update me
  password: "Yearup2024!", // update me
  server: "yearup.database.windows.net", // update me
  database: "yearupdemo", // update me
  options: {
    encrypt: true,
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

// Get all movies
app.get("/movies", async (req, res) => {
  let pool;
  try {
    pool = await connectToDatabase();
    const result = await pool.request().query(`SELECT id, title, director, year, length_minutes FROM movies`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error retrieving movies");
  } finally {
    if (pool) {
      pool.close();
    }
  }
});

// Get movies by title
app.get("/movies/title/:title", async (req, res) => {
  let pool;
  try {
    pool = await connectToDatabase();
    const result = await pool.request()
      .input("title", sql.NVarChar, `%${req.params.title}%`)
      .query(`SELECT id, title, director, year, length_minutes FROM movies WHERE title LIKE @title`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error retrieving movies by title");
  } finally {
    if (pool) {
      pool.close();
    }
  }
});

// Get movies by year
app.get("/movies/year/:year", async (req, res) => {
  let pool;
  try {
    pool = await connectToDatabase();
    const result = await pool.request()
      .input("year", sql.Int, req.params.year)
      .query(`SELECT id, title, director, year, length_minutes FROM movies WHERE year = @year`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error retrieving movies by year");
  } finally {
    if (pool) {
      pool.close();
    }
  }
});

// Add a new movie
app.post("/movies", async (req, res) => {
  const { id, title, director, year, length_minutes } = req.body;
  let pool;
  try {
    pool = await connectToDatabase();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("director", sql.NVarChar, director)
      .input("year", sql.Int, year)
      .input("length_minutes", sql.Int, length_minutes)
      .query(`INSERT INTO movies (id, title, director, year, length_minutes) VALUES (@id, @title, @director, @year, @length_minutes)`);
    res.status(201).send("Movie added successfully");
  } catch (err) {
    res.status(500).send("Error adding movie");
  } finally {
    if (pool) {
      pool.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Movies API is running at http://localhost:${port}`);
});
