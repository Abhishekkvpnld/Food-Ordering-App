import { useCreateUser } from "@/api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateUser();
  const navigate = useNavigate();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }


    setTimeout(() => navigate("/"), 2000);
  }, [user, createUser, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <h2 className="text-xl font-semibold text-gray-700 mt-4">
          Setting things up...
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Redirecting you to the homepage shortly.
        </p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;

