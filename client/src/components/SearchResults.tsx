import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

type Props = {
  total: number;
  city: string;
};

const SearchResults = ({ total, city }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-orange-500" />
        </div>

        <div>
          <p className="text-sm font-bold text-gray-900">
            {total} {total === 1 ? "restaurant" : "restaurants"} found
          </p>

          <p className="text-xs text-gray-400 mt-0.5">
            Available in {city}
          </p>
        </div>
      </div>

      <Link
        to="/"
        className="
          inline-flex
          items-center
          gap-1
          mt-2
          ml-10
          text-xs
          font-semibold
          text-orange-500
          hover:text-orange-600
          transition
        "
      >
        Change location
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
};

export default SearchResults;




