import { useGetAllOrders } from "@/api/OrderApi";
import OrderStatusCard from "@/components/OrderDetailsHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

const OrderStatusPage = () => {
  const { isLoading, allOrders } = useGetAllOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!allOrders || allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <h2 className="text-2xl font-semibold">No Orders Found</h2>
        <p className="mt-2 text-sm">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        🛒 Order History
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 transition-transform transform hover:scale-105"
          >
            <OrderStatusCard order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusPage;
