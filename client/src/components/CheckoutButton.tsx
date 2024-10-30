import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";

const CheckoutButton = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return <Button onClick={onLogin} className="bg-red-700 text-white">Login to checkout</Button>;
  }

if(isAuthLoading){
    return <LoadingButton/>
}

  return <div>CheckoutButton</div>;
};

export default CheckoutButton;
