import { Orders } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
  order: Orders;
};

const OrderItemCard = ({ order }: Props) => {
  const getTime = () => {
    const orderdate = new Date(order.createdAt);

    const hours = orderdate.getHours();
    const minutes = orderdate.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card className="border border-gray-500">
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-3 justify-between mb-2">
          <div className="ml-2">
            Customer Name: <span>{order?.deliveryDetails?.name}</span>
          </div>

          <div className="ml-2">
            Delivery Address:{" "}
            <span>
              {order?.deliveryDetails?.addressLine1}{" "}
              {order?.deliveryDetails?.city}
            </span>
          </div>

          <div className="ml-2">
            Time: <span>{getTime()}</span>
          </div>

          <div className="ml-2">
            Total Cost:{" "}
            <span>&#8377; {(order.totalAmount / 100).toFixed(2)}</span>
          </div>
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col">
        
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
