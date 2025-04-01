import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="py-2 bg-slate-100 shadow-lg px-6 transition-all ease-in-out duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={"/"}
          className="text-4xl font-semibold text-gray-800 tracking-tight transform hover:scale-110 transition-transform duration-300"
        >
          DeliGo
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="md:block hidden">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
