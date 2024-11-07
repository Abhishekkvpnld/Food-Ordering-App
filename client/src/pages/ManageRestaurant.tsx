import {
  useCreateRestaurant,
  useGetMyRestaurantOrders,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurant = () => {
  const { createRestaurant, isLoading: createLoading } = useCreateRestaurant();
  const { restaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: updateLoading } = useUpdateRestaurant();
  const { orders, isLoading: getOrderLoading } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <div className="flex items-center justify-center py-4 w-[100vw]">
      <Tabs defaultValue="orders" className="w-[100vw] px-8">
        <TabsList className="px-2  bg-blue-200">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>

        <TabsContent
          value="orders"
          className="flex flex-col gap-2 items-center justify-center"
        >
          <h2 className="text-xl text-blue-800 font-bold">{orders?.length} active orders</h2>
          {
            orders?.map((item,index)=>(
              <OrderItemCard key={index} order={item}/>
            ))
          }
        </TabsContent>

        <TabsContent
          value="manage-restaurant"
          className="flex items-center justify-center"
        >
          {getOrderLoading ? (
            <p>Loading...</p>
          ) : (
            <ManageRestaurantForm
              restaurant={restaurant}
              onSave={isEditing ? updateRestaurant : createRestaurant}
              isLoading={createLoading || updateLoading}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRestaurant;
