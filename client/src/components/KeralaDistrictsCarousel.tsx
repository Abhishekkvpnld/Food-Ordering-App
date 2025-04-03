import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const districts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

const KeralaDistrictsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % districts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loopedDistricts = [...districts, ...districts];

  return (
    <div className="overflow-hidden max-w-[100vw] mx-auto my-10 px-4">
      <motion.div
        className="flex"
        initial={{ x: "0%" }}
        animate={{ x: `-${currentIndex * 220}px` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {loopedDistricts.map((district, index) => (
          <div
            onClick={() => navigate(`/search/${district.toLowerCase()}`)}
            key={index}
            className={`min-w-[160px] sm:min-w-[200px] cursor-pointer md:min-w-[220px] mx-2 p-4 text-center text-lg font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl ${
              index % 2 === 0
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black"
                : "bg-gradient-to-r from-purple-600 to-violet-700 text-white"
            }`}
          >
            {index % 2 === 0 ? (
              <MapPin size={32} className="mx-auto mb-2" />
            ) : (
              <Landmark size={32} className="mx-auto mb-2" />
            )}
            {district}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default KeralaDistrictsCarousel;
