import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="py-4 border-b-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={"/"}
          className="text-3xl font-bold tracking-tight text-green-600"
        >
          DeliGo
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="md:block hidden">
            <MainNav/>
        </div>
      </div>
    </div>

  );
};

export default Header;
