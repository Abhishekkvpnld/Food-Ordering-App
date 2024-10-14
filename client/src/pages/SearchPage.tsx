import { useSearchRestaurant } from "@/api/AllRestaurantApi";
import SearchResults from "@/components/SearchResults";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurant(city);

  if (isLoading) {
    <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found...</span>;
  }

  return (
    <div className="grid w-[100vw] px-16 grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
      <div id="cuisines-list">add cuisines</div>
      <div id="main-content" className="flex flex-col gap-4">
        <SearchResults city={city} total={results?.pagination?.total} />
        {results.data.map((restaurant, index) => (
          <SearchResultsCard restaurant={restaurant} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
