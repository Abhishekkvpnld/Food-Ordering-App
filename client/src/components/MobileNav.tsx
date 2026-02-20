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
import { Menu, User, LogIn, Utensils } from "lucide-react";
import MobileNavLinks from "./MobileNavLinks";

type Props = {
  scrolled: boolean;
};

const MobileNav = ({ scrolled }: Props) => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={`p-2 rounded-lg transition-all duration-200 ${
            scrolled
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>

      <SheetContent className="bg-white border-l border-gray-100">
        <SheetTitle className="flex items-center gap-3 px-2">
          {isAuthenticated ? (
            <>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                <Utensils size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Welcome to DeliGo
                </p>
                <p className="text-xs text-gray-400">Sign in to continue</p>
              </div>
            </>
          )}
        </SheetTitle>

        <Separator className="my-4" />

        {isAuthenticated ? (
          <MobileNavLinks />
        ) : (
          <SheetDescription className="flex flex-col items-center mt-4 px-2">
            <Button
              onClick={() => loginWithRedirect()}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <LogIn size={18} />
              Log In
            </Button>
          </SheetDescription>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
