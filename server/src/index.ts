import express from "express";
import dotenv from "dotenv";
dotenv.config();

import dbConnection from "./utils/dbConnection";
dbConnection();


import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.json("Hello from SSS");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
