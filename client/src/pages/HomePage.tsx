import Footer from "@/components/Footer";
import HomeImg from "@/components/HomeImg";
import KeralaDistrictsCarousel from "../components/KeralaDistrictsCarousel";
import { motion } from "framer-motion";
import {
  Utensils,
  ShoppingBag,
  Truck,
  Clock,
  Leaf,
  BadgeDollarSign,
  Headphones,
  Sparkles,
} from "lucide-react";

/* ──────── animation helpers ──────── */
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ──────── data ──────── */
const howItWorks = [
  {
    icon: Utensils,
    title: "Browse Menus",
    desc: "Explore hundreds of restaurants and cuisines near you.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
  },
  {
    icon: ShoppingBag,
    title: "Place Your Order",
    desc: "Customize your meal, add to cart and checkout in seconds.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Sit back and relax — your food arrives hot & fresh.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
  },
];

const features = [
  {
    icon: Clock,
    title: "Lightning Fast",
    desc: "Average delivery in under 30 minutes.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Leaf,
    title: "Always Fresh",
    desc: "Quality ingredients, prepared with care.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Prices",
    desc: "Great food doesn't have to break the bank.",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "We're here for you, anytime you need.",
    gradient: "from-blue-500 to-cyan-500",
  },
];

/* ──────── component ──────── */
const HomePage = () => {
  return (
    <div className="flex flex-col bg-gray-50 overflow-hidden">
      {/* ━━━ Hero ━━━ */}
      <HomeImg />

      {/* ━━━ How It Works ━━━ */}
      <section className="py-20 px-4 bg-white relative">
        {/* subtle background decoration */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-[120px] opacity-40 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-100 rounded-full blur-[120px] opacity-40 translate-x-1/2 translate-y-1/2" />

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* heading */}
          <motion.div variants={sectionVariants} className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={14} /> How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              Delicious food in{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                3 easy steps
              </span>
            </h2>
          </motion.div>

          {/* step cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                variants={cardVariants}
                className="group relative rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                {/* step number */}
                <span className="absolute -top-4 -right-3 text-7xl font-black text-gray-100 select-none group-hover:text-orange-100 transition-colors">
                  {i + 1}
                </span>

                {/* icon */}
                <div
                  className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform`}
                >
                  <step.icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ━━━ Kerala Districts Carousel ━━━ */}
      <KeralaDistrictsCarousel />

      {/* ━━━ Why Choose Us ━━━ */}
      <section className="py-20 px-4 bg-white relative">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={sectionVariants} className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-500 bg-violet-50 px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={14} /> Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              We deliver{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                more than food
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative group rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* hover gradient bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${f.gradient} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400`}
                />

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-4 shadow-md`}
                >
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* ━━━ Mobile App CTA Section ━━━ */}
      <section className="relative overflow-hidden bg-[#0b0d10]">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[160px]" />
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/[0.04]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-8 items-center">
            {/* ━━━ Left Content ━━━ */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm font-semibold mb-7"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs">
                  📱
                </span>
                Download Our App
              </motion.div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
                Your favorite food,
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  one tap away.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
                Discover delicious meals, exclusive deals, and fast delivery.
                Everything you love about food ordering, right in your pocket.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-9 mb-10">
                {[
                  {
                    icon: "⚡",
                    title: "Faster Ordering",
                    text: "Order in seconds",
                  },
                  {
                    icon: "🎁",
                    title: "Exclusive Deals",
                    text: "App-only offers",
                  },
                  {
                    icon: "📍",
                    title: "Live Tracking",
                    text: "Track every order",
                  },
                  {
                    icon: "❤️",
                    title: "Your Favorites",
                    text: "Always within reach",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + index * 0.08,
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-lg">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white text-black shadow-lg shadow-black/20 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.1.81 1.21-.25 2.37-.94 3.66-.84 1.55.12 2.72.74 3.49 1.9-3.2 1.92-2.44 6.13.49 7.31-.59 1.55-1.36 3.09-2.74 3.79zM12.03 7.25C11.88 4.94 13.75 3.04 15.9 2.9c.3 2.67-2.44 4.65-3.87 4.35z" />
                  </svg>

                  <div className="text-left leading-tight">
                    <span className="block text-[10px] uppercase tracking-wide text-gray-500">
                      Download on the
                    </span>

                    <span className="block text-base font-bold">App Store</span>
                  </div>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/20 bg-white/[0.06] text-white backdrop-blur-md transition"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                    <path
                      d="M3.5 2.8L13.9 12 3.5 21.2C3.18 20.82 3 20.28 3 19.55V4.45C3 3.72 3.18 3.18 3.5 2.8Z"
                      fill="#34A853"
                    />

                    <path
                      d="M17.5 8.8L13.9 12 3.5 2.8C4 2.35 4.75 2.25 5.5 2.65L17.5 8.8Z"
                      fill="#FBBC04"
                    />

                    <path
                      d="M17.5 15.2L5.5 21.35C4.75 21.75 4 21.65 3.5 21.2L13.9 12L17.5 15.2Z"
                      fill="#4285F4"
                    />

                    <path
                      d="M21 10.6C21.65 10.95 21.65 13.05 21 13.4L17.5 15.2L13.9 12L17.5 8.8L21 10.6Z"
                      fill="#EA4335"
                    />
                  </svg>

                  <div className="text-left leading-tight">
                    <span className="block text-[10px] uppercase tracking-wide text-gray-400">
                      Get it on
                    </span>

                    <span className="block text-base font-bold">
                      Google Play
                    </span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* ━━━ Right Visual ━━━ */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Glow behind image */}
              <div className="absolute w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] bg-orange-500/20 rounded-full blur-[100px]" />

              {/* Image Card */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-orange-500/30 to-amber-400/20 blur-xl opacity-60" />

                <img
                  src="/wide_modern_promotional_landing_page_style_banner.png"
                  alt="Food delivery mobile application"
                  className="
              relative
              w-full
              max-w-[700px]
              rounded-[24px]
              object-cover
              border border-white/10
              shadow-2xl
              shadow-black/50
            "
                />
              </motion.div>

              {/* Floating Delivery Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
            absolute
            -bottom-5
            left-2
            sm:left-4
            lg:left-0
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-2xl
            bg-[#17191d]/95
            backdrop-blur-xl
            border
            border-white/10
            shadow-xl
          "
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <span className="text-lg">🚴</span>
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">Delivery Status</p>

                  <p className="text-sm font-bold text-white">
                    On the way • 12 min
                  </p>
                </div>

                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </motion.div>

              {/* Floating Rating */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
            absolute
            -top-4
            right-2
            sm:right-5
            lg:right-0
            px-4
            py-3
            rounded-2xl
            bg-white
            shadow-2xl
            flex
            items-center
            gap-2
          "
              >
                <span className="text-xl">⭐</span>

                <div>
                  <p className="text-sm font-bold text-gray-900">4.9/5</p>

                  <p className="text-[10px] text-gray-500">Loved by foodies</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <Footer />
    </div>
  );
};

export default HomePage;
