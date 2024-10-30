import { useGetRestaurant } from "@/api/AllRestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderCart from "@/components/OrderCart";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    const storedCartItems = sessionStorage.getItem(`CartItems-${restaurantId}`);

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prev) => {
      const existingCartItem = prev.find((item) => item._id === menuItem._id);

      let updatedItems;

      if (existingCartItem) {
        updatedItems = prev.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
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
      const updateRemoveCart = prev.filter((item) => item._id !== cartItem._id);

      sessionStorage.setItem(
        `CartItems-${restaurantId}`,
        JSON.stringify(updateRemoveCart)
      );

      return updateRemoveCart;
    });
  };

  if (isLoading || !restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-8 w-[100vw] mt-2 pl-5 pr-8 ">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          alt="restaurantImg"
          className="w-full h-full object-cover rounded-md"
        />
      </AspectRatio>

      <span className="font-bold text-3xl">Restaurant Details</span>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-10">
        <div className="flex flex-col gap-3">
          <RestaurantInfo restaurant={restaurant} />
          <MenuItem restaurant={restaurant} addToCart={addToCart} />
        </div>

        <div>
          <OrderCart
            restaurant={restaurant}
            cartItems={CartItems}
            removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
