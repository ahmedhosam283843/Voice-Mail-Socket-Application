import express from "express";
import bodyParser from "body-parser";
import { userRouter, mailRouter } from "./routers/index.js";
const app = express();
const PORT = 5000;

// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // add Authorization header here
  ); // allow the headers that the client sends
  next();
});

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/mail", mailRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () => {
  console.log(`Server running on port:  http://localhost:${PORT}`);
});
