"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../form/InputField";
import { SelectField } from "../form/SelectField";
import { CheckboxField } from "../form/CheckboxField";
import avatarPlaceholder from "@/assets/form/prof.png";
import { useEffect, useState } from "react";
import { FileUploadField } from "../form/FileUploadField";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetUserQuery, useUpdateByUserMutation } from "@/redux/Api/userApi";
import { toast } from "sonner";
import { userUpd } from "@/redux/allSlice/formslice";
import { useGetDestinationQuery } from "@/redux/Api/destinationApi";
// import { countryOptions, getCountryLabel } from "@/constants/countryOptions";
import { CountrySelect } from "../CountrySelect";
import { Required } from "../icon/Required";
import { currentCountries } from "@/constants/currentCountries";
import { stateOptions } from "@/constants/stateOptions";
import { StateSelect } from "../userProfile/StateSelect";
import { SquareRadioButton } from "../SquareRadioButton";
// import Select from "react-select";
// import { Controller } from "react-hook-form";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  // summitMember: z.string().min(2, "Summit Member is required."),
  month: z.string().min(1, "Month is required."),
  day: z.string().min(1, "Day is required."),
  year: z.string().min(1, "Year is required."),
  zodiac: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string().min(2, "City must be at least 2 characters."),
  gender: z.any(),
  memberSeeking: z.any(),

  haveRoom: z.boolean().default(false),
  profileImage: z
    .instanceof(File)
    .refine((file) => file.size <= 25600000, {
      message: "File must be less than 256 KB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File must be JPEG or PNG format.",
      }
    )
    .optional(),
});

