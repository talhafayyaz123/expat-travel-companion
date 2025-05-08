import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";

type FileUploadFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  form: any; // Form methods passed from the parent
  accept?: string; // MIME type or file format
};

export const FileUploadField = ({
  name,
  label,
  placeholder,
  form,
  accept = "image/*",
  setPreview,
}: FileUploadFieldProps & { setPreview?: (url: string | null) => void }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue(name, file); // This sets the file value in the form
  
      // Generate preview URL
      const previewURL = URL.createObjectURL(file);
     
      if (setPreview) setPreview(previewURL);
    }
  };
  

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-[#263238] font-semibold text-[16px">{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col items-center lg:items-start gap-2 lg:w-[458px]">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2 bg-[#0872BA] text-white rounded-3xl px-4 py-2 lg:px-6 lg:py-3"
                onClick={() => document.getElementById(`${name}-upload`)?.click()}
              >
                Upload
                <Upload className="h-5 w-5" />
              </Button>
              <input
                id={`${name}-upload`}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleFileChange}
              />
           
              <p className="text-sm text-gray-600 text-center lg:text-left mt-2">
                {placeholder}
              </p>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
