import RestaurantFormSection from "@/components/RestaurantFormSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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


  const onSubmit = ()=>{

  }

  return (
    <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 rounded-lg px-5 py-3 md:p-10">
<RestaurantFormSection/>
</form>
    </Form>
  );
};

export default ManageRestaurantForm;
