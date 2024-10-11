import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div
          className="w-20 h-20 border-8 border-gray-300 border-t-blue-600 rounded-full animate-spin"
          role="status"
        ></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={"/"} replace />;

  // return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;
