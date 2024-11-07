import { Orders, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status";
import { useUpdateOrderStatus } from "@/api/RestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Orders;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateOrderStatus, isLoading } = useUpdateOrderStatus();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateOrderStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderdate = new Date(order.createdAt);

    const hours = orderdate.getHours();
    const minutes = orderdate.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card className="border border-gray-500 h-[100%]">
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

      <Separator className="w-[100%] mb-3" />

      <CardContent className="flex flex-col">
        <div className="flex flex-col gap-4">
          {order?.cartItems?.map((item, index) => (
            <span key={index}>
              <Badge variant={"outline"} className="mr-3">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-4 font-normal">
          <Label htmlFor="status" className="font-normal">
            Change status of this order...
          </Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger
              id="status"
              className="border border-red-500 rounded-md p-1 max-w-[50%] cursor-pointer hover:animate-pulse hover:bg-green-100 hover:border-green-800 hover:font-semibold hover:text-green-700"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent className="text-left font-normal text-sm space-y-1 border rounded-md bg-slate-50 px-4 py-2 mt-14">
              {ORDER_STATUS.map((order, index) => (
                <SelectItem
                  key={index}
                  value={order.value}
                  className="hover:underline hover:scale-105 transition-all cursor-pointer"
                >
                  {order.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
