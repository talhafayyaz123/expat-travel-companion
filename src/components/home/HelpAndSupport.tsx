"use client"
import React, { useEffect } from "react";
import HeaderWithoutBorder from "./PageReusable/HeaderWithoutBorder";
import Link from "next/link";
import SafetyDisclaimer from "@/app/(default)/safety/page";
import Liability from "./Liability";
import UserAgreement from "@/app/(default)/user-agrement/page";

const HelpAndSupport = () => {
  useEffect(() => {
    // Select all <p> elements
    const paragraphs = document.querySelectorAll("p");

    // Using Set to make sure the class is only added once to any element
    paragraphs.forEach((paragraph) => {
      // If the paragraph doesn't already have the line-height class, add it
      if (!paragraph.classList.contains("leading-[1.7]")) {
        paragraph.classList.add("leading-[1.7]");
      }
    });
  }, []);
  return (
    // <div className="container mx-auto px-4 sm:px-6 md:px-8">
    //   <h2 className="text-[#263238] font-sans text-[30px] sm:text-[40px] md:text-[50px] text-center font-bold mt-[120px] sm:mt-[200px] md:mt-[200px]">
    //     Help & Support
    //   </h2>

    //   <div className="font-sans font-bold text-2xl mt-10 sm:mt-20 md:mt-20">
    //     <HeaderWithoutBorder text="Privacy Policy" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     Your safety and privacy are our top priority. Profiles and
    //     accommodations undergo thorough verification to ensure a safe experience
    //     for all users. We also offer secure payment options and in-app messaging
    //     to keep your personal information protected.
    //   </p>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Customer Support" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     If you ever encounter any issues or have questions, our customer support
    //     team is here to help. Reach out to us through the &quot;Contact Us&quot;
    //     page, and we will respond promptly to assist with your needs.
    //   </p>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Additional Resources" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     For any more information or assistance with specific issues, feel free
    //     to consult our FAQ page or get in touch with our support team directly.
    //     We&apos;re here to make your experience as smooth as possible.
    //   </p>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Need More Help?" />
    //   </div>
    //   <div className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     If you need further assistance, don&apos;t hesitate to contact us.
    //     We&apos;re dedicated to ensuring your experience is safe, enjoyable, and
    //     stress-free. <br />
    //     <div className="flex flex-col mt-3">
    //       <span className="text-primary underline mt-3 block sm:inline-block">
    //         <Link href={"/contact"} className="">
    //           Contact Us
    //         </Link>
    //       </span>{" "}
    //       <span className="text-primary underline mt-3 block sm:inline-block">
    //         <Link href={"/faq"}>FAQ Page</Link>
    //       </span>
    //     </div>
    //   </div>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Booking and Payments" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     Once you&apos;ve selected a listing, you can initiate the booking
    //     process. Follow the prompts to confirm your travel dates, review the
    //     details, and proceed with secure payment options. All transactions are
    //     processed securely through the platform to ensure your privacy and peace
    //     of mind.
    //   </p>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Getting Started" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     To get started, simply sign up or log into your account. Once logged in,
    //     you can easily search for shared accommodations and roommates, browse
    //     available listings, and save your favorite profiles for easy access.
    //   </p>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Search and Filters" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     Use the search functionality to find roommates and accommodations based
    //     on your destination, travel dates, and other preferences. You can apply
    //     various filters, such as room type, price range, and number of
    //     travelers, to narrow down your options and find the perfect match.
    //   </p>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Saving Profiles and Listings" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     You can save profiles and listings that interest you for future
    //     reference. Once saved, you can view them at any time in your &quot;Saved
    //     Profiles&quot; section, making it easy to compare your options and make
    //     a decision when you&apos;re ready.
    //   </p>

    //   <div className="font-sans mt-[40px] sm:mt-[64px] font-bold text-2xl">
    //     <HeaderWithoutBorder text="Managing Your Profile" />
    //   </div>
    //   <p className="text-[16px] sm:text-[18px] font-sans font-normal mt-[16px] sm:mt-[26px]">
    //     Keep your profile up to date with your latest preferences, bio, and
    //     pictures to make your profile more appealing to potential roommates. You
    //     can easily edit your profile from the &quot;My Profile&quot; section.
    //   </p>
    // </div>
    <div>
        <UserAgreement />
      <SafetyDisclaimer />
      <Liability />
    
    </div>
  );
};

export default HelpAndSupport;
