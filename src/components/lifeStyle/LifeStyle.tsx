"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../form/InputField";
import { SelectField } from "../form/SelectField";
import { CheckboxField } from "../form/CheckboxField";
import { TextareaField } from "../form/TextAreaField";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import PlusIcon from "../icon/PlusIcon";
import {
  useLifeCicleAddMutation,
  useLifStyleMyQuery,
  useUpdateLifeStyleMutation,
} from "@/redux/Api/lifeCicleApi";
import { saveLifeCicleData } from "@/redux/allSlice/formslice";
import { toast } from "sonner";
import { CountrySelect } from "../CountrySelect";
import { industryOptions } from "@/constants/industry";
import { useGetUserQuery } from "@/redux/Api/userApi";

const formSchema = z.object({
  monthlyBudget: z.string().optional(),
  maritalStatus: z.any(),
  ethnicity: z.any(),
  religion: z.any(),
  children: z.any(),
  pets: z.any(),
  education: z.any(),
  employmentStatus: z.any(),
  haveBusiness: z.any(),
  industry: z.any(),
  companyName: z.any(),
  serviceDes: z.any(),
  facebook: z.any(),
  instagram: z.any(),
  youtube: z.any(),
  website: z.any(),
  linkedin: z.any(),
});

export default function LifeStyle() {
  const [addLifeCicle, { isLoading }] = useLifeCicleAddMutation();
  const [updateLifeStyle, { isLoading: isUpdating }] =
    useUpdateLifeStyleMutation();
  const { data: lifestyleData, isSuccess } = useLifStyleMyQuery(undefined);
  const { data: businessUsers } = useGetUserQuery(undefined);
  const planName = businessUsers?.data?.planName;

  const dispatch = useDispatch();
  const router = useRouter();

  const isEditMode = Boolean(lifestyleData?.data?.userId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyBudget: lifestyleData?.data?.monthlyBudget?.toString() || "", // Ensure it is a string
      maritalStatus: lifestyleData?.data?.maritalStatus ?? "",
      ethnicity: lifestyleData?.data?.ethnicity ?? "",
      religion: lifestyleData?.data?.religion ?? "",
      children: lifestyleData?.data?.children ?? "",
      pets: lifestyleData?.data?.pets ?? "",
      education: lifestyleData?.data?.education ?? "",
      employmentStatus: lifestyleData?.data?.employmentStatus ?? "",
      haveBusiness: lifestyleData?.data?.haveBusiness ?? false,
      industry: lifestyleData?.data?.industry ?? "",
      companyName: lifestyleData?.data?.companyName ?? "",
      serviceDes: lifestyleData?.data?.serviceDes ?? "",
      facebook: lifestyleData?.data?.facebook ?? "",
      instagram: lifestyleData?.data?.instagram ?? "",
      youtube: lifestyleData?.data?.youtube ?? "",
      website: lifestyleData?.data?.website ?? "",
      linkedin: lifestyleData?.data?.linkedin ?? "",
    },
  });

  useEffect(() => {
    if (isSuccess && isEditMode) {
      form.reset({
        ...lifestyleData.data,
        monthlyBudget: lifestyleData.data?.monthlyBudget?.toString() || "",
      });
    }
  }, [isSuccess, isEditMode, lifestyleData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loadingToastId = toast.loading(
      isEditMode ? "Updating Lifestyle..." : "Creating Lifestyle..."
    );

    const transformedValues = {
      ...values,
      monthlyBudget: values.monthlyBudget ? Number(values.monthlyBudget) : null, // Convert string to number, handle null
    };

    try {
      let response;

      if (isEditMode) {
        response = await updateLifeStyle(transformedValues).unwrap();
        toast.success("Lifestyle updated successfully");
      } else {
        response = await addLifeCicle(transformedValues).unwrap();
        toast.success("Lifestyle created successfully");
      }

      dispatch(saveLifeCicleData(true));
      toast.dismiss(loadingToastId);
      router.push("/mytop");
    } catch (err: any) {
      // Extract the error message, if any, from the error response
      const errorMessage =
        err?.message || "An unexpected error occurred. Please try again.";

      toast.error(
        `Failed to ${
          isEditMode ? "update" : "create"
        } Lifestyle. ${errorMessage}`
      );
      toast.dismiss(loadingToastId);
    }
  };

  const [socialLinks, setSocialLinks] = useState({
    facebook: false,
    instagram: false,
    website: false,
    youtube: false,
    linkedin: false,
  });

  const toggleLinkVisibility = (link: keyof typeof socialLinks) => {
    setSocialLinks((prev) => ({ ...prev, [link]: !prev[link] }));
  };

  const renderSocialLink = (label: string, name: keyof typeof socialLinks) => (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2 mt-4">
        <span onClick={() => toggleLinkVisibility(name)}>
          <PlusIcon className="text-[#0872BA] border-2 border-[#0872BA] rounded-full cursor-pointer" />
        </span>
        <div className="text-black ">{label}</div>
      </div>

      {socialLinks[name] && (
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-6">
            <InputField
              name={name}
              label=""
              placeholder={`${label} link`}
              form={form}
            />
          </div>
        </div>
      )}
    </div>
  );

  const hasBusiness = form.watch("haveBusiness");

  return (
    <div className="mx-auto p-4 lg:p-8 font-sans ">
      <div className="border-b-2 pb-4 mb-6">
        <h2 className="text-[#1D2939] text-2xl lg:text-[48px] font-semibold">
          Lifestyle
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SelectField
            name="monthlyBudget"
            label="Max. Monthly Budget"
            placeholder="Select"
            form={form}
            options={[
              "300",
              "400",
              "500",
              "600",
              "700",
              "800",
              "900",
              "1000",
              "1100",
              "1200",
              "1300",
              "1400",
              "1500",
              "1600",
              "1700",
              "1800",
              "1900",
              "2000",
              "2100",
              "2200",
              "2300",
              "2400",
              "2500",
              "2600",
              "2700",
              "2800",
              "2900",
              "3000",
            ]}
          />

          <SelectField
            name="maritalStatus"
            label="Marital Status"
            placeholder="Select"
            form={form}
            options={["Single", "Married", "Separated", "Divorced", "Widowed"]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputField
              name="ethnicity"
              label="Ethnicity"
              placeholder="Please type here"
              form={form}
            />
            <InputField
              name="religion"
              label="Religion"
              placeholder="Please type here"
              form={form}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SelectField
              name="children"
              label="Do you have children?"
              placeholder="Select"
              form={form}
              options={["No", "Yes", "Yes, but they don't live with me"]}
            />

            <SelectField
              name="pets"
              label="Do you have pets?"
              placeholder="Select"
              form={form}
              options={[
                "No",
                "Yes",
                "Yes, but they don't always travel with me",
              ]}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-2">
            <SelectField
              name="education"
              label="Education Level"
              placeholder="Select"
              form={form}
              options={[
                "Some High School",
                "High School Graduate",
                "Vocational/Trade School",
                "Some College",
                "College Graduate",
                "Post Graduate",
              ]}
            />

            <SelectField
              name="employmentStatus"
              label="Employment Status"
              placeholder="Select"
              form={form}
              options={[
                "Full-time",
                "Part-time",
                "Student",
                "Self-employed",
                "Unemployed",
                "Retired",
                "Other",
              ]}
            />
          </div>

          {planName !== "Standard Membership" && (
            <CheckboxField
              name="haveBusiness"
              label="Do you have a business?"
              form={form}
              checked={form.watch("haveBusiness")}
            />
          )}

          {hasBusiness && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-2">
                <CountrySelect
                  name="industry"
                  label="My Business-Industry"
                  placeholder="Select"
                  form={form}
                  options={industryOptions.map((co) => ({
                    label: co.label,
                    value: co.value, // Replace spaces with underscores for value
                  }))}
                />

                <InputField
                  name="companyName"
                  label="Company Name"
                  placeholder="Enter company name"
                  form={form}
                />
              </div>

              <TextareaField
                name="serviceDes"
                label="Description of Services"
                placeholder="Enter service description"
                form={form}
              />
            </div>
          )}
          {hasBusiness && (
            <div>
              <p className="text-gray-900 text-xl font-[500] flex items-center">
                Visit Us Online
              </p>
              {renderSocialLink("Facebook", "facebook")}
              {renderSocialLink("Instagram", "instagram")}
              {renderSocialLink("Linkedin", "linkedin")}
              {renderSocialLink("YouTube", "youtube")}

              {renderSocialLink("Website", "website")}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#0872BA] text-white py-6 rounded-lg hover:bg-[#065a92] transition"
          >
            {isEditMode ? "Update" : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
