import { MenuItem as MenuItemType, Restaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  restaurant: Restaurant;
  addToCart:(menuItem:MenuItemType)=>void
};

const   MenuItem = ({ restaurant,addToCart }: Props) => {
  return (
    <div className="mt-2">
      <span className="text-xl font-bold">Menu</span>
      {restaurant.menuItems.map((item, index) => (
        <Card onClick={()=>addToCart(item)} key={index} className="cursor-pointer hover:shadow-md mt-4 bg-green-100 hover:border-slate-500">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="font-bold text-green-600">&#x20B9; {(item.price).toFixed(2)}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuItem;
