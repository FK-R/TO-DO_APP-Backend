const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const pool = require("./db");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await pool.query("INSERT INTO todo (data) VALUES ($1)", [data]);
    res
      .status(200)
      .send({ message: "data successfully received!", receivedData: data });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});
