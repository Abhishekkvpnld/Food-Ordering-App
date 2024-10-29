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
<Card className="bg-blue-100 p-1 m-2">
  <CardHeader>
    <CardTitle className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight">
      {restaurant?.restaurantName}
    </CardTitle>

    <CardDescription className="font-semibold text-sm sm:text-base md:text-lg">
      {restaurant?.country}, {restaurant?.city}
    </CardDescription>
  </CardHeader>

  <CardContent className="flex flex-wrap gap-2 mt-2">
    {restaurant.cuisines.map((cuisine, index) => (
      <span className="flex items-center" key={index}>
        <span className="text-blue-600 font-semibold text-lg">
          {cuisine}
        </span>
        {index < restaurant.cuisines.length - 1 && <Dot />}
      </span>
    ))}
  </CardContent>
</Card>

  );
};

export default RestaurantInfo;
