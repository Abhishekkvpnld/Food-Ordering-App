import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurant = () => {
  const { createRestaurant, isLoading: createLoading } = useCreateRestaurant();
  const { restaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: updateLoading } = useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
    <div className="flex items-center justify-center py-4 w-[100vw]">
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={createLoading || updateLoading}
      />
    </div>
  );
};

export default ManageRestaurant;
