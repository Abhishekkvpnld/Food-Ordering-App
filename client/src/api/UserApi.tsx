import axios from "axios";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string; 
  email: string;
};

// API call to create a user
const createUserRequest = async (user: CreateUserRequest) => {
  const response = await axios.post(`${API_BASE_URL}/api/user/create-user`, user);

  if (response.status !== 200) {
    throw new Error("Failed to create user...🤦‍♂️");
  }

  return response.data; 
};

export const useCreateUser = () => {
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
