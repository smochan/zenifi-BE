const express = require("express");
const { Pool } = require("pg");
const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});

// ... API routes will go here ...
app.get("/data", async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/add", async (req, res) => {
  try {
    const { name, email, phone_num, time, tier, status } = req.body;
    const query =
      "INSERT INTO users (name, email, phone_num, time, tier, status) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [name, email, phone_num, new Date(time), tier, status];

    await pool.query(query, values);
    res.status(201).send("Data added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
