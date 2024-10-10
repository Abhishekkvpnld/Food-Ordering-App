import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisinesList } from "@/config/restaurant-options";
import { useFormContext } from "react-hook-form";
import CuisinesCheckBox from "./CuisinesCheckBox";

const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="pt-5">
      <div>
        <h2 className="font-bold text-2xl">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
              {cuisinesList.map((cuisineItem,index) => (
                <CuisinesCheckBox key={index} cuisine={cuisineItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
