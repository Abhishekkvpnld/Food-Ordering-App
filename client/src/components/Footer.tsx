const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 w-full flex items-center justify-center">
        <div className="container mx-auto text-center">
          <p className="text-sm mb-2">
            &copy; {new Date().getFullYear()} Food Delivery App. All rights reserved.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/about" className="text-gray-300 hover:text-white">About Us</a>
            <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
            <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  