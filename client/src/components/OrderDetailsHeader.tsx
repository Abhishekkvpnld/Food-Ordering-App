import { Orders } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status";
import OrderStatusDetails from "./OrderStatusDetails";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type Props = {
  order: Orders;
};

const OrderDetailsHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderInfo = () => {
    return (
      ORDER_STATUS.find((i) => i.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <div className="w-full px-5 py-2 rounded-md mt-2 border border-gray-700">
      <h1 className="font-semibold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between ">
        <span>Order Status : {getOrderInfo().label}</span>
        <span>Expected By : {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse mt-3 mb-1 w-[100%] bg-green-400 "
        value={getOrderInfo().progressValue}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <OrderStatusDetails order={order} />
        <AspectRatio ratio={20 / 5}>
          <img
            src={order.restaurant.imageUrl}
            alt="img"
            className="object-cover h-full w-full"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
