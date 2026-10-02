import { useGetRestaurant } from "@/api/AllRestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderCart from "@/components/OrderCart";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, Utensils } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";

export type CartItems = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [CartItems, setCartItems] = useState<CartItems[]>(() => {
    const storedCartItems = sessionStorage.getItem(
      `CartItems-${restaurantId}`
    );

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prev) => {
      const existingCartItem = prev.find(
        (item) => item._id === menuItem._id
      );

      let updatedItems;

      if (existingCartItem) {
        updatedItems = prev.map((item) =>
          item._id === menuItem._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        updatedItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `CartItems-${restaurantId}`,
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const removeFromCart = (cartItem: CartItems) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter(
        (item) => item._id !== cartItem._id
      );

      sessionStorage.setItem(
        `CartItems-${restaurantId}`,
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-5 py-8">
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="h-[280px] rounded-3xl bg-gray-200" />

          <div className="h-10 w-72 rounded-lg bg-gray-200" />

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-36 rounded-2xl bg-gray-200"
                />
              ))}
            </div>

            <div className="h-96 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
            <Utensils className="w-7 h-7 text-orange-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Restaurant not found
          </h2>

          <p className="text-gray-500 mt-2">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const totalItems = CartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AspectRatio ratio={16 / 5}>
              <div className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Top badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    Popular Restaurant
                  </span>
                </div>

                {/* Hero content */}
                <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 text-white">
                  <p className="text-sm sm:text-base text-white/80 mb-1">
                    Delicious food • Fast delivery
                  </p>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                    {restaurant.name}
                  </h1>
                </div>
              </div>
            </AspectRatio>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-5
            sm:p-6
            mb-8
          "
        >
          <RestaurantInfo restaurant={restaurant} />
        </motion.section>

        {/* =====================================================
            MENU + CART
        ===================================================== */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ===================================================
              MENU
          =================================================== */}
          <section>
            {/* Menu heading */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-orange-500" />
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Explore the Menu
                  </h2>
                </div>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Freshly prepared dishes made just for you.
                </p>
              </div>

              {totalItems > 0 && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold">
                  <ShoppingBag className="w-4 h-4" />
                  {totalItems} items
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              <MenuItem
                restaurant={restaurant}
                addToCart={addToCart}
              />
            </div>
          </section>

          {/* ===================================================
              CART
          =================================================== */}
          <aside className="lg:sticky lg:top-24">
            <div className="relative">
              {totalItems > 0 && (
                <div className="absolute -top-3 right-4 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="
                      flex
                      items-center
                      gap-1.5
                      px-3
                      py-1.5
                      rounded-full
                      bg-orange-500
                      text-white
                      text-xs
                      font-bold
                      shadow-lg
                    "
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {totalItems} items
                  </motion.div>
                </div>
              )}

              <OrderCart
                restaurant={restaurant}
                cartItems={CartItems}
                removeFromCart={removeFromCart}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetailsPage;