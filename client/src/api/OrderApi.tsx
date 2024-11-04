import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
    restaurantId: string;
    cartItems: {
      name: string;
      quantity: string;
      menuItemId: string;
    }[];
    deliveryDetails: {
      city: string;
      email: string;
      addressLine1: string;
      name: string;
    };
  };

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (checkoutSessionRequest:CheckoutSessionRequest) => {
    const accessToken = await getAccessTokenSilently();

    const res = await axios.post(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      checkoutSessionRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.data.success) {
      throw new Error("Unable to create checkout session");
    }
    return res.data;
  };

  const {
    mutateAsync: createCheckoutSession,
    reset,
    isLoading,
    error,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error((error as Error).message);
    reset();
  }

  return { createCheckoutSession, isLoading };
};
