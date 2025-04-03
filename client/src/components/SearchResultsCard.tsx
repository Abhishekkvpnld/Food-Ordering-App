import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  restaurant: Restaurant;
};

const SearchResultsCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/restaurantDetails/${restaurant._id}`}
      className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-5 group bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden p-4"
    >
      <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </AspectRatio>

      <div className="flex flex-col justify-between p-2">
        <h3 className="text-2xl font-semibold tracking-tight mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
          {restaurant.restaurantName}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          {restaurant.cuisines.map((item, index) => (
            <span className="flex items-center" key={index}>
              <span className="text-slate-500 font-medium">{item}</span>
              {index < restaurant.cuisines.length - 1 && <Dot className="w-4 h-4 text-gray-400" />}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-medium">
          <div className="flex items-center gap-2 text-green-600">
            <Clock className="w-5 h-5" />
            {restaurant.estimatedDeliveryTime} mins
          </div>

          <div className="flex items-center gap-2 text-gray-800">
            <Banknote className="w-5 h-5" />
            Delivery from ₹{parseInt(restaurant.deliveryPrice).toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;