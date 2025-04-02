import { Orders } from "@/types";

type Props = {
  order: Orders;
};

const OrderStatusDetails = ({ order }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 ">
      <div className="flex flex-col">
        <span className="font-bold  underline text-blue-900">Delivery To :</span>
        <span className="text-gray-600 font-semibold">{order.deliveryDetails.name}</span>
        <span className="text-gray-600 font-semibold">
          {order?.deliveryDetails?.addressLine1} {order.deliveryDetails.city}
        </span>
      </div>

      <div className="flex ml-4 flex-col">
        <span className="font-bold underline text-blue-900">Your Order :</span>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={index} className="text-gray-600 font-semibold">
              {item?.name} x {item?.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-end items-center mt-1 md:mt-0">
        <span className="font-bold"> Total Amount</span>
        <span className=" text-red-800 font-bold">&#8377; {order?.totalAmount ? (order?.totalAmount/100).toFixed(2) : 0.00}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetails;
