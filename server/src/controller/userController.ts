import { Request, Response } from "express";
import User from "../models/userModel";

export const currentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;

    if (!auth0Id) {
      throw new Error("Auth is required...🤦‍♂️");
    }

    const existingUser = await User.findOne({ auth0Id });

    if (!existingUser) {
      const newUser = new User(req.body);
      await newUser.save();

      res.status(200).json({
        error: false,
        success: true,
        data: newUser,
        message: "User found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;

    const user = await User.findById(req?.userId);
    if (!user) throw new Error("User not found...🤦‍♂️");

    user.name = name;
    user.city = city;
    user.addressLine1 = addressLine1;
    user.country = country;

    await user.save();

  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: (error as Error).message,
    });
  }
};
