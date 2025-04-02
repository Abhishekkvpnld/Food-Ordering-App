import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center w-[100vw] justify-center min-h-screen bg-gradient-to-r from-red-300 to-pink-400">
      <div className="bg-white p-8 rounded-xl shadow-2xl transform transition duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-red-700">Payment Canceled ❌</h1>
        <p className="mt-4 text-gray-600">
          Your payment was not completed. Please try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-red-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Cancel;
