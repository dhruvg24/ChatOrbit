import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToDB from "./db/connectToDB.js";
import { app, server } from "./socket/socket.js";
// SOCKET on top of express server
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
// to extract the fields from req.body
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);
// app.get("/", (req, res)=> {
//     res.send("Hello World!!");
// })


// server from socket file
server.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
