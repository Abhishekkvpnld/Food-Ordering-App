import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { IoMdMenu } from "react-icons/io";
import { CircleUserIcon } from "lucide-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <IoMdMenu className="text-orange-600 text-3xl" />
      </SheetTrigger>

      <SheetContent>
        <SheetTitle className="flex items-center justify-center gap-2">
          <CircleUserIcon className="size-10 mb-2"/>
          {isAuthenticated ? <span>{user?.name}</span> : <span>Welcome to DeliGo</span>}
        </SheetTitle>

        <Separator />
        {isAuthenticated ? (
         <MobileNavLinks/>
        ) : (
          <SheetDescription className="flex items-center justify-center flex-col mt-4">
            <Button
              onClick={() => loginWithRedirect()}
              className="flex-1 w-[80%] bg-blue-700 text-white font-semibold hover:bg-blue-800"
            >
              Login
            </Button>
          </SheetDescription>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
