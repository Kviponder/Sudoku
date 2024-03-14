const bcrypt = require("bcrypt");
const pool = require("./config/dbConfig");

const createUser = async (user) => {
  const { username, email, password } = user;
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
  const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email;`;
  const values = [username, email, hashedPassword];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating user: ", error);
    throw new Error("Error creating user");
  }
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error getting user by email: ", error);
    throw new Error("Error getting user by email");
  }
};

const getAllUsers = async () => {
  const query = `SELECT * FROM users`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Error getting all users: ", error);
    throw new Error("Error getting all users");
  }
};
