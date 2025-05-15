"use client";
import React, { useEffect } from "react";
import HeaderWithoutBorder from "./PageReusable/HeaderWithoutBorder";

const CommunityGuidelines = () => {
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
    <div className="container mt-[108px] overflow-hidden">
      <div className="  py-10 ">
        <div className=" mx-auto  rounded-lg shadow-md md:p-6 p-2">
          <h1 className="md:text-[48px] text-xl  font-bold mb-6 text-center text-[#263238] my-3">
            Community Guidelines
          </h1>
          <p className="mb-6 text-gray-700 mt-4 ">
            Welcome to Expat Global Group
            <sup className="text-[10px]">™</sup>. a platform dedicated to
            connecting adults seeking compatible, like-minded companions for
            travel, housing, and community-building adventures. To ensure a
            safe, supportive, and inclusive environment, we’ve established the
            following Community Guidelines. By joining and participating in our
            community, you agree to uphold these principles:
          </p>

          <div className="space-y-6">
            {/* 1. Respect and Inclusivity */}
            <div>
              <HeaderWithoutBorder text="1. Respect and Inclusivity" />
              <p className="text-gray-700 ml-3">
                Our community is for all women over the age of 21, regardless of
                race, ethnicity, nationality, sexual orientation, religion, or
                background. Treat every member with respect, kindness, and
                understanding. Discrimination, harassment, or hate speech of any
                kind will not be tolerated.
              </p>
            </div>

            {/* 2. Safe and Supportive Interactions */}
            <div>
              <div className="text-lg md:text-xl  font-semibold text-black mb-3">
                <HeaderWithoutBorder text="2. Safe and Supportive Interactions" />
              </div>
              <ul className="list-disc md:pl-6 pl-2 mt-2">
                <li className="mb-2 md:ml-6 ml-2">
                  <strong className="text-black/75">Respect Boundaries:</strong>{" "}
                  Always approach interactions with courtesy and consideration.
                  If someone is not interested in a conversation or proposal,
                  respect their decision.
                </li>
                <li className="mb-2 md:ml-6 ml-2">
                  <strong className="text-black/75">Personal Safety:</strong>{" "}
                  Never share private or sensitive information, such as home
                  addresses, financial details, or personal identification
                  documents, on the platform.
                </li>
                <li className="mb-2 md:ml-6 ml-2">
                  <strong className="text-black/75">
                    Appropriate Communication:
                  </strong>{" "}
                  Use the platform’s internal text chat and video call features
                  responsibly. Avoid any behavior that could be perceived as
                  aggressive, invasive, or inappropriate.
                </li>
              </ul>
            </div>

            {/* 3. No Spam or Solicitation */}
            <div>
              <HeaderWithoutBorder text="3. No Spam or Solicitation" />
              <ul className="list-disc ml-3 text-gray-700 space-y-2">
                <li className="mb-2 md:ml-6 ml-2">
                  Do not use direct messaging to promote, solicit, or advertise
                  your business to other members.
                </li>
                <li className="mb-2 md:ml-6 ml-2">
                  Avoid posting repetitive or irrelevant promotional content.
                </li>
              </ul>
            </div>

            {/* 4. Authenticity Matters */}
            <div>
              <HeaderWithoutBorder text="4. Authenticity Matters" />
              <ul className="list-disc ml-3 text-gray-700 space-y-2">
                <li className="mb-2 md:ml-6 ml-2">
                  Be honest about your profile, intentions, and interests.
                  Misrepresentation, such as creating fake profiles or providing
                  false information, undermines trust within the community.
                </li>
                <li className="mb-2 md:ml-6 ml-2">
                  Only reach out to members with genuine interest in
                  collaboration, whether for travel, house-sharing, or building
                  community.
                </li>
              </ul>
            </div>

            {/* 5. Safety First */}
            <div>
              <HeaderWithoutBorder text="5. Safety First" />
              <ul className="list-disc ml-3 text-gray-700 space-y-2">
                <li className="mb-2 md:ml-6 ml-2">
                  Meet in public places if you choose to meet someone in person.
                </li>
                <li className="mb-2 md:ml-6 ml-2">
                  Trust your instincts and report any suspicious or concerning
                  behavior.
                </li>
              </ul>
            </div>

            {/* 6. Content Guidelines */}
            <div>
              <HeaderWithoutBorder text="6. Content Guidelines" />
              <ul className="list-disc ml-3 text-gray-700 space-y-2">
                <li className="mb-2 md:ml-6 ml-2">
                  Content shared on the platform, including messages, profiles,
                  and business posts, should be respectful and relevant to the
                  community’s purpose.
                </li>
                <li className="mb-2 md:ml-6 ml-2">
                  Avoid sharing explicit, offensive, or inappropriate content.
                </li>
              </ul>
            </div>

            {/* 7. Reporting and Moderation */}
            <div>
              <HeaderWithoutBorder text="7. Reporting and Moderation" />
              <ul className="list-disc ml-3 text-gray-700 space-y-2">
                <li className="mb-2 md:ml-6 ml-2">
                  If you experience or witness behavior that violates these
                  guidelines, please report it immediately using our reporting
                  tools.
                </li>
                <li className="mb-2 md:ml-6 ml-2">
                  Our team reserves the right to review and take action,
                  including removing content or suspending accounts, to maintain
                  the integrity of the community.
                </li>
              </ul>
            </div>

            {/* 8. Collaborative Community Building */}
            <div>
              <HeaderWithoutBorder text="8. Collaborative Community Building" />
              <p className="text-gray-700 ml-3">
                This is a space for connection, support, and empowerment.
                Contribute positively by offering encouragement, sharing
                experiences, and fostering a welcoming atmosphere.
              </p>
            </div>

            {/* Consequences of Violations */}
            <div>
              <h2 className="text-lg md:text-xl  font-semibold text-black mb-3">
                Consequences of Violations
              </h2>
              <p className="text-gray-700 ml-3">
                Violations of these guidelines may result in warnings, content
                removal, or account suspension, depending on the severity of the
                offense. Our goal is to maintain a community that feels safe and
                supportive for everyone.
              </p>
            </div>
          </div>

          <p className="mt-6 text-gray-700 text-sm text-center">
            By participating in Expat Global Group
            <span className="text-[12px]"> (TM)</span>, you are helping to
            create a vibrant, inclusive, and empowering community. Thank you for
            being a part of this journey!
          </p>
          <p className="mt-2 text-gray-500 text-sm text-center">
            Last updated: 18 December 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
