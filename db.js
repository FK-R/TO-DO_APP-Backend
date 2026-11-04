const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password123",
  database: "db123",
});

const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(queryText);
    console.log("PostgreSQL database initialized successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

initDb();

module.exports = pool;
