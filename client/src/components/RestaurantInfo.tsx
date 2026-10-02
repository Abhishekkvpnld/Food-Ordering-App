import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Clock3,
  MapPin,
  Star,
  Bike,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border border-gray-100 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
        {/* Decorative background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />

        <CardHeader className="relative pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Restaurant Name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-orange-500" />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                  Restaurant
                </span>
              </div>

              <CardTitle className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {restaurant?.restaurantName}
              </CardTitle>

              {/* Location */}
              <div className="flex items-center gap-1.5 mt-2 text-gray-500">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />

                <span className="text-sm sm:text-base">
                  {restaurant?.city}, {restaurant?.country}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 self-start px-3 py-2 rounded-xl bg-green-50 border border-green-100">
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>

              <div>
                <p className="text-sm font-bold text-green-700">
                  4.8
                </p>

                <p className="text-[10px] text-green-600">
                  Excellent
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative pt-0">
          {/* Cuisine */}
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
              Cuisine
            </p>

            <div className="flex flex-wrap gap-2">
              {restaurant.cuisines.map((cuisine, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                  }}
                  className="
                    inline-flex
                    items-center
                    px-3
                    py-1.5
                    rounded-full
                    bg-orange-50
                    border
                    border-orange-100
                    text-orange-700
                    text-xs
                    sm:text-sm
                    font-semibold
                  "
                >
                  {cuisine}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Restaurant Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Delivery */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Bike className="w-4 h-4 text-blue-500" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Delivery
                </p>

                <p className="text-sm font-semibold text-gray-800">
                  20–30 min
                </p>
              </div>
            </div>

            {/* Preparation */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Clock3 className="w-4 h-4 text-orange-500" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Preparation
                </p>

                <p className="text-sm font-semibold text-gray-800">
                  Freshly Made
                </p>
              </div>
            </div>

            {/* Safety */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Quality
                </p>

                <p className="text-sm font-semibold text-gray-800">
                  Verified
                </p>
              </div>
            </div>
          </div>

          {/* Bottom message */}
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />

            <p className="text-xs sm:text-sm text-gray-500">
              Open now • Fresh food prepared with quality ingredients
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RestaurantInfo;

