import { useCreateRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurant = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant();

  return (
    <div className="flex items-center justify-center py-4 w-[100vw]">
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    </div>
  );
};

export default ManageRestaurant;
