import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { IoMdMenu } from "react-icons/io";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <IoMdMenu className="text-orange-600 text-3xl"/>
      </SheetTrigger>

      <SheetContent>
        <SheetTitle>
          <span>Welcome to DeliGo</span>
        </SheetTitle>

        <Separator />

        <SheetDescription className="flex items-center justify-center flex-col mt-4">
           <Button className="flex-1 w-[80%] bg-blue-700 text-white font-semibold hover:bg-blue-800">Login</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
