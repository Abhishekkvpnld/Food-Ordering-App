import { useSearchRestaurant } from "@/api/AllRestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSection from "@/components/PaginationSection";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropDown from "@/components/SortOptionDropDown";
import { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOptions: string;
};

const SearchPage = () => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState<SearchState>({
    page: 1,
    searchQuery: "",
    selectedCuisines: [],
    sortOptions: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurant(city, searchState);


  // Memoize search state to avoid unnecessary re-renders
  const memoizedSearchState = useMemo(() => searchState, [searchState]);


  // Handlers wrapped in useCallback for performance optimization
  const setSortOption = useCallback((sortOption: string) => {
    setSearchState((prev) => ({ ...prev, sortOptions: sortOption, page: 1 }));
  }, []);

  
  const setSelectedCuisines = useCallback((selectedCuisines: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));
  }, []);


  const handleSetPage = useCallback((page: number) => {
    setSearchState((prev) => ({ ...prev, page }));
  }, []);


  const setSearchSubmit = useCallback((searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  }, []);


  const resetSearch = useCallback(() => {
    setSearchState((prev) => ({ ...prev, searchQuery: "", page: 1 }));
  }, []);



// Display loading state
if (isLoading) {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid mb-4"></div>
      <h2 className="text-2xl font-semibold text-gray-700">
        Fetching delicious restaurants...
      </h2>
      <p className="text-gray-500 text-lg mt-2">
        Please wait while we load your options.
      </p>
    </div>
  );
}



// Handle no results
if (!results?.restaurants || !city) {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <img
        src="/no result.jpg"
        alt="No results"
        className="object-cover mb-4 rounded-lg"
      />
      <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
        Oops! No results found
      </h2>
      <p className="text-gray-500 text-lg md:text-xl mb-4">
        Sorry, we couldn't find any restaurants in{" "}
        <span className="font-semibold text-indigo-600">"{city}"</span>.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-md shadow-md transition-all duration-300"
      >
        Go Back
      </button>
    </div>
  );
}


  return (
    <div className="grid w-full px-6 lg:px-16 grid-cols-1 gap-4 lg:grid-cols-[250px_1fr]">
      
      {/* Cuisines Filter Section */}
      <aside id="cuisines-list" className="mt-1">
        <CuisinesFilter
          selectedCuisines={memoizedSearchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </aside>

      {/* Main Content Section */}
      <main id="main-content" className="flex flex-col gap-4">
        {/* Search Bar */}
        <SearchBar
          placeHolder="Search by Cuisines or Restaurant name..."
          onSubmit={setSearchSubmit}
          onReset={resetSearch}
          searchQuery={memoizedSearchState.searchQuery}
        />

        {/* Sort & Results Count */}
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResults city={city} total={results?.pagination?.total} />
          <SortOptionDropDown
            sortOptions={memoizedSearchState.sortOptions}
            onChange={setSortOption}
          />
        </div>

        {/* Search Results */}
        <section>
          {results?.restaurants.map((restaurant, index) => (
            <SearchResultsCard restaurant={restaurant} key={index} />
          ))}
        </section>

        {/* Pagination */}
        <PaginationSection
          page={results?.pagination?.page}
          pages={results?.pagination?.pages}
          onPageChange={handleSetPage}
        />
      </main>
    </div>
  );
};

export default SearchPage;
