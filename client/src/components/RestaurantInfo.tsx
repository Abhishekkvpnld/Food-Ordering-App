import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-lg hover:shadow-md border border-gray-300 transition-all duration-300">
      <CardHeader>
        <CardTitle className="font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-800 tracking-tight">
          {restaurant?.restaurantName}
        </CardTitle>

        <CardDescription className="font-medium text-md sm:text-lg md:text-xl text-gray-600">
          📍 {restaurant?.city}, {restaurant?.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-3 mt-3">
        {restaurant.cuisines.map((cuisine, index) => (
          <span
            key={index}
            className="flex items-center px-3 py-1 bg-purple-100 text-purple-700 font-semibold text-sm sm:text-md rounded-full shadow-sm"
          >
            {cuisine}
            {index < restaurant.cuisines.length - 1 && <Dot className="text-gray-500 mx-1" />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
