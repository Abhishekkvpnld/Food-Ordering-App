import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { LogOut, User, ChefHat, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {
  scrolled: boolean;
};

const UsernameMenu = ({ scrolled }: Props) => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 ${
          scrolled
            ? "border-gray-200 bg-white shadow-sm hover:shadow-md"
            : "border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20"
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
          <User size={14} className="text-white" />
        </div>
        <span
          className={`text-sm font-semibold transition-colors duration-300 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          {user?.name}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col mt-3 p-3 bg-white/95 backdrop-blur-xl shadow-xl shadow-black/10 rounded-2xl border border-gray-100 min-w-[220px] z-50">
        {/* User info header */}
        <div className="px-3 py-2 mb-1">
          <p className="text-sm font-bold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>

        <Separator className="my-1.5 h-px bg-gray-100" />

        <DropdownMenuItem className="outline-none">
          <Link
            to="/user-profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all w-full group"
          >
            <UserCircle
              size={18}
              className="text-gray-400 group-hover:text-orange-500 transition-colors"
            />
            User Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="outline-none">
          <Link
            to="/manage-restaurant"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all w-full group"
          >
            <ChefHat
              size={18}
              className="text-gray-400 group-hover:text-orange-500 transition-colors"
            />
            Manage Restaurant
          </Link>
        </DropdownMenuItem>

        <Separator className="my-1.5 h-px bg-gray-100" />

        <DropdownMenuItem className="outline-none">
          <Button
            className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-xl py-2.5 mt-1 font-medium text-sm transition-all"
            onClick={() => logout()}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
