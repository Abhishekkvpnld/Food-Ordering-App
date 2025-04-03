import Footer from "@/components/Footer";
import HomeImg from "@/components/HomeImg";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import KeralaDistrictsCarousel from "../components/KeralaDistrictsCarousel";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = async (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };

  return (
    <div className="flex items-center justify-center flex-col  bg-slate-100">
      <HomeImg />

      <div className="relative w-[90%] md:w-[80%] max-w-4xl mx-auto flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* 🔹 Floating Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-orange-500 opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-14 h-14 md:w-20 md:h-20 bg-yellow-400 opacity-25 rounded-full animate-pulse"></div>

        {/* 🚀 Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 text-center flex items-center gap-3 md:gap-4">
          <span role="img" aria-label="Fast Delivery">
            🚀
          </span>
          Fast & Fresh Delivery
        </h1>

        {/* 📝 Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 font-medium text-center mt-3">
          Bringing Deliciousness Right to Your Doorstep!
        </p>

        {/* 🔍 Search Bar */}
        <div className="w-full  lg:max-w-[80%] mt-6">
          <SearchBar
            placeHolder="Search your city or district..."
            onSubmit={handleSearchSubmit}
          />
        </div>

        {/* 📍 Explore Button */}
        <button
          onClick={() => handleSearchSubmit({ searchQuery: "kannur" })}
          className="mt-6 bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Explore Now 🚀
        </button>
      </div>

      <KeralaDistrictsCarousel />

      <div className="grid items-center justify-center grid-cols-1 md:grid-cols-2 gap-5 px-1 mb-14">
        <img
          src="/food-delivery.jpg"
          alt="img"
          className="mix-blend-multiply"
        />
        <div className="flex items-center justify-center flex-col gap-1">
          <h3 className="text-3xl font-semibold">
            Order-Take-away-even-faster
          </h3>
          <p className="text-sm">
            {" "}
            Download our mobile app for quick and easy ordering!
          </p>
          <div className="">
            <img src="/downloadImg.png" alt="img" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
