import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  User as UserIcon,
  ShoppingBag,
  ChefHat,
  LogOut,
} from "lucide-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  const links = [
    { to: "/user-profile", label: "User Profile", icon: UserIcon },
    { to: "/orders", label: "Orders", icon: ShoppingBag },
    { to: "/manage-restaurant", label: "Manage Restaurant", icon: ChefHat },
  ];

  return (
    <div className="flex flex-col gap-1 px-2">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group"
        >
          <link.icon
            size={18}
            className="text-gray-400 group-hover:text-orange-500 transition-colors"
          />
          {link.label}
        </Link>
      ))}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button
          onClick={() => logout()}
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl py-3 font-medium transition-all"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default MobileNavLinks;
