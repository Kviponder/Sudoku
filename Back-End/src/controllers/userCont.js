const bcrypt = require("bcrypt");
const pool = require("../config/dbConfig");

class UserController {
  async create(req, res) {
    // Create user below
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
  }

  async update(req, res) {
    // Update user
    const { username, email, password } = req.body;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
    const query = `
              UPDATE users
              SET name = $1, email = $2, password = $3
              WHERE id = $4
              RETURNING id, name, email;`;
    const values = [username, email, hashedPassword, req.params.id];
    try {
      const { rows } = await pool.query(query, values);
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error updating user: ", error);
      res.status(500).send("Error updating user");
    }
  }

  async delete(req, res) {
    // Delete user
    const query = `DELETE FROM users WHERE id = $1`;
    const values = [req.params.id];
    try {
      await pool.query(query, values);
      res.status(200).send("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(500).send("Error deleting user");
    }
  }

  async get(req, res) {
    // Get user
    const query = `SELECT * FROM users WHERE id = $1`;
    const values = [req.params.id];
    try {
      const { rows } = await pool.query(query, values);
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error getting user: ", error);
      res.status(500).send("Error getting user");
    }
  }
}

module.exports = UserController();
