import { cuisinesList } from "@/config/restaurant-options";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";

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
        <p
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-700 "
        >
          Reset Filter
        </p>
      </div>

      <div className="flex flex-col mt-2">
        {cuisinesList.map((cuisine, index) => {
          const isSelected = selectedCuisines.includes(cuisine);
          return (
            <div className="flex" key={index}>
              <input
                type="checkbox"
                id={`cuisine_${cuisine}`}
                className="hidden"
                value={cuisine}
                checked={isSelected}
                onChange={handleCuisinesReset}
              />
              <label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex items-center flex-1 py-1 px-2 cursor-pointer text-sm rounded-full font-semibold ${
                  isSelected
                    ? "border border-green-600"
                    : "border border-slate-400"
                }`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CuisinesFilter;
