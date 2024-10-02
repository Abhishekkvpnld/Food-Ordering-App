import HomeImg from "@/components/HomeImg";
import { BsSearch } from "react-icons/bs";


const HomePage = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-10  bg-slate-100">
      <HomeImg />

      <div className="bg-white w-[80%] rounded-lg shadow-md py-3 px-20 leading-none flex flex-col items-center justify-center gap-4 -mt-28">
        <h1 className="text-3xl font-bold text-orange-500 tracking-tight">
          Fast & Fresh Delivery
        </h1>
        <p className="text-md">Deliciousness at Your Doorstep!</p>
        <div className="w-[100%] rounded-2xl flex items-center justify-start px-4  gap-5 bg-slate-200">
            <BsSearch className="hover:scale-110 hover:text-blue-700 hover:font-semibold"/>
          <input placeholder="search items here..." type="text" name="search" id="search" className="w-full h-10 bg-slate-200" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src="" alt="img" />
      </div>
    </div>
  );
};

export default HomePage;
