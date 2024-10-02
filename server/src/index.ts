import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/database";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server running...🚀🚀");
});

// Server
const PORT = process.env.PORT || 4000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT} 🚀🚀`);
  });
});
