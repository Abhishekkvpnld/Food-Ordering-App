import { Restaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  restaurant: Restaurant;
};

const MenuItem = ({ restaurant }: Props) => {
  return (
    <div className="mt-2">
      <span className="text-xl font-bold">Menu</span>
      {restaurant.menuItems.map((item, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-md mt-4 bg-red-100 hover:border-slate-500">
          <CardHeader>
            <CardTitle className="text-xl text-gray-500">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="font-bold text-green-600">&#x20B9; {(item.price).toFixed(2)}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuItem;
