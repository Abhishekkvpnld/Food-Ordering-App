import { CartItems } from "@/pages/RestaurantDetailsPage";
import { Restaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItems[];
  removeFromCart: () => void;
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
              <Badge variant={"outline"} className="mr-1">
                {item.quantity}
              </Badge>
              {item.name}
            </span>

            <span className="flex items-center gap-1">
              &#8377; {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <Separator className="text-black h-0.5" />

        <div className="flex justify-between">
          <span>Delivery Charge </span>
          <span>&#8377; {restaurant.deliveryPrice}.00</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCart;
