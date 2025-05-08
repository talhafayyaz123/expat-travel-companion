import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  form: any; // Form methods passed from the parent
  options: string[]; // Array of options
};

export const SelectField = ({
  name,
  label,
  placeholder,
  form,
  options,
}: SelectFieldProps) => {
  // Define a special value for the placeholder option
  const placeholderValue = "placeholder";

  // Add the placeholder to the options list
  const fullOptions = [
    { value: placeholderValue, label: placeholder },
    ...options.map((option) => ({ value: option, label: option })),
  ];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#263238] font-semibold text-[20px]">
            {label}
          </FormLabel>
          <Select
            value={field.value || placeholderValue}
            onValueChange={(value) => {
              // Treat "placeholder" value as an empty value
              field.onChange(value === placeholderValue ? "" : value);
            }}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {fullOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
