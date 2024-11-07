
import express from "express";
import multer from "multer";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrders,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurantController";
import { jwtCheck, jwtParse } from "../middlewares/Auth";
import { validateRestaurantRequest } from "../middlewares/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// api/restaurant/
router.get("/get-restaurant", jwtCheck, jwtParse, getRestaurant);

router.get("/order",jwtCheck,jwtParse,getRestaurantOrders);

router.patch("/order/:orderId/status",jwtCheck,jwtParse,updateOrderStatus);

router.post(
  "/create-restaurant",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  createRestaurant
);

router.put(
  "/update-restaurant",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  updateRestaurant
); 

export default router;
