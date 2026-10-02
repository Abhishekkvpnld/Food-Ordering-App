import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";

type Props = {
  onChange: (value: string) => void;
  sortOptions: string;
};

const SORT_OPTIONS = [
  {
    label: "Best Match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropDown = ({
  onChange,
  sortOptions,
}: Props) => {
  const selectedSortOption =
    SORT_OPTIONS.find(
      (option) => option.value === sortOptions
    )?.label || SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="
            h-10
            rounded-xl
            border-gray-200
            bg-white
            hover:bg-orange-50
            hover:border-orange-200
            font-semibold
            text-gray-700
          "
        >
          <SlidersHorizontal className="w-4 h-4 mr-2 text-orange-500" />

          <span className="hidden sm:inline">
            Sort by:
          </span>

          <span className="ml-1">
            {selectedSortOption}
          </span>

          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-1.5 rounded-xl bg-white border border-gray-100 shadow-xl"
      >
        {SORT_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="
              flex
              items-center
              justify-between
              px-3
              py-2.5
              rounded-lg
              cursor-pointer
              text-sm
              font-medium
              text-gray-700
              outline-none
              focus:bg-orange-50
              focus:text-orange-600
            "
          >
            {opt.label}

            {sortOptions === opt.value && (
              <Check className="w-4 h-4 text-orange-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropDown;