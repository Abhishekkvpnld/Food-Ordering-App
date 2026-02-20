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

      {/* ━━━ Download / CTA Section ━━━ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-orange-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-amber-400 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-300 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/10">
              📱 Mobile App
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Order takeaway{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                even faster
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Download our mobile app for lightning-quick ordering, exclusive
              deals, and real-time order tracking — all at your fingertips.
            </p>
            <img
              src="/downloadImg.png"
              alt="Download on App Store and Google Play"
              className="h-12 sm:h-14 object-contain"
            />
          </motion.div>

          {/* Right — image */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src="/food-delivery.jpg"
              alt="Food Delivery"
              className="rounded-2xl shadow-2xl shadow-black/40 max-h-[380px] object-cover border border-white/10"
            />
          </motion.div>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <Footer />
    </div>
  );
};

export default HomePage;
