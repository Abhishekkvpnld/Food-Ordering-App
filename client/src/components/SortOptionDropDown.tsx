import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

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

const SortOptionDropDown = ({ onChange, sortOptions }: Props) => {
  const selectedSortOption =
    SORT_OPTIONS.find((option) => option.value === sortOptions)?.label ||
    SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer  bg-slate-100 rounded-md">
        <Button variant={"outline"} className="w-full bg-transparent">
          Sort by: {selectedSortOption}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" flex flex-col gap-2 rounded-md mt-1 bg-blue-100 border border-slate-200">
        {SORT_OPTIONS.map((opt, index) => (
          <DropdownMenuItem
            className="cursor-pointer z-10 w-full px-3 mt-1"
            onClick={() => onChange(opt.value)}
            key={index}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropDown;
