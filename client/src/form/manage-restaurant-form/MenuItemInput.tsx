import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ removeMenuItem, index }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row gap-2 items-end mt-3">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Burgger Pizza..."
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Price (&#8377;) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter price..."
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button type="button" onClick={removeMenuItem} className="bg-red-700 text-white hover:bg-red-800">
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
