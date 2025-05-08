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
import { Required } from "../icon/Required";

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  form: any; // Form methods passed from the parent
  options: { label: string; value: string }[]; // Options should have 'label' and 'value' properties
  required?: boolean; // New prop to toggle the Required icon
};

export const StateSelect = ({
  name,
  label,
  placeholder,
  form,
  options,
  required,
}: SelectFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-[#263238] font-semibold text-[20px] flex items-center gap-1">
          {label}
          <div className="relative group">
          {required && <Required />}
      {/* Tooltip */}
      <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
     For U.S./Canada
      </span>
      </div>
                   {/* Conditionally render the Required icon */}
         
        </FormLabel>
        <Select value={field.value} onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value=" ">
              Select
            </SelectItem>
            {options.map((option) => (
              <SelectItem
                key={option.value} // Use the 'value' as the unique key
                value={option.value} // Replace spaces with underscores in value
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
