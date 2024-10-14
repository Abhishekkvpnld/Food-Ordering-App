import Footer from "@/components/Footer";
import HomeImg from "@/components/HomeImg";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

const handleSearchSubmit = async(searchFormValue:SearchForm)=>{
navigate({
  pathname:`/search/${searchFormValue.searchQuery}`
})
}

  return (
    <div className="flex items-center justify-center flex-col gap-10  bg-slate-100">
      <HomeImg />

      <div className="bg-white w-[80%] rounded-lg shadow-md py-3 px-20 leading-none flex flex-col items-center justify-center gap-4 -mt-28">
        <h1 className="text-3xl font-bold text-orange-500 tracking-tight">
          Fast & Fresh Delivery
        </h1>
        <p className="text-md">Deliciousness at Your Doorstep!</p>
        <SearchBar placeHolder="Search by city or town..." onSubmit={handleSearchSubmit} />
      </div>

      <div className="grid md:grid-cols-2 gap-5 px-1 mb-14">
        <img src="/landingImg.avif" alt="img" className="mix-blend-multiply shadow-lg" />
        <div className="flex items-center justify-center flex-col gap-1">
          <h3 className="text-3xl font-semibold">Order-Take-away-even-faster</h3>
          <p className="text-sm"> Download our mobile app for quick and easy ordering!</p>
          <div className="">
            <img src="/downloadImg.png" alt="img" />
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default HomePage;
