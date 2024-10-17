import { useSearchRestaurant } from "@/api/AllRestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSection from "@/components/PaginationSection";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropDown from "@/components/SortOptionDropDown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOptions: string;
};

const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    page: 1,
    searchQuery: "",
    selectedCuisines: [],
    sortOptions: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurant(city, searchState);

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

  const handleSetPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSearchSubmit = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
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
      <div id="cuisines-list" className="mt-1">
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-4">
        <SearchBar
          placeHolder="Search by Cuisines or Restaurant name..."
          onSubmit={setSearchSubmit}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />

        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResults city={city} total={results?.pagination?.total} />

          <SortOptionDropDown
            sortOptions={searchState.sortOptions}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results?.restaurants.map((restaurant, index) => (
          <SearchResultsCard restaurant={restaurant} key={index} />
        ))}

        <PaginationSection
          page={results?.pagination?.page}
          pages={results?.pagination?.pages}
          onPageChange={handleSetPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
