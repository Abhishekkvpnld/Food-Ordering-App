import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { Utensils } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
              scrolled
                ? "bg-gradient-to-br from-orange-500 to-amber-500 shadow-orange-500/20"
                : "bg-white/15 backdrop-blur-md border border-white/20 shadow-white/10"
            }`}
          >
            <Utensils
              size={18}
              className={`transition-colors duration-300 ${
                scrolled ? "text-white" : "text-white"
              }`}
            />
          </div>
          <span
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            Deli
            <span
              className={`transition-colors duration-300 ${
                scrolled ? "text-orange-500" : "text-orange-400"
              }`}
            >
              Go
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <MainNav scrolled={scrolled} />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <MobileNav scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
};

export default Header;
