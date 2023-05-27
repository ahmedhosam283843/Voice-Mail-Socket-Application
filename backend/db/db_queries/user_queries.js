import pool from "../db_pool.cjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function getUserById(request, response) {
  const id = parseInt(request.user);

  pool.query(
    'SELECT * FROM "User" WHERE user_id = $1',
    [id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      }
      response.status(200).json(results.rows);
    }
  );
}
async function createUser(request, response) {
  const { name, email, password, address, city, state, zip } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      'INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3) RETURNING user_id',
      [name, email, hashedPassword],
      (error, results) => {
        if (error) {
          throw error;
        }
        const userId = results.rows[0].user_id;
        const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
        response.status(201).json({ accessToken: accessToken });
      }
    );
  } catch {
    response.status(500).send();
  }
}

async function deleteUser(request, response) {
  const id = parseInt(request.user);

  pool.query(
    'DELETE FROM "User" WHERE user_id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
}

async function getMailFromUserId(user_id) {
  const result = await pool.query('SELECT email FROM "User" WHERE user_id = $1', [user_id]);
  if (result.rows.length > 0) {
    return result.rows[0].email;
  } else {
    return null;
  }
}


export { getUserById, createUser, deleteUser, getMailFromUserId };
