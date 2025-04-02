import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center  w-[100vw] justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl transform transition duration-300 hover:scale-105">
        <h1 className="text-3xl font-extrabold text-green-700">
          Payment Successful 🎉
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your order! Your transaction has been processed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;

