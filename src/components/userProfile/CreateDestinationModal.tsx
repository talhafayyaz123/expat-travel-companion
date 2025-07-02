// CreateDestinationModal.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SelectField } from "../form/SelectField";
import { InputField } from "../form/InputField";
import { useDispatch } from "react-redux";
import { useDestinationAddMutation } from "@/redux/Api/destinationApi";

import { toast } from "sonner";
import { CountrySelect } from "../CountrySelect";
import { TravelSelect } from "../TravelSelect";
import { travelOption } from "@/constants/traveType";
import { combinedCountryData } from "@/constants/countryOptions";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SquareRadioButton } from "../SquareRadioButton";
import { CheckboxField } from "../form/CheckboxField";

const formSchema = z.object({
  travelType: z.string().min(2, "Please select a travel type"),
  month: z.string().min(2, "Month is required"),
  year: z.string().min(2, "Year is required"),
  destinationCountry: z.string().min(1, "Destination country is required"),
  destinationCity: z.string().min(1, "Destination city is required"),
  haveRoom: z.boolean().default(false),
});

export const CreateDestinationModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [addDestination, { isLoading }] = useDestinationAddMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelType: "",
      month: "",
      year: "",
      destinationCountry: "",
      destinationCity: "",
      haveRoom: false,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loadingToastId = toast.loading("Creating Destination...");

    const { month, year, ...rest } = values;

    const TravelBegins = new Date(
      `${year}-${month.padStart(2, "0")}-01T12:00:00`
    ).toISOString();

    // Prepare payload as an array
    const payload = [
      {
        ...rest,
        TravelBegins,
      },
    ];

    try {
      await addDestination(payload).unwrap();
      onClose();
      toast.success("Destination created successfully!");
      form.reset();
    } catch (error) {
      console.error("API error:", error);
      toast.error("Failed to create destination. Please try again.");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <DialogContent className="fixed inset-0 flex items-center justify-center p-6 bg-black/30 z-50 ">
      <div className="w-full lg:w-[600px]  rounded-lg bg-white shadow-lg p-4 z-[64]">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-bold text-center">
            Create Destination
          </DialogTitle>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-8"
          >
            <TravelSelect
              name="travelType"
              label="Travel Type"
              placeholder="Select"
              form={form}
              options={travelOption.map((co) => ({
                label: co.label,
                value: co.value,
              }))}
            />

            <div>
              <FormLabel>Travel Begins</FormLabel>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SelectField
                  name="month"
                  label=""
                  placeholder="Month"
                  form={form}
                  options={[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ]}
                />
                <SelectField
                  name="year"
                  label=""
                  placeholder="Year"
                  form={form}
                  options={Array.from(
                    { length: 10 },
                    (_, i) => `${new Date().getFullYear() + i}`
                  )}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              <CountrySelect
                name="destinationCountry"
                label="Destination Country"
                placeholder="Select country"
                form={form}
                options={combinedCountryData.map((co) => ({
                  label: co.label,
                  value: co.value,
                }))}
              />

              <div>
                <InputField
                  name="destinationCity"
                  label="Destination City"
                  placeholder="Enter destination city"
                  form={form}
                  mt="!mt-[8px]"
                />
                <div className="text-xs mt-1">
                  <p>List all cities of interest with commas</p>
                  <span>(ex: Paris, Lyon, Nice)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 w-[200px]">
              <CheckboxField
                name="haveRoom"
                label="I have a room here"
                form={form}
                checked={form.getValues("haveRoom")} // Ensure checkbox is set to true/false correctly
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0872BA] text-white rounded-lg hover:bg-[#065a92] transition"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Destination"}
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
