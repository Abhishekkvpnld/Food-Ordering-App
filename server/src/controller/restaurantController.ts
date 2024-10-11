import cloudinary from "cloudinary";
import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const existingRestaurant = await Restaurant.findOne({ user: userId });

    if (existingRestaurant)
      throw new Error("User restaurant already exists...❌");

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // Upload the image to a specific folder on Cloudinary
    const uploadImage = await cloudinary.v2.uploader.upload(dataURI, {
      folder: "Food-Delivery-App",
    });

    const restaurant = new Restaurant(req.body);
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.imageUrl = uploadImage.url;
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
    if (!restaurant) 
      throw new Error("Restaurant not found...🤦‍♂️");
  
    res.status(201).json({
      success:true,
      error:false,
      data:restaurant
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: (error as Error).message,
    });
  }
};
