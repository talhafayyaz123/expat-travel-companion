"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function HomeFaq() {
  const [expandedItem, setExpandedItem] = React.useState<string | undefined>(
    undefined
  );

  return (
    <div className="mx-auto px-4 mt-[160px] container">
      <div className="flex justify-center items-center">
        <h1 className="mb-4 text-center lg:text-[48px] text-3xl font-bold text-gray-900 border-b w-max pb-1">
          FAQ&apos;s
        </h1>
      </div>
      <p className="mb-8 text-center text-gray-800 mt-[24px]">
        For any unanswered questions, please contact us here:
        <a
          href="mailto:info@ExpatGlobalGroup.com"
          className="text-gray-800 hover:underline ml-1"
        >
          info@ExpatGlobalGroup.com
        </a>
      </p>

      <Accordion
        type="single"
        collapsible
        value={expandedItem}
        onValueChange={(value) => setExpandedItem(value)}
        className="space-y-4"
      >
        {/* Static AccordionItem 1 */}
        <AccordionItem
          value="item-0"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              {/* What service does Expat Global Group provide? */}
              What is Expat Global Group?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-0" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-0" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75] ">
            {/* <span className="font-bold">Expat Global Group</span> is a dedicated
            platform for women who are relocating, traveling, or cruising
            abroad. It helps members find compatible travelers to share living
            accommodations, save costs, enhance safety, and combat loneliness.
            Members connect with like-minded women who share their journey and
            values, making their time abroad more enjoyable and affordable.
            <p>
              {" "}
              Members also gain access to a storehouse of resources, information
              and contacts – all useful services related to their journey.
            </p> */}
            <p>
              Expat Global Group is an online membership platform that connects
              expats and solo travelers who seek to share accommodations to save
              on costs, enhance safety, and combat loneliness. Members find
              like-minded companions with the goal of enjoying a more
              affordable, enriching experience abroad.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              What are the membership levels and costs?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-5" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-5" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            {/* <p>We offer two flexible membership plans:</p> */}

            <ul className=" list-disc md:pl-6 pl-2 mt-2">
              <li className="text-black">
                <span className="text-black font-[600]">
                  Standard Membership
                </span>{" "}
                – $12/month
              </li>
              <ul className="list-disc lg:ml-10 ml-2">
                <li>Access to our searchable directory</li>

                <li>Ability to create and view profiles</li>
                <li>
                  Connect with other members and start meaningful conversations
                </li>
              </ul>
            </ul>
            {/* <ul className=" list-disc md:pl-6 pl-2 mt-2">
              <li className="text-black">
                <span className="text-black font-[600]">
                  Business Membership{" "}
                </span>{" "}
                – $18/month
              </li>
              <ul className="list-disc lg:ml-10 ml-2">
                <li>Everything in the Standard Membership</li>

                <li>
                  Ability to list your business or service on your profile
                </li>
                <li>
                  Great for entrepreneurs who want to promote their products or
                  services to other members
                </li>
                <li>
                  Enhanced visibility within the community helps you connect
                  with like-minded travelers who may need your services
                </li>
              </ul>
              <span className="lg:pl-10 pl-0 text-[14px] text-gray-700">
                Note: Business listings require an active membership to be
                visible to the community
              </span>
            </ul> */}
            <p className="pt-10">
              {/* Both memberships are powered by Stripe for secure, hassle-free
              payments, and you can cancel at any time. Join today and start
              building connections that will help you make the most of your move
              abroad */}
              Memberships are powered by Stripe for secure, hassle-free
              payments, and can be cancelled at any time.
            </p>
            <p className="">
              Join today and start building connections that will help you make
              the most of your move abroad
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-1"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              {/* Is Expat Global Group a dating website? */}
              What’s included in the membership?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-1" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-1" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            {/* No, this is not a dating website, nor should it be used with any
            such intentions.
            <p className="text-[16px]">
              See: FAQs . What service does Expat Global Group provide?
            </p> */}
            <p>
              All members receive access to our member directory, our
              match-finding technology, and online chat features.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              Is Expat Global Group a dating website?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-2" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-2" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            No, this is not a dating website, nor should it be used with any
            such intentions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              What housing or lodging do members usually split costs on?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-3" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-3" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            They can include, but are not limited to: cruise cabins, hotels,
            apart-hotels, Airbnb's, co-living spaces, apartments, condos, or
            homes. This platform is ideal for those seeking housemates,
            roommates, hotel-mates, or just travel companions.
          </AccordionContent>
        </AccordionItem>

        {/* Static AccordionItem 3 */}

        {/* Static AccordionItem 4 */}
        <AccordionItem
          value="item-4"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              Who can use this service?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-4" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-4" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            <p>
              Expat Global Group is an inclusive platform for adults 21+ of all
              backgrounds, aligning with applicable laws. By registering, you
              confirm that all provided information, including IDs and social
              media links, is accurate. At its discretion, Expat Global Group
              reserves the right to deny service.
            </p>
            {/* Expat Global Group is a safe, supportive, and inclusive space for
            women, regardless of race, ethnicity, nationality, orientation, or
            religion.
            <ul className="list-disc md:pl-6 pl-2 mt-2">
              <li className="mb-2 md:ml-6 ml-2">
                You must be at least 21 years old to join this Website.
              </li>
              <li className="mb-2 md:ml-6 ml-2">
                This Website and its associated services are exclusively
                designed for individuals who identify as women.
                <ul className="list-disc md:pl-6 pl-2 mt-2">
                  <li className="mb-2 md:ml-6 ml-2">
                    By registering for an account, You affirm that Your gender
                    identity aligns with this eligibility requirement. This
                    policy is implemented to create a safe, supportive, and
                    inclusive community tailored to the unique needs and
                    experiences of women, in alignment with applicable laws.
                  </li>
                </ul>
              </li>
              <li className="mb-2 md:ml-6 ml-2">
                By registering, you affirm that all information you provide,
                including identification documents and social media account
                links, are accurate and truthful. B&B Global Ventures, LLC.,
                reserves the right to refuse service to any individual at its
                sole discretion.
              </li>
            </ul> */}
          </AccordionContent>
        </AccordionItem>

        {/* Static AccordionItem 5 */}
        {/* <AccordionItem
          value="item-5"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              What&apos;s included in the membership?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-5" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-5" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            Access to our member directory, our match-finding technology, chat
            features, conversation starters/talking points, screening services,
            and tons of travel & relocation resources.
          </AccordionContent>
        </AccordionItem> */}

        {/* Static AccordionItem 6 */}

        {/* Static AccordionItem 7 */}
        <AccordionItem
          value="item-6"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              What is the refund and cancellation policy?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-6" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-6" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            <p>
              Members may cancel at any time before the next billing cycle.{" "}
            </p>
            <p>
              If canceled late, charges for the renewed month are
              non-refundable, but member retains full access until the period
              ends.{" "}
            </p>
            <p>
              Early cancellations during a commitment period won’t qualify for
              refunds.
              {/* Monthly Subscriptions: Members may cancel at any time before the
              next billing cycle. If canceled late, charges for the renewed
              month are non-refundable, but you’ll retain full access until the
              period ends. Membership Commitment: Early cancellations during a
              commitment period won’t qualify for refunds. To cancel, update
              your profile or email us with your membership details for prompt
              processing. */}
            </p>
            <p>
              To cancel, update your profile or email us with your membership
              details for prompt processing.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Static AccordionItem 8 */}
        <AccordionItem
          value="item-7"
          className="rounded-lg bg-[#fff] px-6 py-4"
        >
          <AccordionTrigger className="flex items-center justify-between">
            <span className="text-left text-lg font-[500] text-[#212121]">
              How can I contact Expat Global Group?
            </span>
            <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full">
              {expandedItem !== "item-7" && (
                <Plus className="transition-all duration-200" size={16} />
              )}
              {expandedItem === "item-7" && (
                <Minus className="transition-all duration-200" size={16} />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 text-[18px] text-[#949494] font-[400] leading-[1.75]">
            You can reach out to us{" "}
            <Link href={"/contact"} className="text-blue-400">
              here
            </Link>
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
