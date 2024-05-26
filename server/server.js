import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
// import cors from "cors";

import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import { fileURLToPath } from "url";

// ALLOWS TO GET ACCESS TO ENV FILE
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONNECT TO MONGO DB
connectDB();

const app = express();
const port = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// app.use(cors({ origin: "http://localhost:3000" }));

// MIDDLEWARES STACK
// ALLOWS TO READ BODY FROM REQUEST
app.use(express.json({ limit: "15mb" }));

// ALLOWS TO GET DATA FROM NESTED URL PARAMS
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// ALLOWS US TO GET COOKIE DATA FROM REQUEST AND SEND IT AS RESPONSE
app.use(cookieParser());

// ROUTES

// USER RELATED ROUTES
app.use("/api/v1/users", userRouter);

// POST RELATED ROUTES
app.use("/api/v1/posts", postRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "dist", "index.html")
    );
  });
}

app.listen(port, () => console.log(`Server Started at ${port}`));
