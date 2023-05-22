import { getUserById, deleteUser, createUser } from "./user_queries.js";
import login from "./login_queries.js";

const db_queries = {
  login: login,
  getUserById: getUserById,
  createUser: createUser,
  deleteUser: deleteUser,
};

export default db_queries;
