import { cuisinesList } from "@/config/restaurant-options";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
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

  const handleCusinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCheckedCuisinesArray = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCheckedCuisinesArray);
  };

  return (
    <>
      <div className="flex items-center justify-between mt-3 pr-5 px-2">
        <h5 className="font-semibold mb-2 text-md">Filter By Cuisines</h5>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-700 "
        >
          Reset Filter
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-3">
        {cuisinesList
          .slice(0, isExpanded ? cuisinesList.length : 8)
          .map((cuisine, index) => {
            const isSelected = selectedCuisines.includes(cuisine);

            return (
              <div className="flex" key={index}>
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
                  className={`flex items-center justify-between flex-1 py-3 px-14 cursor-pointer text-sm rounded-2xl font-semibold ${
                    isSelected
                      ? "border border-green-600"
                      : "border border-slate-400"
                  }`}
                >
                  {isSelected && (
                    <Check size={20} strokeWidth={3} color="green" />
                  )}
                  {cuisine}
                </label>
              </div>
            );
          })}

        <Button
          className="flex-1 mt-4"
          variant={"link"}
          onClick={onExpandedClick}
        >
          {!isExpanded ? (
            <span className="flex gap-2 text-purple-800 flex-row items-center">
              View More <ChevronDown />
            </span>
          ) : (
            <span className="flex text-purple-800 flex-row items-center gap-2">
              View Less <ChevronUp />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisinesFilter;
