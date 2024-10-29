import { Routes, Route, Navigate } from "react-router-dom";
import Layouts from "../src/layouts/Layouts";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ManageRestaurant from "./pages/ManageRestaurant";
import SearchPage from "./pages/SearchPage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";

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

      <Route
        path="/search/:city"
        element={
          <Layouts>
            <SearchPage />
          </Layouts>
        }
      />

      <Route
        path="/restaurantDetails/:restaurantId"
        element={
          <Layouts>
            <RestaurantDetailsPage />
          </Layouts>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layouts>
              <ManageRestaurant />
            </Layouts>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
