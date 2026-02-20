import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import { ShoppingBag, LogIn } from "lucide-react";

type Props = {
  scrolled: boolean;
};

const MainNav = ({ scrolled }: Props) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const linkClass = `text-sm font-medium transition-all duration-200 hover:scale-105 ${
    scrolled
      ? "text-gray-600 hover:text-orange-500"
      : "text-white/80 hover:text-white"
  }`;

  return (
    <nav className="flex items-center gap-6">
      {isAuthenticated ? (
        <>
          <Link to="/orders" className={`flex items-center gap-1.5 ${linkClass}`}>
            <ShoppingBag size={16} />
            Orders
          </Link>
          <UsernameMenu scrolled={scrolled} />
        </>
      ) : (
        <Button
          onClick={async () => await loginWithRedirect()}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
            scrolled
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
              : "bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/25 hover:scale-105"
          }`}
        >
          <LogIn size={16} />
          Log In
        </Button>
      )}
    </nav>
  );
};

export default MainNav;
