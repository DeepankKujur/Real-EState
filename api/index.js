import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

//here we are configuring the dotenv package and connecting to the database
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected to database");
}).catch((err) => {
  console.log(err);
});


//here we have created the server
const app = express();
app.listen(3000, () => {
  console.log("server is running on port 3000 ");
});


app.use('/api/user', userRo uter);