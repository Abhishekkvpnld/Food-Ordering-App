import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};



const SearchBar = ({ onSubmit, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-[100%] px-3 gap-4 bg-white flex items-center justify-between border-2 rounded-full p-2 mt-2 shadow-md transition-all ${
          form.formState.errors.searchQuery ? "border-red-600" : "border-gray-200"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={25}
          className="text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-lg focus-visible:ring-0 placeholder-gray-400"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleReset}
            type="button"
            variant={"outline"}
            className="rounded-full text-sm h-9 flex items-center justify-center border-orange-500 text-orange-500 hover:bg-orange-100"
          >
            Reset
          </Button>

          <Button
            type="submit"
            className="rounded-full bg-orange-500 h-9 hover:bg-orange-600 text-white px-4"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
