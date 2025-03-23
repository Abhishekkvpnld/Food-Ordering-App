import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left px-4">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-orange-500">Food Delivery App</h1>
          <p className="text-gray-400 text-sm mt-2">Deliciousness delivered to your doorstep!</p>
        </div>
        
        {/* Navigation Links */}
        <div className="mb-6 md:mb-0">
          <nav className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="/about" className="text-gray-400 hover:text-orange-500 transition">About Us</a>
            <a href="/contact" className="text-gray-400 hover:text-orange-500 transition">Contact</a>
            <a href="/terms" className="text-gray-400 hover:text-orange-500 transition">Terms of Service</a>
            <a href="/privacy" className="text-gray-400 hover:text-orange-500 transition">Privacy Policy</a>
          </nav>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-orange-500 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-500 transition">
            <Mail size={20} />
          </a>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Food Delivery App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
  