import axios from "axios";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (city: string) => {
  const searchRestaurantRequest = async () => {
    const res = await axios.post(
      `${API_BASE_URL}/api/allRestaurant/search/${city}`
    );

    if (res?.data?.error) throw new Error("Failed to get restaurant...❌");

    return res?.data;
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants"],
    searchRestaurantRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
