import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResults = ({ total, city }: Props) => {
  return (
    <div className="text-lg font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          to={"/"}
          className="ml-2 cursor-pointer underline text-sm font-semibold text-red-600"
        >
          Change Location
        </Link>
      </span>
      dropdown options
    </div>
  );
};

export default SearchResults;
