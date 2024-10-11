import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurant = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const { restaurant } = useGetRestaurant();

  return (
    <div className="flex items-center justify-center py-4 w-[100vw]">
      <ManageRestaurantForm restaurant={restaurant} onSave={createRestaurant} isLoading={isLoading} />
    </div>
  );
};

export default ManageRestaurant;
