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
    <div className="flex items-center justify-center flex-col gap-10  bg-slate-100">
      <HomeImg />
      <div className="bg-gradient-to-br from-orange-400 to-orange-100 w-[90%] md:w-[80%] rounded-3xl shadow-2xl py-10 px-8 flex flex-col items-center justify-center gap-6 -mt-20 transition-transform hover:scale-105 duration-300 border-t-4 border-orange-600 relative overflow-hidden">
  {/* Decorative Elements */}
  <div className="absolute top-0 left-0 w-16 h-16 bg-orange-500 opacity-20 rounded-full transform -translate-x-6 -translate-y-6"></div>
  <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-300 opacity-20 rounded-full transform translate-x-8 translate-y-8"></div>

  {/* Title */}
  <h1 className="text-5xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg flex items-center gap-3">
    <span role="img" aria-label="Fast Delivery">🚀</span> Fast & Fresh Delivery
  </h1>

  {/* Subtitle */}
  <p className="text-lg md:text-xl text-orange-900 font-medium text-center">
    Bringing Deliciousness Right to Your Doorstep!
  </p>

  {/* Search Bar */}
  <div className="w-full max-w-md">
    <SearchBar
      placeHolder="Search your city or town..."
      onSubmit={handleSearchSubmit}
    />
  </div>


  <button
  onClick={() => handleSearchSubmit({ searchQuery: "Kerala" })}
  className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-orange-700 transition-all flex items-center gap-2 text-lg font-semibold"
>
  Explore Now
  <span className="transform transition-transform duration-300 group-hover:translate-x-1">
    👉
  </span>
</button>

</div>



      <KeralaDistrictsCarousel />

      <div className="grid md:grid-cols-2 gap-5 px-1 mb-14">
        <img
          src="/landingImg.avif"
          alt="img"
          className="mix-blend-multiply shadow-lg"
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
