import cloudinary from "cloudinary";
import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import Order from "../models/order";

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  // Upload the image to a specific folder on Cloudinary
  const uploadImage = await cloudinary.v2.uploader.upload(dataURI, {
    folder: "Food-Delivery-App",
  });

  return uploadImage.url;
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const existingRestaurant = await Restaurant.findOne({ user: userId });

    if (existingRestaurant)
      throw new Error("User restaurant already exists...❌");

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.imageUrl = imageUrl;
    restaurant.lastUpdated = new Date();
    restaurant.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "Restaurant created successfully...✅",
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: (error as Error).message,
    });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) throw new Error("Restaurant not found...🤦‍♂️");

    res.status(201).json({
      success: true,
      error: false,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: (error as Error).message,
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) throw new Error("Restaurant not found...❌");

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    res.status(200).json({
      success: true,
      error: false,
      message: "Restaurant data updated...✅",
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: (error as Error).message,
    });
  }
};

export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) throw new Error("Restaurant not found...❌");

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.status(200).json({
      success: true,
      error: false,
      data: orders,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
