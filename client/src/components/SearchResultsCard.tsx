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
      className="grid grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 9}>
        <img
          src={restaurant.imageUrl}
          alt="img"
          className="rounded-md w-[full] h-full object-cover"
        />
      </AspectRatio>

      <div className="flex items-center">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight mb-2 group-hover:underline ">
            {restaurant.restaurantName}
          </h3>

          <div id="card-content" className="grid md:grid-cols-2 gap-2">
            <div className="flex flex-row flex-wrap max-w-[300px] mr-1">
              {restaurant.cuisines.map((item, index) => (
                <span className="flex" key={index}>
                  <span className="text-gray-800 font-normal">{item}</span>
                  {index < restaurant.cuisines.length - 1 && <Dot />}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-green-600">
                <Clock className="text-green-600" />
                {restaurant.estimatedDeliveryTime} mins
              </div>

              <div className="flex items-center gap-1">
                <Banknote />
                Delivery from &#8377;{" "}
                {(restaurant.deliveryPrice / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
