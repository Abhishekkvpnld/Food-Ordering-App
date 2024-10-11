import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

function ImageSection() {
  const { control,watch } = useFormContext();

  const existingImage = watch("imageUrl")

  return (
    <div className="pt-5">
      <div>
        <h2 className="font-bold text-2xl">Image</h2>
        <FormDescription>
          Upload an image that will appear in your restaurant listing when users
          search.Adding new image will overwrite the existing one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-4 w-[70%] mt-3">
        {
          existingImage && (
            <AspectRatio ratio={16/9}>
              <img src={existingImage} alt="img" className="w-[250px] h-[100px] md:w-[330px] md:h-[200px] rounded-lg object-cover" />
            </AspectRatio>
          )
        }
        <FormField
          name="imageFile"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-blue-200"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ImageSection;
