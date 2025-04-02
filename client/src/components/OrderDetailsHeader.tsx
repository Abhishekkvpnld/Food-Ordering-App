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
      created.getMinutes() + parseInt(order.restaurant.estimatedDeliveryTime)
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderInfo = () => {
    return ORDER_STATUS.find((i) => i.value === order.status) || ORDER_STATUS[0];
  };

  return (
    <div className="w-full bg-white shadow-sm hover:shadow-lg transition-all rounded-lg p-5 mt-4 border border-gray-300">
      <div className="flex flex-col lg:flex-row justify-between items-center pb-4 border-b">
        <h1 className="text-lg font-semibold text-gray-800">
          Order Status:{" "}
          <span className="text-blue-600">{getOrderInfo().label}</span>
        </h1>
        <h2 className="text-md font-medium text-gray-600">
          Expected By: <span className="text-green-600">{getExpectedDelivery()}</span>
        </h2>
      </div>

      <Progress
        className="mt-4 w-full transition-all duration-300 ease-in-out"
        value={getOrderInfo().progressValue}
        color="green"
      />

      <div className="grid gap-6 lg:grid-cols-2 mt-5">

        <OrderStatusDetails order={order} />
        
        <div className="relative">
          <AspectRatio ratio={16 / 11} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={order.restaurant.imageUrl}
              alt="Restaurant Image"
              className="object-cover h-full w-full rounded-lg"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
