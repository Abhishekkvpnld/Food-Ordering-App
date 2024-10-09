import { Routes, Route, Navigate } from "react-router-dom";
import Layouts from "../src/layouts/Layouts";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ManageRestaurantForm from "./form/manage-restaurant-form/ManageRestaurantForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/"
        element={
          <Layouts>
            <HomePage />
          </Layouts>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layouts>
              <UserProfilePage />
            </Layouts>
          }
        />
      </Route>
      <Route path="/restaurant" element={<ManageRestaurantForm onSave={()=>""} isLoading={false}/>} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
