import {
  useCreateRestaurant,
  useGetMyRestaurantOrders,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ClipboardList,
  Clock3,
  LayoutDashboard,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";

const ManageRestaurant = () => {
  const { createRestaurant, isLoading: createLoading } =
    useCreateRestaurant();

  const { restaurant } = useGetRestaurant();

  const { updateRestaurant, isLoading: updateLoading } =
    useUpdateRestaurant();

  const { orders, isLoading: getOrderLoading } =
    useGetMyRestaurantOrders();

  const isEditing = !!restaurant;
  const orderCount = orders?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-[45%] -left-40 w-80 h-80 bg-orange-50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-orange-500" />
                </div>

                <span className="text-xs uppercase tracking-[0.18em] font-bold text-orange-500">
                  Restaurant Dashboard
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
                Manage your restaurant
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-2xl">
                Manage incoming orders, restaurant information, menu items,
                pricing, and your restaurant image from one place.
              </p>
            </div>

            {/* Restaurant status */}
            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Store className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Restaurant Status
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold text-gray-800">
                    {isEditing ? "Active" : "Not Created"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="orders" className="w-full">
            {/* Tabs header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TabsList className="h-auto w-full sm:w-auto p-1.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <TabsTrigger
                  value="orders"
                  className="
                    rounded-xl
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    data-[state=active]:bg-orange-500
                    data-[state=active]:text-white
                    data-[state=active]:shadow-md
                  "
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Orders
                </TabsTrigger>

                <TabsTrigger
                  value="manage-restaurant"
                  className="
                    rounded-xl
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    data-[state=active]:bg-orange-500
                    data-[state=active]:text-white
                    data-[state=active]:shadow-md
                  "
                >
                  <Store className="w-4 h-4 mr-2" />
                  Manage Restaurant
                </TabsTrigger>
              </TabsList>

              {/* Order summary */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <Clock3 className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-500">
                    Active Orders
                  </span>
                  <span className="font-bold text-gray-900">
                    {orderCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Orders */}
            <TabsContent value="orders" className="mt-0">
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                        <UtensilsCrossed className="w-4 h-4 text-orange-500" />
                      </div>

                      <h2 className="text-xl font-bold text-gray-900">
                        Incoming Orders
                      </h2>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Review and manage orders placed by your customers.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-xs font-bold text-orange-700">
                      {orderCount}{" "}
                      {orderCount === 1 ? "Active Order" : "Active Orders"}
                    </span>
                  </div>
                </div>

                {orderCount === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 flex flex-col items-center justify-center text-center border border-dashed border-gray-200 rounded-2xl"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                      <ClipboardList className="w-7 h-7 text-gray-400" />
                    </div>

                    <h3 className="font-bold text-gray-800">
                      No active orders
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 max-w-sm">
                      New customer orders will appear here when they are
                      placed.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {orders?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: Math.min(index * 0.05, 0.3),
                        }}
                      >
                        <OrderItemCard order={item} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Manage Restaurant */}
            <TabsContent value="manage-restaurant" className="mt-0">
              {getOrderLoading ? (
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm min-h-[400px] flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <ManageRestaurantForm
                  restaurant={restaurant}
                  onSave={
                    isEditing ? updateRestaurant : createRestaurant
                  }
                  isLoading={createLoading || updateLoading}
                />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageRestaurant;
