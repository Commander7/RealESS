import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config(); // initialize it

mongoose
  .connect(process.env.MONGODBW)
  .then(() => {
    // check if connected with .then() and well
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json()); // allow json to server communication

app.listen(3000, () => {
  console.log("server is running on port 3000"); // server listen
});

app.get("/test", (req, res) => {
  res.send("Hello World"); //test api route connection with backend and frontW  // can alaso use Json object etc
});

app.use("/api/user", userRouter); // create api route to call function test
app.use("/api/auth", authRouter); // create api route

app.use((err, req, res, next) => {                                                    
  const statusCode = err.statusCode || 500;                          // middleware
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
