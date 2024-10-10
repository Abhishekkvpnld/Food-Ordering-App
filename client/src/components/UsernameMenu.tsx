import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-2 font-semibold">
        <CircleUserRound />
        {user?.name}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex mt-2 item items-center justify-center gap-2 flex-col flex-1 bg-gray-300 rounded-md py-3 px-4 ml-8">
        <DropdownMenuItem>
          <Link to={"/user-profile"} className="font-semibold">
            User Profile
          </Link>
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem>
          <Link to={"/manage-restaurant"} className="font-semibold">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem>
          <Button className="text-white bg-red-700" onClick={() => logout()}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
