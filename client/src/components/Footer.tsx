import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Utensils,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Live Chat", href: "/chat" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top divider gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Utensils size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Food Delivery App
                </h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                Bringing deliciousness right to your doorstep. Fresh food, fast
                delivery, and a smile — every single time.
              </p>

              {/* Contact info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="text-orange-400" />
                  <span>Kerala, India</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={14} className="text-orange-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={14} className="text-orange-400" />
                  <span>hello@fooddelivery.app</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links], colIndex) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (colIndex + 1) }}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-400 transition-colors duration-200"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Food Delivery App. All rights
            reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-400 transition-all duration-200"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;