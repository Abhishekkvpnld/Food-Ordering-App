import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string(),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({
  onSubmit,
  placeHolder,
  onReset,
  searchQuery,
}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery || "",
    },
  });

  useEffect(() => {
    form.reset({
      searchQuery: searchQuery || "",
    });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    onReset?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="
          w-full
          bg-white
          border
          border-gray-100
          rounded-2xl
          p-2
          shadow-sm
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-2
          focus-within:border-orange-200
          focus-within:shadow-md
          transition-all
        "
      >
        <div className="flex items-center flex-1 min-w-0 px-2">
          <Search className="w-5 h-5 text-orange-500 shrink-0 mr-2" />

          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    className="
                      border-none
                      shadow-none
                      h-11
                      px-1
                      text-sm
                      sm:text-base
                      focus-visible:ring-0
                      focus-visible:ring-offset-0
                      placeholder:text-gray-400
                    "
                    placeholder={placeHolder}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={handleReset}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="
              flex-1
              sm:flex-none
              h-10
              rounded-xl
              border-gray-200
              text-gray-600
              hover:text-orange-500
              hover:border-orange-200
              hover:bg-orange-50
            "
          >
            Reset
          </Button>

          <Button
            type="submit"
            className="
              flex-1
              sm:flex-none
              h-10
              px-6
              rounded-xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-semibold
              shadow-sm
            "
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;