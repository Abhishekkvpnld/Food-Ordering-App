import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-lg transition-all">
        <User size={32} className="p-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-md" />
        <span className="font-semibold text-gray-800">{user?.name}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col mt-3 p-4 bg-white shadow-xl rounded-xl border max-w-64 z-10">
        <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md transition-all">
          <Link to={"/user-profile"} className="font-semibold text-gray-800 flex items-center">
            🧑‍💻 User Profile
          </Link>
        </DropdownMenuItem>

        <Separator className="my-2 bg-gray-300" />

        <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md transition-all">
          <Link to={"/manage-restaurant"} className="font-semibold text-gray-800 flex items-center">
            🍽️ Manage Restaurant
          </Link>
        </DropdownMenuItem>

        <Separator className="my-2 bg-gray-300" />

        <DropdownMenuItem>
          <Button 
            className="w-full text-white bg-red-600 hover:bg-red-700 transition-all rounded-lg p-2 mt-2"
            onClick={() => logout()}
          >
            <LogOut className="mr-2"/> Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
