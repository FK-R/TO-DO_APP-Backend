const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL
  );
`);

app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  res.json(result.rows);
  console.log(result.rows);
});

app.post("/todos", async (req, res) => {
  const { title, description, date } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title,description,date) VALUES ($1,$2,$3) RETURNING *",
    [title, description, date],
  );
  res.json(result.rows[0]);
  console.log(result.rows[0]);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  const result = await pool.query(
    "UPDATE todos SET title = $1, description = $2, date = $3 WHERE id = $4 RETURNING *",
    [title, description, date, id],
  );
  res.json(result.rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.json({ message: "Deleted" });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
