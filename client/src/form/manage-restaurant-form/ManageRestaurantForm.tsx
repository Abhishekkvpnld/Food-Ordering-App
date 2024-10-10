import RestaurantFormSection from "@/form/manage-restaurant-form/RestaurantFormSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required...!",
  }),
  city: z.string({
    required_error: "City is required...!",
  }),
  country: z.string({
    required_error: "Country name is required...!",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price required...!",
    invalid_type_error: "Must be a valid number...!",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time required...!",
    invalid_type_error: "Must be a valid number...!",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select atleast one item...!",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required...!"),
      price: z.coerce.number().min(1, "Price is required...!"),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required...!" }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: RestaurantFormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-200 rounded-lg px-5 py-3 md:p-10 w-[80%]"
      >
        <RestaurantFormSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        <div className="flex flex-col items-center gap-5 justify-center p-3">
          <div className="border-gray-400 border-2 border-dashed justify-centerborder-dashed p-4 flex items-center justify-center">
            <img
              src="/upload.svg"
              alt="Upload image"
              className=" mix-blend-multiply transition-transform duration-300 ease-in-out hover:scale-105 w-[70%]"
            />
          </div>
          <p className="underline">
            Choose an image to upload for your restaurant's display.
          </p>
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="px-16">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
