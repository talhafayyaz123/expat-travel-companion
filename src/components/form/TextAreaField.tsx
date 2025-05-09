import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  form: any;
}

export function TextareaField({
  name,
  label,
  placeholder,
  form,
}: TextareaFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#263238] font-semibold text-[20px]">
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="min-h-[100px] resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
