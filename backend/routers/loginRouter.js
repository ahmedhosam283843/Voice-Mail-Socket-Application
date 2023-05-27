import express from "express";
import db_queries from "../db/db_queries/db_queries.js";

const router = express.Router();

router.post("/", db_queries.login);

export default router;
