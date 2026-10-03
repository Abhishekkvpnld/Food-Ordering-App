import { useSearchRestaurant } from "@/api/AllRestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSection from "@/components/PaginationSection";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropDown from "@/components/SortOptionDropDown";
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";

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

  const [isExpanded, setIsExpanded] = useState(false);

  const { results, isLoading } = useSearchRestaurant(
    city,
    searchState
  );

  const setSortOption = useCallback((sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOptions: sortOption,
      page: 1,
    }));
  }, []);

  const setSelectedCuisines = useCallback(
    (selectedCuisines: string[]) => {
      setSearchState((prev) => ({
        ...prev,
        selectedCuisines,
        page: 1,
      }));
    },
    []
  );

  const handleSetPage = useCallback((page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const setSearchSubmit = useCallback(
    (searchFormData: SearchForm) => {
      setSearchState((prev) => ({
        ...prev,
        searchQuery: searchFormData.searchQuery,
        page: 1,
      }));
    },
    []
  );

  const resetSearch = useCallback(() => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  }, []);

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-2xl border-4 border-orange-100" />

            <div className="absolute inset-0 rounded-2xl border-4 border-orange-500 border-t-transparent animate-spin" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Utensils className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Finding delicious restaurants
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Discovering the best options for you...
          </p>
        </motion.div>
      </div>
    );
  }

  // No results
  if (!results?.restaurants || !city) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg text-center bg-white border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-10"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 flex items-center justify-center">
            <SearchX className="w-9 h-9 text-orange-400" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 mt-6">
            No restaurants found
          </h2>

          <p className="text-sm text-gray-500 mt-2 leading-6">
            We couldn't find any restaurants
            {city && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-orange-500">
                  {city}
                </span>
              </>
            )}
            . Try another location or search term.
          </p>

          <button
            onClick={() => window.history.back()}
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              px-6
              h-11
              rounded-xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              text-sm
              font-bold
              shadow-md
              shadow-orange-100
              transition-all
              hover:-translate-y-0.5
            "
          >
            Go Back
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />

      <div className="absolute top-[45%] -left-48 w-96 h-96 rounded-full bg-orange-50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <Utensils className="w-4 h-4 text-orange-500" />
            </div>

            <span className="text-xs uppercase tracking-[0.18em] font-bold text-orange-500">
              Discover Restaurants
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
                Find your next favorite meal
              </h1>

              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>
                  Exploring restaurants in{" "}
                  <span className="font-semibold text-gray-800">
                    {city}
                  </span>
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Fresh choices, just for you
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-7"
        >
          <SearchBar
            placeHolder="Search by restaurant name or cuisine..."
            onSubmit={setSearchSubmit}
            onReset={resetSearch}
            searchQuery={searchState.searchQuery}
          />
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:sticky lg:top-24 self-start"
          >
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Filters
                    </h2>

                    <p className="text-[11px] text-gray-400">
                      Refine your search
                    </p>
                  </div>
                </div>
              </div>

              <CuisinesFilter
                selectedCuisines={searchState.selectedCuisines}
                onChange={setSelectedCuisines}
                isExpanded={isExpanded}
                onExpandedClick={() =>
                  setIsExpanded((prev) => !prev)
                }
              />
            </div>
          </motion.aside>

          {/* Results */}
          <main className="min-w-0">
            {/* Result header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="
                bg-white
                border
                border-gray-100
                rounded-2xl
                shadow-sm
                p-4
                mb-5
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <SearchResults
                  city={city}
                  total={results?.pagination?.total}
                />

                <SortOptionDropDown
                  sortOptions={searchState.sortOptions}
                  onChange={setSortOption}
                />
              </div>
            </motion.div>

            {/* Search result cards */}
            <section className="space-y-4">
              {results.restaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(index * 0.05, 0.3),
                  }}
                >
                  <SearchResultsCard
                    restaurant={restaurant}
                  />
                </motion.div>
              ))}
            </section>

            {/* Pagination */}
            <div className="mt-8">
              <PaginationSection
                page={results?.pagination?.page}
                pages={results?.pagination?.pages}
                onPageChange={handleSetPage}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;





