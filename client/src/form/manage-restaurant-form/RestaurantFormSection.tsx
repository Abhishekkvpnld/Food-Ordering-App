import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const RestaurantFormSection = () => {
  const { control } = useFormContext();

  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Restaurant Details</h2>
        <FormDescription>Provide your restaurant's information</FormDescription>
      </div>

      <FormField
        control={control}
        name={"restaurantName"}
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Restaurant Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="Enter restaurant name..."
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />

      <div className="flex gap-3 w-full">
        <FormField
          control={control}
          name={"city"}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="Enter city..."
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"country"}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white flex-1"
                  placeholder="Enter country..."
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RestaurantFormSection;
