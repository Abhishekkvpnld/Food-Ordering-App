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

    // ✅ Search by city OR country
    query["$or"] = [
      { city: new RegExp(city, "i") },
      { country: new RegExp(city, "i") },
    ];

    // ✅ Check if any restaurants exist
    const checkCity = await Restaurant.countDocuments(query);
    if (checkCity === 0) {
      throw new Error(
        `No restaurants found in "${city}". Please try another location.`
      );
    }

    // ✅ Filter by cuisines
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    // ✅ Search in restaurantName, cuisines, city, and country
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"].push(
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } }
      );
    }

    // Pagination
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Fetch data
    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .sort({ [sortOption]: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Restaurant.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      error: false,
      data: {
        restaurants,
        pagination: {
          total,
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



export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const checkRestaurant = await Restaurant.findById(restaurantId);
    if (!checkRestaurant) throw new Error("Restaurant not Available...❌");

    res.status(200).json({
      success: true,
      error: false,
      data: checkRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: (error as Error).message,
    });
  }
};
