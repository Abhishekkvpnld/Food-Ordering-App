import Header from "../components/Header";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className={`flex-1 w-full ${isHomePage ? "" : "pt-16"}`}>
        {children}
      </div>
    </div>
  );
};

export default Layouts;
