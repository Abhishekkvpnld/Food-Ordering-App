import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Dialog } from "./ui/dialog";
import { DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import UserProfileForm, { UserFormData } from "@/form/user-profile-form/UserProfileForm";
import { useGetCurrentUser } from "@/api/UserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ disabled, onCheckout }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { isLoading: getUserLoading, CurrentUser } = useGetCurrentUser();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-red-700 text-white">
        Login to checkout
      </Button>
    );
  }

  if (isAuthLoading || !CurrentUser) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button
        disabled={disabled}
        className="bg-green-700 text-white hover:bg-black mt-3 flex-1"
      >
        Go to checkout
      </Button>
    </DialogTrigger>
  
    <DialogContent
      className="max-w-[100vw] md:max-w-[100vw] md:min-w-[100vw]
                 fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-80"
    >
      <DialogTitle></DialogTitle>
      <UserProfileForm
        currentUser={CurrentUser}
        onSave={onCheckout}
        isLoading={getUserLoading}
        title="Confirm Delivery Details"
        buttonText="Continue to payment"
      />
    </DialogContent>
  </Dialog>
  
  
  );
};

export default CheckoutButton;
