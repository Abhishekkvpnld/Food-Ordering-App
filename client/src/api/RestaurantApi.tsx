import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant[]> => {
    const accessToken = await getAccessTokenSilently();

    const res = await axios.post(
      `${API_BASE_URL}/api/restaurant/create-restaurant`,
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res?.data?.success) throw new Error("Failed to create restaurant...");
    return res?.data?.data;
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created successfully...✅");
  }

  if (isError) {
    toast.error("Unable to create restaurant...❌");
  }
  return { createRestaurant, isLoading };
};


export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const res = await axios.get(
      `${API_BASE_URL}/api/restaurant/get-restaurant`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res?.data?.success) {
      throw new Error("Failed to get restaurants...✅");
    }
    return res?.data?.data;
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantRequest
  );

  return { restaurant, isLoading };
};
