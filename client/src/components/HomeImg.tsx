import { FaArrowRightLong } from "react-icons/fa6";

const HomeImg = () => {
  return (
    <div className="flex items-start justify-center min-h-[70vh] flex-wrap md:flex-row ">
      <div className="flex items-center justify-center flex-1">
        <img
          src="/homeImg.webp"
          className="hover:scale-110 transition-all mix-blend-multiply w-[70%] h-[300px]"
          alt="img"
        />
      </div>
      <div className="mt-4 flex items-start flex-col h-[300px] justify-center flex-1 pr-10">
        <p className="text-lg text-slate-600 font-semibold animate-bounce">
          Discover delicious dishes from around the world, delivered to your
          door.
        </p>
        <button className="border py-2 px-6 rounded-lg hover:bg-green-600 hover:text-white flex items-center justify-between gap-3">
          Explore Food
          <span className="inline-block transform transition-transform duration-300 ease-in-out hover:translate-x-2">
            <FaArrowRightLong />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HomeImg;
