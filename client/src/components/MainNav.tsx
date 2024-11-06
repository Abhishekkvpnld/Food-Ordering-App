import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span>
      {isAuthenticated ? (
        <div className="flex font-semibold gap-10 ">
          <Link className="hover:text-green-700" to={"/orders"}>Orders</Link>
          <UsernameMenu />
        </div>
      ) : (
        <Button
          variant={"ghost"}
          className="bg-white border border-green-500 hover:border-green-600 hover:bg-green-600 hover:text-white h-8 font-semibold text-green-500"
          onClick={async () => loginWithRedirect()}
        >
          LogIn
        </Button>
      )}
    </span>
  );
};

export default MainNav;
