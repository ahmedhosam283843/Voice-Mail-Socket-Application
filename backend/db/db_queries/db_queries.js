import { getUserById, deleteUser, createUser } from "./user_queries.js";
const db_queries = {

  getUserById: getUserById,
  createUser: createUser,
  deleteUser: deleteUser,
};

export default db_queries;
