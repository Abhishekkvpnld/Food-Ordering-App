import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database";
import userRoute from "./routes/userRoute";
import restaurantRoute from "./routes/restaurantRoute";
import allRestaurantRoute from "./routes/allRestaurantRoute";
import orderRoute from "./routes/orderRoute";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

// cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/allRestaurant", allRestaurantRoute);
app.use("/api/order", orderRoute);

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
