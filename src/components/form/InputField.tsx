import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Required } from "../icon/Required";

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  form: any; // Form methods passed from the parent
  type?: string;
  required?: boolean; // New prop to toggle the Required icon
  mt?: any;
};

export const InputField = ({
  name,
  label,
  placeholder,
  form,
  type = "text",
  required = false, // Default is false
  mt = null,
  ...rest
}: InputFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className={`flex items-center gap-1 ${mt ? mt : ""}`}>
          {label}
          {required && <Required />}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            type={type}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2  placeholder:text-black placeholder:text-[14px]"
            {...rest}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
