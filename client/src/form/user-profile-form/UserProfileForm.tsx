import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";
import {
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  Save,
  UserRound,
} from "lucide-react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (UserProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  buttonText = "Save Changes",
  title = "User Profile",
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-7"
      >
        {/* Form heading */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
            <UserRound className="w-5 h-5 text-orange-500" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {title}
            </h1>

            <FormDescription className="mt-1 text-sm text-gray-500">
              Update your personal information and delivery details.
            </FormDescription>
          </div>
        </div>

        {/* Account information */}
        <div className="space-y-5">
          <SectionTitle
            title="Account Information"
            description="Your account contact information."
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Email Address
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    <Input
                      {...field}
                      disabled
                      className="
                        h-12
                        pl-10
                        rounded-xl
                        border-gray-200
                        bg-gray-50
                        text-gray-500
                        cursor-not-allowed
                      "
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 rounded-lg px-2 py-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                  </div>
                </FormControl>

                <p className="text-xs text-gray-400">
                  Email address cannot be changed here.
                </p>
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Full Name
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      className="
                        h-12
                        pl-10
                        rounded-xl
                        border-gray-200
                        bg-white
                        focus:border-orange-400
                        focus:ring-orange-100
                        transition-all
                      "
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Delivery information */}
        <div className="pt-2 space-y-5">
          <SectionTitle
            title="Delivery Information"
            description="Used to make your food deliveries easier."
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">
                  Address
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />

                    <Input
                      {...field}
                      placeholder="Enter your complete address"
                      className="
                        h-12
                        pl-10
                        rounded-xl
                        border-gray-200
                        bg-white
                        focus:border-orange-400
                        focus:ring-orange-100
                        transition-all
                      "
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* City + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    City
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                      <Input
                        {...field}
                        placeholder="Enter city"
                        className="
                          h-12
                          pl-10
                          rounded-xl
                          border-gray-200
                          bg-white
                          focus:border-orange-400
                          focus:ring-orange-100
                          transition-all
                        "
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Country
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                      <Input
                        {...field}
                        placeholder="Enter country"
                        className="
                          h-12
                          pl-10
                          rounded-xl
                          border-gray-200
                          bg-white
                          focus:border-orange-400
                          focus:ring-orange-100
                          transition-all
                        "
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Information notice */}
        <div className="flex items-start gap-3 rounded-2xl bg-orange-50/70 border border-orange-100 p-4">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-orange-500" />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Keep your delivery address accurate
            </p>

            <p className="text-xs text-gray-500 mt-1 leading-5">
              Your address information helps ensure your orders are
              delivered to the correct location.
            </p>
          </div>
        </div>

        {/* Submit section */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-700">
                  Information looks good?
                </p>

                <p className="text-[11px] text-gray-400">
                  Save your latest changes.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="sm:min-w-[160px]">
                <LoadingButton />
              </div>
            ) : (
              <Button
                type="submit"
                className="
                  w-full
                  sm:w-auto
                  min-w-[160px]
                  h-11
                  rounded-xl
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-bold
                  shadow-md
                  shadow-orange-100
                  hover:shadow-lg
                  hover:shadow-orange-200
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                "
              >
                <Save className="w-4 h-4 mr-2" />
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

type SectionTitleProps = {
  title: string;
  description: string;
};

const SectionTitle = ({
  title,
  description,
}: SectionTitleProps) => {
  return (
    <div className="pb-2 border-b border-gray-100">
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">
        {title}
      </h2>

      <p className="text-xs text-gray-400 mt-1">
        {description}
      </p>
    </div>
  );
};

export default UserProfileForm;
