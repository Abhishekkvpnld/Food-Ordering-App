import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {

    const {logout} = useAuth0();

  return (
    <div className="w-full flex flex-col items-center justify-center gap-1 mt-3">
      <Link to={"/user-profile"} className="">User Profile</Link>
      <Button onClick={()=>logout()}  className="w-[80%] bg-red-700 text-white hover:bg-red-800">Logout</Button>
    </div>
  );
};

export default MobileNavLinks;
