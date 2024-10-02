import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layouts from "../src/layouts/Layouts";
import HomePage from "./pages/HomePage";



const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Layouts><HomePage/></Layouts>} />
        <Route path="/login" element={<span>login</span>} />
        <Route path="/signup" element={<span>signup</span>} />
        <Route path="/user-profile" element={<span>user profile</span>} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
  );
};

export default AppRoutes;
