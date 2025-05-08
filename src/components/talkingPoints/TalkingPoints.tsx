"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectField } from "../form/SelectField";
import { TextareaField } from "../form/TextAreaField";
import talkingPointsSchema from "@/schema/talkingPointsSchema";
import { useRouter } from "next/navigation";
import {
  useGetTalkingPointsQuery,
  useTalkingPointsMutation,
  useTalkingPointsUpdaMutation,
} from "@/redux/Api/talkingPointsApi";
import { useGetUserQuery } from "@/redux/Api/userApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { talkingUp } from "@/redux/allSlice/formslice";
import { useDispatch } from "react-redux";

type TalkingPointOption = any;

interface TalkingPoint {
  name: string;
  question: string;
  type: "select" | "textarea";
  options?: TalkingPointOption;
  placholder?: string;
}

export default function TalkingPoints() {
  const [talkingData] = useTalkingPointsMutation();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery(undefined);
  const { data: editData } = useGetTalkingPointsQuery(undefined);
  const [updateData] = useTalkingPointsUpdaMutation();
  const [reloadForm, setReloadForm] = useState(false);

  const isEditMode = Boolean(editData?.data[0]?.id);

  // Initialize form with default values, but we'll set them dynamically after fetching data
  const form = useForm<z.infer<typeof talkingPointsSchema>>({
    resolver: zodResolver(talkingPointsSchema),
    defaultValues: {
      cleanlinessLevel: editData?.data[0]?.cleanlinessLevel || "", // First field
      cookingHabit: editData?.data[0]?.cookingHabit || "", // Second field
      houseMateRelation: editData?.data[0]?.houseMateRelation || "", // Third field
      financialHabit: editData?.data[0]?.financialHabit || "", // Fourth field
      communicationStyle: editData?.data[0]?.communicationStyle || "", // Fifth field
      petFriendlyDescription: editData?.data[0]?.petFriendlyDescription || "", // Sixth field
      hostFriend: editData?.data[0]?.hostFriend || "", // Seventh field
      workRoutine: editData?.data[0]?.workRoutine || "", // Eighth field
      sleepSchedule: editData?.data[0]?.sleepSchedule || "", // Ninth field
      consumeAlcohol: editData?.data[0]?.consumeAlcohol || "", // Tenth field
      vapingProduct: editData?.data[0]?.vapingProduct || "", // Eleventh field
      drugDescription: editData?.data[0]?.drugDescription || "", // Twelfth field
      regardingHealth: editData?.data[0]?.regardingHealth || "", // Thirteenth field
      politicalValues: editData?.data[0]?.politicalValues || "", // Thirteenth field
      relagiouseDescription: editData?.data[0]?.relagiouseDescription || "", // Fourteenth field (typo in "religious")
      haveAllergies: editData?.data[0]?.haveAllergies || "", // Fifteenth field
      anyThingElse: editData?.data[0]?.anyThingElse || "",
    },
  });

  // Set form values after data is fetched (in edit mode)
  useEffect(() => {
    if (isEditMode && editData?.data[0]) {
      form.reset({
        ...editData?.data[0], // Reset form values with the fetched data
      });
      setReloadForm(true); // Trigger re-render after reset
    }
  }, [isEditMode, editData, form]);

  // Add the dependency on reloadForm to trigger a re-render if necessary
  useEffect(() => {
    if (reloadForm) {
      // This is to trigger any additional logic if needed after the form reload
      setReloadForm(false);
    }
  }, [reloadForm]);
  const router = useRouter();
  const dispatch = useDispatch();

  const talkinId = editData?.data[0]?.id;

  const onSubmit = async (values: z.infer<typeof talkingPointsSchema>) => {
    try {
      const loadingToastId = toast.loading("Updating Talking Points...");

      const modifiedValues = {
        userId: userData?.data?.id,

        ...values,
      };

      const data = {
        id: talkinId,
        formdata: values,
      };

      if (isEditMode) {
        await updateData(data).unwrap();
      } else {
        await talkingData(modifiedValues).unwrap();
      }
      dispatch(talkingUp(true));
      toast.success("Profile updated successfully!");

      router.push("/user-profile");
      toast.dismiss(loadingToastId);
    } catch (err) {
      toast.error("Talking Points Create field");
      toast.dismiss();
    }
  };

  if (userLoading) {
    return <div>Loading user data...</div>;
  }

  if (userError) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  if (!userData || !userData.data) {
    return <div>No user data available. Please log in and try again.</div>;
  }

  const talkingPoints: TalkingPoint[] = [
    {
      name: "cleanlinessLevel",
      question: "How would you rate your level of cleanliness?",
      type: "select",
      options: [
        "My space is consistently immaculate.",
        "I maintain cleanliness, though I’m not overly meticulous.",
        "My room can get a bit cluttered, but I keep shared areas tidy.",
        "I’m okay with a bit of mess around me.",
        "Honestly, I tend to be a bit disorganized.",
      ],
    },
    {
      name: "cookingHabit",
      question: "How would you describe your approach to cooking?",
      type: "select",
      options: [
        "I prefer to order food or dine out.",
        "I cook from time to time, but not regularly.",
        "I cook frequently, but usually simple meals.",
        "I enjoy cooking most days.",
        "I prepare all of my meals myself.",
      ],
    },
    {
      name: "houseMateRelation",
      question: "How would you describe your relationship with a housemate?",
      type: "select",
      options: [
        "We’ll become close friends.",
        "I’ll occasionally hang out and chat.",
        "We’ll be friends, but mostly just at home.",
        "I’ll be friendly but keep to myself most of the time.",
        "We’re just roommates sharing the rent.",
      ],
    },
    {
      name: "financialHabit",
      question: "How would you describe your financial habits?",
      type: "select",
      options: [
        "I’m very disciplined and always stick to a budget.",
        "I save regularly, but I also enjoy spending on things I love.",
        "I tend to live paycheck to paycheck, but I manage.",
        "I’m pretty spontaneous with my spending and don’t always track it.",
        "I focus on saving for the future and avoid unnecessary expenses.",
      ],
    },
    {
      name: "communicationStyle",
      question: "How would you describe your style of communication?",
      type: "select",
      options: [
        "I’m clear and direct, always getting straight to the point.",
        "I prefer open, honest conversations and value transparency.",
        "I’m a good listener, but I tend to be more reserved in my responses.",
        "I like to keep things casual and lighthearted in most discussions.",
        "I’m very expressive and enjoy engaging in deep, thoughtful conversations.",
      ],
    },
    {
      name: "petFriendlyDescription",
      question: "Are you pet friendly?",
      type: "select",
      options: [
        "I welcome pets and am pet friendly.",
        "I’m open to having pets as long as they’re well-behaved.",
        "Pets are fine, but I have some rules about cleanliness and noise.",
        "I prefer not to have pets around, but I’m willing to consider it.",
        "I’m not comfortable living with pets at all.",
      ],
    },
    {
      name: "hostFriend",
      question: "How often do you host friends or gatherings?",
      type: "select",
      options: [
        "I prefer to keep my home private, no guests allowed.",
        "I have a few friends over on weekends.",
        "I might have friends over on any given evening.",
        "I enjoy hosting people for special events.",
        "My door is always open.",
      ],
    },
    {
      name: "workRoutine",
      question: "What’s your typical work routine?",
      type: "select",
      options: [
        "It's demanding; I'm often at work.",
        "I follow a standard 9 to 5 work schedule.",
        "I have a part-time job or am attending school.",
        "Retired",
        "Sabbatical",
        "Not Working",
      ],
    },
    {
      name: "sleepSchedule",
      question: "What’s your sleep schedule?",
      type: "select",
      options: [
        "I go to bed early and wake up early.",
        "I tend to fall asleep after watching TV late at night.",
        "I’m more of a night person.",
        "I stay up all night and sleep during the day.",
        "I don’t get much sleep at all.",
      ],
    },
    {
      name: "consumeAlcohol",
      question: "How often do you consume alcohol?",
      type: "select",
      options: [
        "I don’t drink at all.",
        "I have one or two drinks per week.",
        "I enjoy a glass of wine in the evening.",
        "I drink socially, mostly in gatherings.",
        "I’m a heavy drinker.",
      ],
    },
    {
      name: "vapingProduct",
      question: "How often do you use tobacco or vaping products?",
      type: "select",
      options: [
        "I don’t use tobacco or vape.",
        "I only smoke on rare occasions, like during special events.",
        "I smoke occasionally, but only in social settings.",
        "I smoke regularly, but always outdoors.",
        "I smoke frequently, even indoors.",
      ],
    },
    {
      name: "drugDescription",
      question: "How would you describe your use of drugs?",
      type: "select",
      options: [
        "I don’t use any drugs.",
        "I’m 420 friendly.",
        "I use drugs occasionally for recreational purposes.",
        "I regularly use cannabis.",
        "I use more substances than just cannabis.",
      ],
    },
    {
      name: "regardingHealth",
      question:
        "Are you open to having conversations regarding health matters (physical, mental)?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "politicalValues",
      question:
        "How would you describe your political values?",
      type: "select",
      options: ["Conservative", "Progressive", "Independent", "Prefer not to say"],
    },
    {
      name: "relagiouseDescription",
      question:
        "How would you describe your Religious/Spiritual beliefs and practices?",
      type: "textarea",
    },
    {
      name: "haveAllergies",
      question:
        "Do you have any allergies? If so, please list them here: (Ex., Airborne allergens, Foods, Nuts, Latex, Pets/Animals, Insects, etc.)",
      type: "textarea",
    },
    {
      name: "anyThingElse",
      question: "Anything Else? ",
      type: "textarea",
      placholder:
        "Please share any other details such as must-haves, dealbreakers, etc",
    },
  ];

  return (
    <div className="mx-auto p-4 lg:p-8 font-sans">
      <div className="border-b-2 pb-4 mb-6">
        <h2 className="text-[#1D2939] text-2xl lg:text-[48px] font-semibold">
          Talking Points
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {talkingPoints.map((point) => (
            <div key={point.name} className="mb-4">
              {point.type === "textarea" ? (
                <TextareaField
                  name={point.name}
                  label={point.question}
                  placeholder={point.placholder || "Please share here..."}
                  form={form}
                />
              ) : (
                <SelectField
                  name={point.name}
                  label={point.question}
                  placeholder="Select an option..."
                  form={form}
                  options={point.options}
                />
              )}
            </div>
          ))}

          <Button
            type="submit"
            className="w-full bg-[#0872BA] text-white py-3 rounded-lg hover:bg-[#065a92] transition"
          >
            Save my profile
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-left">
        <p className="text-sm text-gray-600">
          Need help? Click{" "}
          <Link
            href="/help-and-support"
            className="text-[#0872BA] hover:underline"
          >
            Help & Support
          </Link>
        </p>
      </div>
    </div>
  );
}
