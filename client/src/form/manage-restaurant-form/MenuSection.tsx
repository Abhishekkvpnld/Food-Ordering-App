import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { remove, append, fields } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="pt-5">
      <div>
        <h2 className="font-bold text-2xl">Restaurant Details</h2>
        <FormDescription>Provide your restaurant's information</FormDescription>
      </div>

      <FormField
        name="menuItems"
        control={control}
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
                key={index}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />

      <Button
        type="button"
        className="bg-green-700 text-white hover:bg-green-800 mt-2"
        onClick={() => append({ name: "", price: "" })}
      >
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
