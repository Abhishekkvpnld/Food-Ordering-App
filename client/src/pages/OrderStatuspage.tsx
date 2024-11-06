import { useGetAllOrders } from "@/api/OrderApi";
import OrderStatusCard from "@/components/OrderDetailsHeader";

const OrderStatuspage = () => {
  const { isLoading, allOrders } = useGetAllOrders();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!allOrders || allOrders.length === 0) {
    return <p>No Orders Found</p>;
  }

  return (
    <div className="w-[100vw] h-[100vh] p-5">
        <h1 className="font-bold text-gray-700 text-xl"> Order History</h1>
      {allOrders.map((order, index) => (
        <div key={index} className="bg-gray-100 rounded-md">
          <OrderStatusCard order={order} />
        </div>
      ))}
    </div>
  );
};

export default OrderStatuspage;
