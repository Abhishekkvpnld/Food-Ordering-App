import { useSearchRestaurant } from "@/api/AllRestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurant(city);

  return <span>{`search city ${city}`}</span>;
};

export default SearchPage;
