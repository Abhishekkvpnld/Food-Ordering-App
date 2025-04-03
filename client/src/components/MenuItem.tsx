import { MenuItem as MenuItemType, Restaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Props = {
  restaurant: Restaurant;
  addToCart: (menuItem: MenuItemType) => void;
};

const MenuItem = ({ restaurant, addToCart }: Props) => {
  return (
    <div className="mt-2">
      <span className="text-xl font-bold">Menu</span>
      {restaurant.menuItems.map((item, index) => (
        <Card
          key={index}
          onClick={() => addToCart(item)}
          className="cursor-pointer mt-2 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-300 hover:border-blue-400 p-5 transform hover:-translate-y-1 hover:scale-105 transition-all"
        >
          <CardHeader className="flex flex-col items-center text-center my-2">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {item.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold text-blue-700">
              &#x20B9; {item.price.toFixed(2)}
            </span>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-md">
              Add to Cart 🛒
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuItem;
