import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  Banknote,
  ChevronRight,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  restaurant: Restaurant;
};

const SearchResultsCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/restaurantDetails/${restaurant._id}`}
      className="
        group
        block
        bg-white
        border
        border-gray-100
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        hover:border-orange-100
        transition-all
        duration-300
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* Image */}
        <div className="relative overflow-hidden">
          <AspectRatio
            ratio={16 / 10}
            className="h-full min-h-[210px]"
          >
            <img
              src={restaurant.imageUrl}
              alt={restaurant.restaurantName}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </AspectRatio>

          {/* Image gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

          {/* Popular badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-800 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
              Popular
            </span>
          </div>

          {/* Bottom location */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1.5 text-white text-xs font-medium">
              <MapPin className="w-3.5 h-3.5" />
              {restaurant.city}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className="
                    text-xl
                    sm:text-2xl
                    font-black
                    tracking-tight
                    text-gray-900
                    group-hover:text-orange-500
                    transition-colors
                  "
                >
                  {restaurant.restaurantName}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Restaurant & Food Delivery
                </p>
              </div>

              <motion.div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-orange-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
                whileHover={{ x: 3 }}
              >
                <ChevronRight className="w-4 h-4 text-orange-500" />
              </motion.div>
            </div>

            {/* Cuisine tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {restaurant.cuisines
                .slice(0, 4)
                .map((cuisine, index) => (
                  <span
                    key={index}
                    className="
                      px-2.5
                      py-1
                      rounded-lg
                      bg-gray-50
                      border
                      border-gray-100
                      text-xs
                      font-semibold
                      text-gray-600
                    "
                  >
                    {cuisine}
                  </span>
                ))}

              {restaurant.cuisines.length > 4 && (
                <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-xs font-semibold">
                  +{restaurant.cuisines.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                  <Clock3 className="w-4 h-4 text-green-600" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">
                    Delivery
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    {restaurant.estimatedDeliveryTime} mins
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Banknote className="w-4 h-4 text-blue-500" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">
                    Delivery Fee
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    ₹
                    {parseInt(
                      restaurant.deliveryPrice
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center justify-end mt-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 group-hover:gap-2 transition-all">
                View restaurant
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;