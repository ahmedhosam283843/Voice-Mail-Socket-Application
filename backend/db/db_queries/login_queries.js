import pool from "../db_pool.cjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function getUserByEmail(email) {
  const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [
    email,
  ]);
  return result.rows[0];
}

 async function login(request, response) {
    const { email, password } = request.body;
    try {
      const user = await getUserByEmail(email);
      if (user == null) {
        return response.status(401).send("Invalid credentials");
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          const accessToken = jwt.sign(
            user.user_id,
            process.env.ACCESS_TOKEN_SECRET
          );
  
          response.status(200).json({ accessToken: accessToken });
        } else {
          response.status(401).send("Invalid credentials");
        }
      } catch (error) {
        response.status(500).send(error);
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }



  export default login;