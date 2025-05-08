"use client";

import Select from "react-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type OptionType = { value: string; label: string };

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  form: any;
  options: OptionType[];
};

const SelectReact = ({
  name,
  label,
  placeholder,
  form,
  options,
}: SelectFieldProps) => {
  const placeholderOption = { value: "", label: placeholder, isDisabled: true };

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
            <Select
              options={[placeholderOption, ...options]}
              value={
                options.find((option) => option.value === field.value) ||
                placeholderOption
              }
              onChange={(selectedOption) =>
                field.onChange(selectedOption ? selectedOption.value : "")
              }
              placeholder={placeholder}
              classNamePrefix="react-select"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectReact;
