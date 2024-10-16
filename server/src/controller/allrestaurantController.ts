import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const checkCity = await Restaurant.countDocuments(query);

    if (checkCity === 0) throw new Error("Restaurant not found...✅");

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);


    res.status(201).json({
      success: true,
      error: false,
      message: "",
      data: {
        restaurants,
        pagination: {
          total:total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: (error as Error).message,
      data: {
        restaurants: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      },
    });
  }
};
