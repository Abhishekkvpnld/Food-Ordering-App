import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import {User} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCurrentUserRequest = async ():Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.get(`${API_BASE_URL}/api/user/get-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response?.data?.success) throw new Error("Failed to fetch user...❌");

    return response?.data?.data;
  };

  const {
    data: CurrentUser,
    error,
    isLoading,
  } = useQuery("fetchCurrentUser", getCurrentUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { CurrentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

// API call to create a user
export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.post(
      `${API_BASE_URL}/api/user/create-user`,
      user,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to create user...🤦‍♂️");
    }
  };

  const {
    mutateAsync: createUser,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createUserRequest);

  return {
    createUser,
    isError,
    isLoading,
    isSuccess,
  };
};

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string; 
  country: string;
};

export const useUpdateProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.put(
      `${API_BASE_URL}/api/user/update-user`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response?.data?.success) throw new Error("Failed to update user...❌");
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("User profile updated...✅");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isError,
    isLoading,
    error,
    reset,
    isSuccess,
  };
};
