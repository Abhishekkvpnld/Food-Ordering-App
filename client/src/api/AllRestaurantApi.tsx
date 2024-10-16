import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (
  city: string | undefined,
  searchState: SearchState
) => {
  const searchRestaurantRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const params = new URLSearchParams();

      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));

      const res = await axios.get(
        `${API_BASE_URL}/api/allRestaurant/search/${city}?${params.toString()}`
      );

      if (res?.data?.error) throw new Error("Failed to get restaurant...❌");

      return res?.data?.data;
    };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    searchRestaurantRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
