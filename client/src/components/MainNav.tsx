import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <nav className="flex items-center gap-8 w-full">
      {isAuthenticated ? (
        <div className="flex items-center gap-6 text-lg font-semibold">
          <Link 
            to="/orders" 
            className="text-gray-800 hover:scale-110 hover:text-red-600 transition-all"
          >
            📦 Orders
          </Link>
          <UsernameMenu />
        </div>
      ) : (
        <Button
          variant="ghost"
          className="border border-green-500 text-green-600 hover:bg-green-600 hover:text-white transition-all px-4 py-2 rounded-lg font-medium"
          onClick={async () => await loginWithRedirect()}
        >
          🔐 Log In
        </Button>
      )}
    </nav>
  );
};

export default MainNav;
