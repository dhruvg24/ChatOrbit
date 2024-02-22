import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import connectToDB from "./db/connectToDB.js";
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();


app.use(express.json());
// to extract the fields from req.body
app.use("/api/v1/auth", authRoutes);

// app.get("/", (req, res)=> {
//     res.send("Hello World!!");
// })

// routes





app.listen(PORT, ()=> {
    connectToDB();
    console.log(`Server is running on port ${PORT}`)});

