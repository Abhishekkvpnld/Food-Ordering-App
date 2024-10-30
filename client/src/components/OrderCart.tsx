import { CartItems } from "@/pages/RestaurantDetailsPage";
import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CartItems as CartItemsType } from "../pages/RestaurantDetailsPage";
import CheckoutButton from "./CheckoutButton";
import { UserFormData } from "@/form/user-profile-form/UserProfileForm";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItems[];
  removeFromCart: (item: CartItemsType) => void;
};

const OrderCart = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDeliveryPrice = totalPrice + restaurant.deliveryPrice;

    return totalWithDeliveryPrice;
  };

  const onCheckout = (userFormData: UserFormData) => {
    console.log(userFormData);
  };

  return (
    <Card className="border-slate-500">
      <CardHeader>
        <CardTitle className="flex justify-between tracking-tight font-bold text-2xl">
          <span>Your Order</span>
          <span>&#8377; {getTotalPrice()}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {cartItems.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <span>
              <Badge
                variant={"outline"}
                className="mr-3 bg-blue-800 text-white"
              >
                {item.quantity}
              </Badge>
              {item.name}
            </span>

            <span className="flex items-center gap-1">
              &#8377; {(item.price * item.quantity).toFixed(2)}
              <MdOutlineDeleteOutline
                size={25}
                color="red"
                className="hover:scale-125 transition-all cursor-pointer"
                onClick={() => removeFromCart(item)}
              />
            </span>
          </div>
        ))}

        <Separator className="text-black h-0.5" />

        <div className="flex justify-between">
          <span>Delivery Charge </span>
          <span>&#8377; {restaurant.deliveryPrice}.00</span>
        </div>
      </CardContent>
      <Separator className="text-black h-0.5" />

      <CardFooter className="mt-2 flex items-center justify-center ">
        <CheckoutButton
          disabled={cartItems.length === 0}
          onCheckout={onCheckout}
        />
      </CardFooter>
    </Card>
  );
};

export default OrderCart;
