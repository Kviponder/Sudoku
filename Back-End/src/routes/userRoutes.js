const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/dbConfig");
const router = express.Router();

//POST - Create a new user
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
  const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email;`;
  const values = [username, email, hashedPassword];
  try {
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).send("Error creating user");
  }
});

//GET - Get all users
router.get("/", async (req, res) => {
  const query = `SELECT * FROM users`;
  try {
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting all users: ", error);
    res.status(500).send("Error getting all users");
  }
});

//GET - Get user by email
router.get("/:email", async (req, res) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [req.params.email];
  try {
    const { rows } = await pool.query(query, values);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error getting user by email: ", error);
    res.status(500).send("Error getting user by email");
  }
});

module.exports = router;
