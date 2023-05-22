import express from "express";
import db_queries from "../db/db_queries/db_queries.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/", authenticateToken, db_queries.getUserById);

router.post("/", db_queries.createUser);

router.delete("/", authenticateToken, db_queries.deleteUser);

export default router;
