import { useGetRestaurant } from "@/api/AllRestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  if (isLoading || !restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-8 w-[100vw] mt-2 px-5 ">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          alt="restaurantImg"
          className="w-full h-full object-cover rounded-md"
        />
      </AspectRatio>

      <span className="font-bold text-3xl">Restaurant Details</span>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-10">
        <div className="flex flex-col gap-3">
          <RestaurantInfo restaurant={restaurant} />
          <MenuItem restaurant={restaurant} />
        </div>

        <div>items</div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
