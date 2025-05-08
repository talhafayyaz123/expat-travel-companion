"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectField } from "../form/SelectField";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  useGetMyTopQuery,
  useMytopAddMutation,
  useMytopUpdataMutation,
} from "@/redux/Api/myTopApi";
import { mytopData } from "@/redux/allSlice/formslice";

import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState } from "react";
import SelectReact from "../form/SelectReact";

const formSchema = z.object({
  personality: z.array(z.string().min(1, "Please select a personality trait")),
  philosophies: z.array(z.string().min(1, "Please select a philosophy")),
  goals: z.array(z.string().min(1, "Please select a goal")),
  hobbies: z.array(z.string().min(1, "Please select a hobby")),
  socialGroups: z.array(z.string().min(1, "Please select a social group")),
  foodieFan: z.array(z.string().min(1, "Please select a food preference")),
  musicalTastes: z.array(z.string().min(1, "Please select a music taste")),
});

export default function MyTop3() {
  const { data: myTopdata, refetch } = useGetMyTopQuery(undefined, {
    refetchOnMountOrArgChange: true, // Ensures fresh data is fetched on component mount
  });
  const [isLoading, setIsLoading] = useState(true);
  const [addMyTop] = useMytopAddMutation();
  const [updateMyTop] = useMytopUpdataMutation();
  const firstItemId = myTopdata?.data[0]?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  // Reset form values whenever `myTopdata` changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await refetch();
      if (myTopdata?.data[0]) {
        form.reset(myTopdata.data[0]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [refetch, myTopdata, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Saving your data...");

      if (firstItemId) {
        // Updating existing data
        await updateMyTop({ formdata: values, id: firstItemId }).unwrap();
        toast.success("My Top 3 updated successfully");
      } else {
        // Adding new data
        await addMyTop(values).unwrap();
        toast.success("My Top 3 created successfully");
      }

      dispatch(mytopData(true)); // Refresh the state or re-fetch data
      router.push("/talking-points"); // Navigate to the desired route
      toast.dismiss(toastId); // Dismiss loading toast
    } catch (error) {
      console.error("Error updating MyTop:", error);
      toast.error("Failed to save My Top 3. Please try again.");
      toast.dismiss();
    }
  };

  const optionsList = {
    personality: [
      "Adventurous",
      "Easygoing",
      "Humorous",
      "Introvert",
      "Outgoing",
      "Outspoken",
      "Playful",
      "Romantic",
      "Sensitive",
      "Sensual",
      "Shy",
      "Warm-hearted",
      "Wild",
    ],
    philosophies: [
      "Ambitious",
      "Idealistic",
      "Impulsive",
      "Independent",
      "Optimistic",
      "Pessimistic",
      "Practical",
      "Spiritual",
      "Traditional",
      "Unconventional",
      "Virtuous",
    ],
    goals: [
      "Career",
      "Community Building",
      "Community Service",
      "Ease",
      "Family",
      "Fame",
      "Fun",
      "Knowledge/Learning",
      "Serenity",
      "Wealth",
    ],
    hobbies: [
      "Animals",
      "Art",
      "Automobiles",
      "Boating",
      "Boardgames",
      "Card Games",
      "Computers",
      "Cooking",
      "Crafts",
      "Dancing",
      "Gardening",
      "Hiking",
      "Motorcycles/ATVs",
      "Music",
      "Needlework",
      "Outdoors",
      "Painting",
      "Photography",
      "Poetry",
      "Reading",
      "Roller skate/blade",
      "Sailing",
      "Shopping",
      "Sports",
      "Surfing",

      "Theatre",
      "Travel",
      "TV/Movies/Netflix",
      "Video Games",
      "Writing",
      "Yoga / Pilates / Tai-Chi",
    ],
    socialGroups: [
      "Average",
      "Country folks",
      "Creative folks",
      "Classy",
      "Technical",
      "Cultured",
      "Entrepreneurs",
      "Intellectuals",
      "Professionals",
      "Socialites",
      "Sports Fans",
    ],
    foodieFan: [
      "Asian Cuisine",
      "BBQ",
      "Caribbean Cuisine",
      "East African Cuisine",
      "French Cuisine",
      "Health Foods",
      "Indian Cuisine",
      "Italian Cuisine",
      "Latin Cuisine",
      "Pakistani",
      "Seafood",
      "Soul Food",
      "South African Cuisine",
      "Vegan",
      "Vegetarian",
    ],
    musicalTastes: [
      "Alternative",
      "Classical",
      "Blues",
      "American Country",
      "Dance/Disco",
      "Easy Listening",
      "Folk",
      "Gospel",
      "House",
      "Jazz",
      "Latin",
      "Metal",
      "Modern",
      "New-Age",
      "R&B",
      "Reggae",
      "Reggaeton",
      "Rap",
      "Rock",
      "Soul",
    ],
  };

  const renderSelectFields = (name: string, options: string[]) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((num) => (
        //old select field
        // <SelectField
        //   key={`${name}_${num}`}
        //   name={`${name}.${num - 1}`}
        //   label=""
        //   placeholder={`Select ${name} ${num}`}
        //   form={form}
        //   options={options}
        // />

        <SelectReact
          key={`${name}_${num}`}
          name={`${name}.${num - 1}`}
          label=""
          placeholder={`Select ${name} ${num}`}
          form={form}
          options={options.map((option) => ({ value: option, label: option }))}
        />
      ))}
    </div>
  );
  return (
    <div className="mx-auto p-4 lg:p-8 font-sans">
      <div className="border-b-2 pb-4 mb-6">
        <h2 className="text-[#1D2939] text-2xl lg:text-[48px] font-semibold">
          My Top 3&apos;s
        </h2>
      </div>
      <div className="pb-3">
        <p className="text-gray-800 my-1">
          Select your top three responses for each category. Feel free to use
          the same response more than once on a row, if desired.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {Object.entries(optionsList).map(([name, options]) => (
            <div key={name} className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-[#263238] text-[15px] font-bold">
                  {name
                    .replace(/([A-Z])/g, " $1") // Add a space before each capital letter
                    .replace(/^ /, "") // Remove leading space if any
                    .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                  {/* Capitalize first letters */}
                </h3>
              </div>
              {renderSelectFields(name, options)}
            </div>
          ))}
          <Button
            type="submit"
            className="w-full bg-[#0872BA] text-white py-3 rounded-lg hover:bg-[#065a92] transition"
          >
            {firstItemId ? "Update" : "Create"} My Top 3
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-start">
        <button className="text-[#0872BA] hover:underline text-sm">
          Need help? <Link href="/help-and-support">Click Help & Support</Link>
        </button>
      </div>
    </div>
  );
}
