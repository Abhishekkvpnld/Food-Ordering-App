import { Orders, Restaurant } from "@/types";
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

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant[]> => {
    const accessToken = await getAccessTokenSilently();

    const res = await axios.put(
      `${API_BASE_URL}/api/restaurant/update-restaurant`,
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res) throw new Error("Failed to update restaurant...❌");

    return res?.data;
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant updated...✅");
  }

  if (error) {
    toast.error("Unable to update restaurant...❌");
  }

  return {
    isLoading,
    updateRestaurant,
  };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestuarantOrdersRequest = async (): Promise<Orders[]> => {
    const accessToken = await getAccessTokenSilently();

    const res = await axios.get(`${API_BASE_URL}/api/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.data.success) throw new Error("Failed to fetch orders...❌");

    return res?.data?.data;
  };

  const { data: orders, isLoading } = useQuery(
    "fetchRestaurantOrders",
    getRestuarantOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatus = {
  orderId: string;
  status: string;
};

export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateOrderStatusRequest = async (
    UpdateOrderStatus: UpdateOrderStatus
  ) => {
    const accessToken = await getAccessTokenSilently();

    const res = await axios.patch(
      `${API_BASE_URL}/api/restaurant/order/${UpdateOrderStatus.orderId}/status`,
      {
        status: UpdateOrderStatus.status,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res?.data?.success) {
      throw new Error("Failed to Update Status...❌");
    }

    return res?.data?.data;
  };

  const {
    mutateAsync: updateOrderStatus,
    isError,
    isSuccess,
    isLoading,
    reset,
  } = useMutation(updateOrderStatusRequest);

  if (isSuccess) {
    toast.success("Order Updated...");
  }

  if (isError) {
    toast.error("Unable to Update Order Status...");
    reset();
  }

  return { updateOrderStatus, isLoading };
};
