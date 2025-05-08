// components/ui/CheckboxField.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

type CheckboxFieldProps = {
  name: string;
  label: string;
  form: any;
  checked:any


};

export const CheckboxField = ({ name, label, form }: CheckboxFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{label}</FormLabel>
        </div>
      </FormItem>
    )}
  />
);
