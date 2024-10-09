import express from "express";
import multer from "multer";
import { createRestaurant } from "../controller/restaurantController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/create-restaurant",upload.single("imageFile"),createRestaurant);

export default router;
