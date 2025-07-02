"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import {
  useGetSingleDesQuery,
  useUpdateDestMutation,
} from "@/redux/Api/destinationApi";
import {
  combinedCountryData,
  countryOptions,
} from "@/constants/countryOptions";
import { TravelSelect } from "../TravelSelect";
import { travelOption } from "@/constants/traveType";
import { InputField } from "../form/InputField";
import { SquareRadioButton } from "../SquareRadioButton";
import { CheckboxField } from "../form/CheckboxField";

const formSchema = z.object({
  travelType: z.string(),
  month: z.string(),
  year: z.string(),
  destinationCountry: z.string(),
  destinationCity: z.string(),
  haveRoom: z.boolean().default(false),
});

interface UpdateDestinationModalProps {
  destinationId: string;
  onClose: () => void;
  destinationById: any;
  refetch: any;
}

export const UpdateDestinationModal: React.FC<UpdateDestinationModalProps> = ({
  destinationId,
  onClose,
  destinationById,
  refetch,
}) => {
  const [updateDestination, { isLoading: isUpdating }] =
    useUpdateDestMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelType: destinationById?.travelType || "",
      month: destinationById?.TravelBegins
        ? (new Date(destinationById?.TravelBegins).getUTCMonth() + 1)
            .toString()
            .padStart(2, "0")
        : "",
      year: destinationById?.TravelBegins
        ? new Date(destinationById?.TravelBegins).getUTCFullYear().toString()
        : "",
      destinationCountry: destinationById?.destinationCountry || "",
      destinationCity: destinationById?.destinationCity || "",
      haveRoom: destinationById?.haveRoom || false,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (destinationById) {
      reset({
        travelType: destinationById.travelType,
        month: destinationById?.TravelBegins
          ? (new Date(destinationById?.TravelBegins).getUTCMonth() + 1)
              .toString()
              .padStart(2, "0")
          : "",
        year: destinationById?.TravelBegins
          ? new Date(destinationById?.TravelBegins).getUTCFullYear().toString()
          : "",
        destinationCountry: destinationById.destinationCountry,
        destinationCity: destinationById.destinationCity,
        haveRoom: destinationById?.haveRoom || false,
      });
    }
  }, [destinationById, reset]);

  const city = [
    "New York City",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "San Francisco",
    "Charlotte",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington, D.C.",
    "Boston",
    "El Paso",
    "Nashville",
    "Detroit",
    "Portland",
    "Memphis",
    "Oklahoma City",
    "Las Vegas",
    "Louisville",
    "Baltimore",
    "Milwaukee",
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Create a UTC Date
      const TravelBeginsPrev = new Date(
        Date.UTC(
          parseInt(values.year), // Year
          parseInt(values.month) - 1, // Month (0-based index)
          1,
          0,
          0,
          0,
          0 // Set to midnight UTC
        )
      ).toISOString(); // Ensure it is in UTC format

      await updateDestination({
        id: destinationId,
        travelType: values.travelType,
        TravelBegins: TravelBeginsPrev,
        destinationCountry: values.destinationCountry,
        destinationCity: values.destinationCity,
        haveRoom: values.haveRoom,
      }).unwrap();
      refetch();
      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  return (
    <div className="">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the Destinations</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TravelSelect
              name="travelType"
              label="Stay / Lease Duration"
              placeholder="Select "
              form={form}
              options={travelOption.map((co) => ({
                label: co.label,
                value: co.value, // Replace spaces with underscores for value
              }))}
            />
            {/* <FormField
              control={form.control}
              name="travelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Type (Lease Duration)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select travel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cruise">Cruise</SelectItem>
                      <SelectItem value="scoutingTrip">
                        Scouting Trip (1-8 wks)
                      </SelectItem>

                      <SelectItem value="longTerm">
                        Slow Travel (2 mos - 6 mos)
                      </SelectItem>

                      <SelectItem value="longTerm">
                        Long Term (6 mos - 1 yr)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div>
              <FormLabel>Travel Begins</FormLabel>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <SelectItem
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["2025", "2026", "2027", "2028", "2029", "2030"].map(
                            (year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="destinationCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value=" ">Select</SelectItem>
                        {combinedCountryData.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <InputField
                  name="destinationCity"
                  label="Destination City"
                  placeholder="example1,example2"
                  form={form}
                  mt="!mt-[8px]"
                />
                <div className="text-xs mt-1">
                  <p>List all cities of interest with commas</p> (ex: Paris,
                  Lyon, Nice)
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

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Destination"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </div>
  );
};
