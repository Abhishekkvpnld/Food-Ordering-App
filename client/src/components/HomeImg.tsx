import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HomeImg = () => {
  const navigate = useNavigate();
  let place = "India";

  const handleFoods = () => {
    navigate(`/search/${place}`);
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-[70vh] flex-wrap md:flex-row">
      {/* Image Section */}
      <div className="flex items-center justify-center flex-1">
        <img
          src="/homeImg.webp"
          className="hover:scale-110 transition-all mix-blend-multiply w-[70%] lg:h-[300px]"
          alt="img"
        />
      </div>

      {/* Text Section */}
      <div className="mt-4 flex items-center flex-col h-[300px] justify-center flex-1">
        <p className="text-lg text-slate-600 font-semibold animate-bounce text-center md:text-left">
          <span className="text-orange-500">Discover</span> delicious dishes from
          around the world, delivered to your{" "}
          <span className="text-green-500">door.</span>
        </p>

        {/* Explore Button */}
        <button
          onClick={handleFoods}
          className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg flex items-center gap-3 text-lg font-semibold shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Explore Food
          <span className="inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1">
            <FaArrowRightLong />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomeImg;