export default function ProfileForm() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { data: userData, isLoading: authUserLoading } =
    useGetUserQuery(undefined);
  const [profileUpUser, { isLoading }] = useUpdateByUserMutation();
  // const { data: desti, isError } = useGetDestinationQuery(undefined);

  // const isdestId = desti?.data?.data[0]?.id;
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userData?.data?.firstName || "",
      lastName: userData?.data?.lastName || "",
      // summitMember: userData?.data?.summitMember || "",
      month: userData?.data?.dob
        ? (new Date(userData.data.dob).getMonth() + 1)
            .toString()
            .padStart(2, "0")
        : "",
      day: userData?.data?.dob
        ? new Date(userData.data.dob).getDate().toString()
        : "",
      year: userData?.data?.dob
        ? new Date(userData.data.dob).getFullYear().toString()
        : "",
      zodiac: userData?.data?.zodiac || "",
      country: userData?.data?.country || "",
      state: userData?.data?.state || "", // Ensure correct value mapping for province
      city: userData?.data?.city || "",
      haveRoom: userData?.data?.haveRoom || false, // Ensure default value for checkbox
      profileImage: undefined,
      gender: userData?.data?.gender || "",
      memberSeeking: userData?.data?.memberSeeking || "",
    },
  });

  useEffect(() => {
    if (userData?.data && !authUserLoading) {
      form.reset({
        firstName: userData?.data?.firstName || "",
        lastName: userData?.data?.lastName || "",
        // summitMember: userData?.data?.summitMember || "",
        month: userData.data?.dob
          ? (new Date(userData?.data?.dob).getMonth() + 1)
              .toString()
              .padStart(2, "0")
          : "",
        day: userData.data.dob
          ? new Date(userData?.data?.dob).getDate().toString()
          : "",
        year: userData?.data?.dob
          ? new Date(userData?.data?.dob).getFullYear().toString()
          : "",
        zodiac: userData.data.zodiac || "",
        country: userData?.data?.country || "",
        state: userData?.data?.state || "", // Ensuring province is set correctly
        city: userData?.data?.city || "",
        haveRoom: userData?.data?.haveRoom || false, // Ensuring haveRoom is set correctly
        profileImage: undefined,
        gender: userData?.data?.gender || "",
        memberSeeking: userData?.data?.memberSeeking || "",
      });
    }
  }, [userData, authUserLoading, form]);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const loadingToastId = toast.loading("Updating profile...");

      const { day, month, year, profileImage, ...restValues } = values;
      const dob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

      const updatedValues = {
        ...restValues,
        profileImage,
        dob,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedValues));

      if (profileImage) {
        formData.append("image", profileImage);
      }

      const res = await profileUpUser(formData).unwrap();
      dispatch(userUpd(true));

      toast.success("Profile updated successfully!");
      router.push("/lifestyle");

      // if (isdestId) {
      //   router.push("/lifestyle");
      // } else {
      //   router.push("/destination");
      // }
      toast.dismiss(loadingToastId);
    } catch (error: any) {
      toast.error("Failed to update profile. Please try again.");
      toast.dismiss();
    }
  };

  // const genderOptions = [
  //   { value: "Female", label: "Female" },
  //   { value: "Male", label: "Male" },
  //   { value: "Non-Binary", label: "Non-Binary" },
  // ];

  return (
    <div className="mx-auto p-4 font-sans">
      <div className="grid grid-cols-12">
        <h2 className="lg:text-[48px] text-[24px] font-[600] border-b-2 py-2 col-span-12 text-[#1D2939]">
          My Profile
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="flex lg:flex-row gap-4 flex-col items-center">
            <div className="mb-4 h-[68px] w-[68px] rounded-full">
              <Image
                src={
                  avatarPreview ||
                  (userData?.data?.profileImage
                    ? userData.data.profileImage
                    : avatarPlaceholder.src)
                }
                alt="Avatar"
                width={68}
                height={68}
                className="rounded-full object-cover border-2 h-[68px] w-[68px] border-gray-300"
              />
            </div>
            <FileUploadField
              name="profileImage"
              label=""
              setPreview={setAvatarPreview}
              placeholder=""
              form={form}
            />
          </div>
          <div>
            You can upload images up to 256 x 256. Upload a clear
            head-and-shoulders photo of yourself only.
            <br />{" "}
            <span className="font-[700]">
              {" "}
              Your profile will remain inactive until the photo is approved.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <InputField
              name="firstName"
              label="First Name"
              placeholder="First Name"
              form={form}
            />
            <InputField
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              form={form}
            />
          </div>
          <div>
            <SelectField
              name="gender"
              label="Gender"
              placeholder="Select"
              form={form}
              options={["Female", "Male", "Non-Binary"]}
            />
          </div>
          {/* <div>
            <label className="font-semibold text-[20px]">
              What Are Seeking You?
            </label>
            <Controller
              name="gender"
              control={form.control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="mt-3"
                  options={genderOptions}
                  placeholder="Select"
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption?.value)
                  }
                />
              )}
            />
          </div> */}
          <div>
            <SelectField
              name="memberSeeking"
              label="What are you seeking?"
              placeholder="Select"
              form={form}
              options={["Female", "Male", "Non-Binary"]}
            />
          </div>

          {/* <InputField
            name="summitMember"
            label="If you are an ExodUS Summit member, please provide your FB name for verification?"
            placeholder="Type Here"
            form={form}
          /> */}

          <div className="relative  -bottom-3">
            <div className="flex items-center gap-2">
              <p className="text-[#263238] font-[700] text-[20px]  ">
                Date of Birth
              </p>
              <div className="relative group">
                <Required />
                {/* Tooltip */}
                <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Not visible to the public
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

            <InputField name="day" label="" placeholder="Date" form={form} />
            <InputField
              name="year"
              label=""
              placeholder="Year(xxxx)"
              form={form}
            />
          </div>

          <SelectField
            name="zodiac"
            label="Zodiac / Sun Sign"
            placeholder="Select your zodiac sign"
            form={form}
            options={[
              "Aries",
              "Taurus",
              "Gemini",
              "Cancer",
              "Leo",
              "Virgo",
              "Libra",
              "Scorpio",
              "Sagittarius",
              "Capricorn",
              "Aquarius",
              "Pisces",
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CountrySelect
              name="country"
              label="Current Country"
              placeholder="Select Country"
              form={form}
              options={currentCountries.map((co) => ({
                label: co.label,
                value: co.value,
              }))}
            />
            <StateSelect
              name="state"
              label="Current State/Province"
              placeholder="Province/State"
              form={form}
              options={stateOptions.map((so) => ({
                label: so.label,
                value: so.value,
              }))}
              required={true}
            />

            {/* <SelectField
              name="state"
              label="State/Province"
              placeholder="Province/State"
              form={form}
              options={stateOptions.map((co) => ({
                label: co.label,
                value: co.value,
              }))}
            /> */}
          </div>

          <div className="space-y-2 w-[200px]">
            <CheckboxField
              name="haveRoom"
              label="I have a room here"
              form={form}
              checked={form.getValues("haveRoom")} // Ensure checkbox is set to true/false correctly
            />
          </div>

          {/* <StateSelect
              name="city"
              label="Current city"
              placeholder="Select your state/province"
              form={form}
              options={stateOptions.map((so) => ({
                label: so.label,
                value: so.value,
              }))}
            /> */}
          <InputField
            name="city"
            label="Current City"
            placeholder="Type here"
            form={form}
          />

          <Button
            type="submit"
            className="w-full bg-[#0872BA] text-white py-3 rounded-lg hover:bg-[#065a92] transition"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
