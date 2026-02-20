import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Landmark, Sparkles } from "lucide-react";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

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
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* subtle decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full blur-[100px] opacity-30 translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* heading */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} /> Popular Districts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore food in{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Kerala
            </span>
          </h2>
        </div>

        {/* carousel */}
        <div className="overflow-hidden max-w-[100vw] mx-auto relative">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex"
            initial={{ x: "0%" }}
            animate={{ x: `-${currentIndex * 220}px` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {loopedDistricts.map((district, index) => (
              <motion.div
                onClick={() => navigate(`/search/${district.toLowerCase()}`)}
                key={index}
                whileHover={{ scale: 1.08, y: -4 }}
                className={`min-w-[160px] sm:min-w-[200px] cursor-pointer md:min-w-[220px] mx-2 p-5 text-center text-base font-semibold rounded-2xl border transition-all duration-300 ${
                  index % 2 === 0
                    ? "bg-white/80 backdrop-blur-sm border-amber-200/60 text-gray-800 shadow-sm hover:shadow-amber-200/50 hover:shadow-lg"
                    : "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white shadow-sm hover:shadow-purple-500/20 hover:shadow-lg"
                }`}
              >
                {index % 2 === 0 ? (
                  <MapPin
                    size={28}
                    className="mx-auto mb-2 text-amber-500"
                  />
                ) : (
                  <Landmark
                    size={28}
                    className="mx-auto mb-2 text-purple-300"
                  />
                )}
                {district}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default KeralaDistrictsCarousel;
