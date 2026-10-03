import { MenuItem as MenuItemType, Restaurant } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Clock3,
  Flame,
  Plus,
  Star,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  restaurant: Restaurant;
  addToCart: (menuItem: MenuItemType) => void;
};

const MenuItem = ({ restaurant, addToCart }: Props) => {

  console.log(restaurant.menuItems)

  return (
    <div className="mt-2">
      {/* Menu Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-orange-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Menu
            </h2>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Freshly prepared dishes made just for you.
          </p>
        </div>

        <span className="hidden sm:block text-sm text-gray-400">
          {restaurant?.menuItems?.length} items
        </span>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {restaurant?.menuItems?.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.05, 0.3),
            }}
            whileHover={{
              y: -2,
            }}
          >
            <Card
              className="
                group
                overflow-hidden
                border
                border-gray-100
                bg-white
                rounded-2xl
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
              "
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex gap-4">
                  {/* =========================================
                      FOOD IMAGE
                  ========================================= */}
                  <div className="relative shrink-0">
                    {item?.imageUrl ? (
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-gray-100">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center">
                        <Utensils className="w-10 h-10 text-orange-300" />
                      </div>
                    )}

                    {/* Popular Badge */}
                    {index === 0 && (
                      <div className="absolute -bottom-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold shadow-md">
                        <Flame className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                  </div>

                  {/* =========================================
                      DETAILS
                  ========================================= */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* Name + Rating */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-green-50">
                          <Star className="w-3 h-3 fill-green-600 text-green-600" />

                          <span className="text-xs font-semibold text-green-700">
                            4.5
                          </span>
                        </div>

                        <span className="text-xs text-gray-400">
                          Popular choice
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mt-2 line-clamp-2">
                      {item?.details ||
                        "Freshly prepared with quality ingredients and delicious flavors. A perfect choice for your next meal."}
                    </p>

                    {/* Price + Add */}
                    <div className="flex items-end justify-between gap-3 mt-auto pt-4">
                      <div>
                        <p className="text-xl font-extrabold text-gray-900">
                          ₹{item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                          <Clock3 className="w-3 h-3" />
                          <span>20–30 min</span>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="
                            h-10
                            px-4
                            rounded-xl
                            bg-orange-50
                            border
                            border-orange-200
                            text-orange-600
                            hover:bg-orange-500
                            hover:text-white
                            hover:border-orange-500
                            font-bold
                            shadow-none
                            transition-all
                          "
                        >
                          <Plus className="w-4 h-4 mr-1.5" />
                          Add
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* =========================================
                    EXTRA DETAILS
                ========================================= */}
                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-gray-100">
                  <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Serving
                    </p>

                    <p className="text-xs font-semibold text-gray-700 mt-1">
                      1 Person
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Preparation
                    </p>

                    <p className="text-xs font-semibold text-gray-700 mt-1">
                      Fresh
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Category
                    </p>

                    <p className="text-xs font-semibold text-orange-600 mt-1">
                      Chef's Choice
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuItem;

