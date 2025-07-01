// pages/contact.tsx
"use client"; 

import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"; // optional for toast notifications
import { useContactMutation } from "@/redux/Api/userApi";

// Define schema using Zod for validation
const ContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  text: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

type ContactFormData = z.infer<typeof ContactSchema>;

const ContactPage: FC = () => {

  const [contact]=useContactMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // handle form submission, for example send data to API
    await contact(data)
    toast.success("Message sent successfully!"); // Example toast notification
    reset();
  };

  return (
    <div className="container mx-auto p-6 mt-[160px]">
      <div className="flex justify-center items-center">
        <h1 className="mb-7 text-center lg:text-5xl text-3xl font-bold text-gray-900 border-b w-max pb-1 ">
          Contact Us
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-[560px] mx-auto">
        <div className="flex items-center gap-2 w-full ">
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("text")}
          />
          {errors.text && (
            <p className="text-red-500 text-xs mt-1">
              {errors.text.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
