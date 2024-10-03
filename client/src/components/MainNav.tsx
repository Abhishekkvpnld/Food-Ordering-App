import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MainNav = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant={"ghost"}
      className="bg-white border border-green-500 hover:border-green-600 hover:bg-green-600 hover:text-white h-8 font-semibold text-green-500"
      onClick={async () => loginWithRedirect()}
    >
      LogIn
    </Button>
  );
};

export default MainNav;
