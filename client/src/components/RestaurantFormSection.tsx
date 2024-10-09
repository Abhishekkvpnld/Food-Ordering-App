import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";

const RestaurantFormSection = () => {
  const { control } = useFormContext();

  return (
    <div>
      <div>
        <h2>Restaurant Details</h2>
        <FormDescription>Provide your restaurant's information</FormDescription>
      </div>

      <FormField
        control={control}
        name={"restaurantName"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Restaurant Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="Enter restaurant name..."
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex gap-3">
        <FormField
          control={control}
          name={"city"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="Enter city..."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={"country"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="Enter country name..."
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RestaurantFormSection;
