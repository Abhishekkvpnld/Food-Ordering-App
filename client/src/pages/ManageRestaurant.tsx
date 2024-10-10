import ManageRestaurantForm from "@/form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurant = () => {
  return (
    <div className="flex items-center justify-center py-4 w-[100vw]">
      <ManageRestaurantForm onSave={() => ""} isLoading={false} />
    </div>
  );
};

export default ManageRestaurant;
