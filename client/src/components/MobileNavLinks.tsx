import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <div className="w-full flex flex-col text-gray-600 font-semibold hover:text-black items-center justify-center gap-2 mt-3">
      <Link
        to={"/user-profile"}
        className=" hover:scale-110 hover:underline transition-all "
      >
        User Profile
      </Link>
      <Link to={"/orders"} className=" hover:scale-110 transition-all hover:underline">
        Orders
      </Link>
      <Link
        to={"/manage-restaurant"}
        className=" hover:scale-110 transition-all hover:underline"
      >
        Manage Restaurant
      </Link>
      <Button
        onClick={() => logout()}
        className="w-[80%] bg-red-700 text-white hover:bg-red-800"
      >
        Logout
      </Button>
    </div>
  );
};

export default MobileNavLinks;
