import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SearchBar, { SearchForm } from "./SearchBar";
import { useNavigate } from "react-router-dom";

const floatingEmojis = [
  { emoji: "🍕", className: "top-[15%] left-[8%] text-4xl md:text-5xl animate-float", delay: 0 },
  { emoji: "🍔", className: "top-[25%] right-[10%] text-3xl md:text-5xl animate-float-reverse", delay: 1 },
  { emoji: "🍣", className: "bottom-[30%] left-[5%] text-3xl md:text-4xl animate-float-slow", delay: 2 },
  { emoji: "🌮", className: "top-[60%] right-[7%] text-4xl md:text-5xl animate-float", delay: 0.5 },
  { emoji: "🍜", className: "top-[10%] right-[35%] text-3xl md:text-4xl animate-float-reverse", delay: 1.5 },
  { emoji: "🧁", className: "bottom-[20%] right-[25%] text-3xl md:text-4xl animate-float-slow", delay: 0.8 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const HomeImg = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValue: SearchForm) => {
    navigate({ pathname: `/search/${searchFormValue.searchQuery}` });
  };

  return (
    <div className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80")',
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Animated radial glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/20 blur-[120px]" />
      </div>

      {/* Floating food emojis */}
      {floatingEmojis.map((item, index) => (
        <motion.span
          key={index}
          className={`absolute ${item.className} opacity-60 pointer-events-none select-none hidden sm:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.8 + item.delay, duration: 0.6, ease: "backOut" }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm text-orange-300 font-medium"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Delivering happiness across Kerala
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight"
        >
          Crave it.{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent animate-shimmer">
            Order it.
          </span>
          <br />
          Love it.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-5 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
        >
          Discover amazing restaurants near you and get your favorite meals
          delivered fresh & fast — right to your doorstep.
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="w-full max-w-xl mt-8">
          <SearchBar
            placeHolder="Search your city or district..."
            onSubmit={handleSearchSubmit}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center gap-4 justify-center"
        >
          <button
            onClick={() => handleSearchSubmit({ searchQuery: "kannur" })}
            className="group relative bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/30 hover:shadow-2xl hover:scale-105 animate-pulse-glow"
          >
            <span className="relative z-10">Explore Now 🚀</span>
          </button>
          <button
            onClick={() => navigate("/search/India")}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
          >
            Browse All 🍽️
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/80"
        >
          {[
            { value: "500+", label: "Restaurants" },
            { value: "10K+", label: "Happy Customers" },
            { value: "30 min", label: "Avg. Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="animate-scroll-bounce" />
      </motion.div>
    </div>
  );
};

export default HomeImg;
