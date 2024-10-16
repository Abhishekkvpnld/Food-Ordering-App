import { useSearchRestaurant } from "@/api/AllRestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });


  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurant(city,searchState);

  const setSearchSubmit = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch =  () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    <span>Loading...</span>;
  }

  if (!results?.restaurants || !city) {
    return <span>No results found...</span>;
  }

  return (
    <div className="grid w-[100vw] px-16 grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
      <div id="cuisines-list">add cuisines</div>
      <div id="main-content" className="flex flex-col gap-4">
        <SearchBar
          placeHolder="Search by Cuisines or Restaurant name..."
          onSubmit={setSearchSubmit}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <SearchResults city={city} total={results?.pagination?.total} />
        {results?.restaurants.map((restaurant, index) => (
          <SearchResultsCard restaurant={restaurant} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
