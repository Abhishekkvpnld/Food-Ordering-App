
import RestaurantFormSection from "@/form/manage-restaurant-form/RestaurantFormSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  MapPin,
  Save,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z
  .object({
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
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, { message: "Image is required...!" })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({
  onSave,
  isLoading,
  restaurant,
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const formatetdeliveryPrice = parseInt(
      restaurant.deliveryPrice
    ).toFixed(2);

    const formatedMenuItems = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedrestaurantData = {
      ...restaurant,
      deliveryPrice: parseInt(formatetdeliveryPrice),
      menuItems: formatedMenuItems,
      estimatedDeliveryTime: parseInt(
        restaurant.estimatedDeliveryTime
      ),
      cuisines:
        restaurant.cuisines.length > 0
          ? [restaurant.cuisines[0], ...restaurant.cuisines.slice(1)]
          : [],
    };

    form.reset(updatedrestaurantData);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append(
      "restaurantName",
      formDataJson.restaurantName
    );

    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );

    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((item, index) => {
      formData.append(
        `menuItems[${index}][name]`,
        item.name
      );

      formData.append(
        `menuItems[${index}][price]`,
        (item.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(
        "imageFile",
        formDataJson.imageFile
      );
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-0"
      >
        {/* Main form container */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          {/* Form hero */}
          <div className="relative overflow-hidden px-5 sm:px-8 py-7 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
            <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 w-48 h-48 rounded-full bg-orange-400/10 blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <Store className="w-4 h-4 text-orange-400" />
                  </div>

                  <span className="text-xs uppercase tracking-[0.18em] font-bold text-orange-400">
                    Restaurant Setup
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {restaurant
                    ? "Update your restaurant"
                    : "Create your restaurant"}
                </h2>

                <p className="text-sm text-gray-400 mt-2 max-w-xl">
                  Add accurate restaurant information, cuisines, menu
                  items, pricing, and a beautiful cover image.
                </p>
              </div>

              <div className="shrink-0">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-semibold text-gray-200">
                    {restaurant
                      ? "Editing Restaurant"
                      : "New Restaurant"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form content */}
          <div className="p-5 sm:p-8 lg:p-10">
            {/* Basic information */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SectionHeader
                icon={<Store className="w-4 h-4" />}
                title="Restaurant Information"
                description="Tell customers about your restaurant and delivery service."
              />

              <div className="mt-6">
                <RestaurantFormSection />
              </div>
            </motion.section>

            <Separator className="my-9" />

            {/* Cuisines */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <SectionHeader
                icon={<UtensilsCrossed className="w-4 h-4" />}
                title="Cuisines"
                description="Choose the food categories that best represent your restaurant."
              />

              <div className="mt-6">
                <CuisinesSection />
              </div>
            </motion.section>

            <Separator className="my-9" />

            {/* Menu */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SectionHeader
                icon={<Sparkles className="w-4 h-4" />}
                title="Menu Items"
                description="Add the dishes customers can order from your restaurant."
              />

              <div className="mt-6">
                <MenuSection />
              </div>
            </motion.section>

            <Separator className="my-9" />

            {/* Image */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <SectionHeader
                icon={<Camera className="w-4 h-4" />}
                title="Restaurant Image"
                description="Upload a high-quality image that represents your restaurant."
              />

              <div className="mt-6">
                <ImageSection />
              </div>

              {/* Upload helper */}
              <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center">
                    <ImagePlus className="w-5 h-5 text-orange-500" />
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="text-sm font-bold text-gray-800">
                      Make your restaurant stand out
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Choose a clear, attractive image for your restaurant
                      display.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Submit footer */}
          <div className="border-t border-gray-100 bg-gray-50/70 px-5 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Ready to save?
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Make sure your restaurant details are correct.
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className="sm:min-w-[180px]">
                  <LoadingButton />
                </div>
              ) : (
                <Button
                  type="submit"
                  className="
                    w-full
                    sm:w-auto
                    min-w-[180px]
                    h-12
                    px-8
                    rounded-xl
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    font-bold
                    shadow-lg
                    shadow-orange-100
                    hover:shadow-orange-200
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                  "
                >
                  <Save className="w-4 h-4 mr-2" />
                  {restaurant
                    ? "Update Restaurant"
                    : "Create Restaurant"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const SectionHeader = ({
  icon,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ManageRestaurantForm;
