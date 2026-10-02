import { cuisinesList } from "@/config/restaurant-options";
import {
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisinesFilter = ({
  onChange,
  onExpandedClick,
  isExpanded,
  selectedCuisines,
}: Props) => {
  const handleCuisinesReset = () => onChange([]);

  const handleCusinesChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCheckedCuisinesArray = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter(
          (cuisine) => cuisine !== clickedCuisine
        );

    onChange(newCheckedCuisinesArray);
  };

  return (
    <div>
      {/* Filter heading */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Cuisine
          </h3>

          <p className="text-xs text-gray-400 mt-0.5">
            Choose your favorites
          </p>
        </div>

        {selectedCuisines.length > 0 && (
          <button
            type="button"
            onClick={handleCuisinesReset}
            className="flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Selected count */}
      {selectedCuisines.length > 0 && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
          <p className="text-xs font-semibold text-orange-700">
            {selectedCuisines.length} cuisine
            {selectedCuisines.length > 1 ? "s" : ""} selected
          </p>
        </div>
      )}

      {/* Cuisine list */}
      <div className="space-y-2">
        {cuisinesList
          .slice(
            0,
            isExpanded ? cuisinesList.length : 8
          )
          .map((cuisine, index) => {
            const isSelected =
              selectedCuisines.includes(cuisine);

            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`cuisine_${cuisine}`}
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCusinesChange}
                />

                <label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`
                    group
                    flex
                    items-center
                    justify-between
                    w-full
                    px-3
                    py-2.5
                    rounded-xl
                    cursor-pointer
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isSelected
                        ? "bg-orange-50 border border-orange-200 text-orange-700"
                        : "bg-gray-50 border border-transparent text-gray-600 hover:bg-gray-100 hover:border-gray-200"
                    }
                  `}
                >
                  <span>{cuisine}</span>

                  <span
                    className={`
                      w-5
                      h-5
                      rounded-md
                      flex
                      items-center
                      justify-center
                      border
                      transition-all
                      ${
                        isSelected
                          ? "bg-orange-500 border-orange-500"
                          : "bg-white border-gray-200 group-hover:border-gray-300"
                      }
                    `}
                  >
                    {isSelected && (
                      <Check
                        className="w-3 h-3 text-white"
                        strokeWidth={3}
                      />
                    )}
                  </span>
                </label>
              </div>
            );
          })}
      </div>

      {/* View more */}
      {cuisinesList.length > 8 && (
        <Button
          variant="ghost"
          type="button"
          onClick={onExpandedClick}
          className="w-full mt-3 rounded-xl text-orange-500 hover:text-orange-600 hover:bg-orange-50"
        >
          {isExpanded ? (
            <span className="flex items-center gap-2">
              View Less
              <ChevronUp className="w-4 h-4" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              View More
              <ChevronDown className="w-4 h-4" />
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default CuisinesFilter;