"use client";

import HeaderWithBorder from "@/components/home/PageReusable/HeaderWithBorder";
import HeaderWithoutBorder from "@/components/home/PageReusable/HeaderWithoutBorder";
import ListDesign from "@/components/home/PageReusable/ListDesign";
import UlContainer from "@/components/home/PageReusable/UlContainer";
import Link from "next/link";
import React, { useEffect } from "react";

const TermsAndCondition = () => {
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
    <div className="container mx-auto mt-[160px] overflow-hidden">
      <div className="flex justify-center items-center flex-col gap-3 pb-3">
        <h2 className="text-[#263238] font-sans text-lg md:text-3xl text-center font-bold">
          Terms and Conditions
        </h2>
        <h1 className="  text-lg  text-center">
          <span className="font-bold text-black/75 me-2">Effective Date:</span>
          December 1, 2024
        </h1>
        <h1 className="  text-lg  text-center">
          <span className="font-bold text-black/75 me-2">Updated Date:</span>
          April 22, 2025
        </h1>
        <h2 className="md:text-md text-lg text-center mt-2">
          <span className="font-bold text-black/75 ">
            Terms and Conditions for B&B Global Ventures, LLC, d/b/a Expat
            Global Group™
          </span>
        </h2>
      </div>

      <p className="p-3">
        Welcome to B&B Global Ventures, LLC (“we,” “our,” or “us”). These Terms
        and Conditions ("Terms") govern your access to and use of our website,{" "}
        <Link className="text-blue-500" href={"www.ExpatGlobalGroup.com"}>
          www.ExpatGlobalGroup.com
        </Link>{" "}
        (the “Website”), and the services we provide. By accessing or using our
        Website, you agree to be bound by these Terms. If you do not agree, you
        must discontinue use of the Website immediately.
      </p>

      {/* ................. */}
      <section>
        <ul className="pl-6 pb-2 space-y-3 marker:font-semibold">
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3 block">
              Definitions
            </span>
            <UlContainer>
              <ListDesign>
                <span className="font-semibold text-black/75"> Website:</span>{" "}
                Refers to{" "}
                <Link
                  className="text-blue-500"
                  href={"www.ExpatGlobalGroup.com"}
                >
                  www.ExpatGlobalGroup.com
                </Link>
                .
              </ListDesign>
              <ListDesign>
                <span className="font-semibold text-black/75"> Service:</span>
                The roommate-matching platform we provide to help users find
                house-sharing living arrangements.
              </ListDesign>
              <ListDesign>
                <span className="font-semibold text-black/75"> User:</span> Any
                individual who accesses or uses the Website.
              </ListDesign>
              <ListDesign>
                <span className="font-semibold text-black/75"> Member:</span> A
                registered user with an active account.
              </ListDesign>
              <ListDesign>
                <span className="font-semibold text-black/75"> Stripe:</span> A
                third-party payment platform used for subscription management.
              </ListDesign>
              <ListDesign>
                <span className="font-semibold text-black/75"> Content:</span>{" "}
                Includes text, images, videos, or other materials displayed or
                uploaded on the Website.
              </ListDesign>
            </UlContainer>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3 block">
              Eligibility
            </span>
            <UlContainer>
              <ListDesign>
                You must be at least 21 years old to use the Website.
              </ListDesign>
              <ListDesign>
                This Website and its associated services are open to all
                individuals who meet the eligibility criteria, regardless of
                gender. By registering for an account, you confirm that you meet
                these criteria and agree to respect the inclusive nature of the
                platform. We are committed to fostering a safe, supportive, and
                respectful environment for all users.
              </ListDesign>
              <ListDesign>
                By registering, you affirm that all information you provide,
                including identification documents and social media account
                links, are accurate and truthful.
              </ListDesign>
              <ListDesign>
                <strong className="text-black/75">
                  B&B Global Ventures, LLC
                </strong>
                ., reserves the right to refuse service to any individual at its
                sole discretion.
              </ListDesign>
            </UlContainer>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3 block">
              Registration and Account Management
            </span>
            <ol className="list-inside">
              <ListDesign>
                <span className="font-semibold text-black/75">
                  Account creation
                </span>
                <span className="mb-2 block"></span>
                <UlContainer>
                  <ListDesign>
                    To access certain features, you must create an account.
                  </ListDesign>
                  <ListDesign>
                    You are responsible for maintaining the confidentiality of
                    your login credentials.
                  </ListDesign>
                </UlContainer>
              </ListDesign>
              <span className="mb-2 block"></span>
              <ListDesign>
                <span className="font-semibold text-black/75">
                  Accuracy of Information
                </span>
                <span className="mb-2 block"></span>
                <UlContainer>
                  <ListDesign>
                    Users must provide valid and up-to-date information,
                    including a current photo ID.
                  </ListDesign>
                  <ListDesign>
                    Misrepresentation of identity or use of another person’s
                    information is strictly prohibited.
                  </ListDesign>
                </UlContainer>
              </ListDesign>
              <span className="mb-2 block"></span>
              <ListDesign>
                <span className="font-semibold text-black/75">
                  Account Suspension or Termination
                </span>
                <span className="mb-2 block"></span>
                <UlContainer>
                  <ListDesign>
                    We reserve the right to suspend or terminate your account
                    for any violation of these Terms or for behavior deemed
                    inappropriate, fraudulent, or unlawful.
                  </ListDesign>
                </UlContainer>
              </ListDesign>
            </ol>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3 block">
              Services Provided
            </span>
            <p>
              Our platform facilitates connections between individuals seeking
              travel companions and/or roommates for room and house sharing
              living arrangements, particularly for international relocations.
              While we verify user identity through photo ID and social media
              linking, we do not guarantee the accuracy, reliability, or
              suitability of any user, member, or match.
            </p>
          </ListDesign>
          <h4 className="font-semibold text-black/70 py-4 pb-0">
            4.1 Additional Terms and Conditions
          </h4>
          <p>
            The following terms also govern and apply to your use of the Site
            and Services and are incorporated into these Terms by reference:
          </p>

          <div className="py-3 ">
            <p className="font-semibold pl-10 text-black/75">
              Access and Membership Responsibilities
            </p>
            <p className="pl-10">
              Unless otherwise indicated, access to the Service is exclusively
              available to current, paying members. Your membership grants you
              the ability to access the Service and participate in related
              opportunities. We provide the platform and access, but the
              responsibility for participation and usage lies with the Member.
            </p>
            <p className="pt-2 pl-10">
              Failure to attend, utilize, or access the Service does not absolve
              the Member of their payment obligations. Members are responsible
              for all payments incurred during their subscription period,
              regardless of whether they achieve their desired results or fully
              engage with the Service.
            </p>
          </div>
          <div className="py-3 pl-10">
            <p className="font-semibold  text-black/75">
              Expat Global Group Community Guidelines Privacy Policy
            </p>
            <p>
              These policies may be updated periodically and are effective
              immediately upon posting such changes on the Site. By accessing
              the Site and/or using the Services, You acknowledge that You have
              read and agree to abide by these additional terms.
            </p>
          </div>
          <div className="py-3 pl-10">
            <p className="font-semibold  text-black/75">
              Privacy and Data Protection
            </p>
            <p>
              Your use of the Service is also governed by our Privacy Policy,
              which outlines how we collect, use, and safeguard your personal
              information. By using our Service, you agree to the practices
              described therein. We comply with applicable data protection laws,
              including the{" "}
              <span className="font-semibold">
                General Data Protection Regulation (GDPR)
              </span>
              , the{" "}
              <span className="font-semibold">
                California Consumer Privacy Act (CCPA)
              </span>
              , and, where applicable,{" "}
              <span className="font-semibold">
                Canada’s Personal Information Protection and Electronic
                Documents Act (PIPEDA)
              </span>
              .
            </p>
          </div>
          <div className="py-3 ">
            <p className="font-semibold pl-10 text-black/75">
              User Responsibilities
            </p>
            <p className="pl-10">
              Your ability to access, participate in, and benefit from the
              Services depends on your compliance with the following
              requirements. Failure to meet these responsibilities may impair
              your experience, for which B&B Global Ventures, LLC assumes no
              liability. By using the Website, you acknowledge that the
              platform’s resources and guidance are accessible to all users
              regardless of gender and agree to treat all members respectfully
              and equitably.
            </p>
          </div>
          <ol className="list-inside">
            <ListDesign>
              <span className="md:text-md text-md text-start mt-2 font-bold text-black/75">
                Tools to Be Provided by You
              </span>
              <p className="mt-2">
                You acknowledge and agree that participation in the Website and
                Service requires access to certain tools, including:
              </p>
              <UlContainer>
                <ListDesign>A stable internet connection,</ListDesign>
                <ListDesign>A computer or mobile device, and</ListDesign>
                <ListDesign>
                  Required personal information and documentation that may be
                  requested by B&B Global Ventures, LLC to facilitate the
                  delivery of services.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <span className="mb-2 block"></span>
            <ListDesign>
              <span className="md:text-md text-md text-start mt-2 font-bold text-black/75">
                Technological Skills
              </span>
              <p className="mt-2">
                Given the nature of the Website, basic technological proficiency
                is necessary to engage effectively with the Company and the
                Services. This includes the ability to:
              </p>
              <UlContainer>
                <ListDesign>Access the internet</ListDesign>
                <ListDesign>Download and upload documents,</ListDesign>
                <ListDesign>
                  Navigate social media and email platforms, and
                </ListDesign>
                <ListDesign>
                  Use remote communication tools (e.g., video conferencing
                  platforms).
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <span className="mb-2 block"></span>
            <ListDesign>
              <span className="md:text-md text-md text-start mt-2 font-bold text-black/75">
                Personal Effort
              </span>
              <p className="mt-2">
                Your success in using the Service depends significantly on your
                active participation and personal commitment. To fully benefit
                from the Service, you must:
              </p>
              <UlContainer>
                <ListDesign>
                  Implement the tools and guidance provided,
                </ListDesign>
                <ListDesign>
                  Dedicate time and effort outside the platform to achieve your
                  goals, and
                </ListDesign>
                <ListDesign>Request support from us when needed.</ListDesign>
              </UlContainer>
              <p className="pt-5">
                By agreeing to these Terms, you accept full responsibility for
                your engagement and participation, recognizing that your effort
                directly impacts the value derived from the Service.
              </p>
            </ListDesign>
          </ol>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3 block">
              Membership and Payment Terms
            </span>
            <ol className="list-inside">
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Payment via Stripe
                </span>
                <UlContainer>
                  <ListDesign>
                    Membership fees are processed through Stripe.
                  </ListDesign>
                  <ListDesign>
                    By subscribing, you agree to Stripe’s terms of service in
                    addition to these Terms.
                  </ListDesign>
                </UlContainer>
              </ListDesign>
              <span className="block mb-2"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Cancellation Policy
                </span>
                <div className="mt-3">
                  Members may cancel their subscriptions at any time through
                  Stripe or by emailing
                  <Link
                    className="text-blue-500 ms-1"
                    href={"mailto:info@expatglobalgroup.com"}
                  >
                    info@expatglobalgroup.com
                  </Link>
                  .
                </div>
                <div className="">
                  <h4 className="text-md text-start mt-2 font-bold text-black/75 mb-3">
                    For Monthly Subscriptions:
                  </h4>
                  <p>
                    You may cancel your membership for any reason before the
                    start of the next billing cycle. If your cancellation
                    request is not submitted in time, your membership may be
                    renewed, and you may be charged for the following month.
                    Please note that charges for the renewed period will not be
                    refundable. However, you will retain full access to the
                    Service for the duration of the paid membership period.
                  </p>
                </div>
                <div className="">
                  <h4 className="text-md text-start mt-2 font-bold text-black/75 mb-3">
                    Membership Commitment:
                  </h4>
                  <p>
                    This cancellation policy applies only to members currently
                    within their membership commitment. Early cancellation does
                    not entitle members to a refund for any unused portion of
                    the membership period.
                  </p>
                </div>
                <div className="">
                  <h4 className="text-md text-start mt-2 font-bold text-black/75 mb-3">
                    How to Cancel:
                  </h4>
                  <p>
                    To cancel your membership, visit your profile on the
                    membership platform or send an email request to{" "}
                    <Link
                      className="text-blue-500"
                      href={"mailto:info@expatglobalgroup.com"}
                    >
                      info@expatglobalgroup.com
                    </Link>
                    . Ensure you include your membership details to avoid delays
                    in processing.
                  </p>
                </div>
              </ListDesign>
              <span className="block mb-2"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Inactive Accounts
                </span>
                <UlContainer listDisc={false}>
                  <ListDesign>
                    Accounts may be deemed inactive if not accessed for a
                    specified period.
                  </ListDesign>
                  <ListDesign>
                    Inactive accounts may be subject to suspension or
                    termination.
                  </ListDesign>
                </UlContainer>
              </ListDesign>
            </ol>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3 block">
              User Conduct
            </span>
            <p className="py-2">When using the Website, You agree to:</p>
            <ul className="list-decimal pl-6 space-y-3 marker:font-normal">
              <ListDesign>
                Treat all members with respect and refrain from discriminatory,
                harassing, or abusive behavior.
              </ListDesign>
              <ListDesign>
                Avoid sharing or posting false, misleading, or defamatory
                information.
              </ListDesign>
              <ListDesign>
                Not engage in activities that violate any applicable laws or
                regulations.
              </ListDesign>
            </ul>
            <p className="pt-5 pb-2">
              Prohibited activities include but are not limited to:
            </p>
            <UlContainer>
              <ListDesign>Impersonation of another person.</ListDesign>
              <ListDesign>
                Sharing another user’s private information without consent.
              </ListDesign>
              <ListDesign>
                Using automated tools to access or scrape the Website.
              </ListDesign>
            </UlContainer>
            <p className="py-3">
              We reserve the right to remove any content or terminate accounts
              that violate these rules.
            </p>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              Limitation of Liability
            </span>
            <ol className=" list-inside">
              <span className="mt-2 block"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Platform as a Facilitator
                </span>
                <span className="mt-2 block"></span>
                <UlContainer>
                  <ListDesign>
                    <span className="font-semibold text-black/75">
                      B&B Global Ventures
                    </span>
                    , LLC provides a platform to connect users and members and
                    does not guarantee the accuracy, reliability, or safety of
                    user interactions.
                  </ListDesign>
                  <ListDesign>
                    Users are solely responsible for their interactions and
                    arrangements with other members.
                  </ListDesign>
                </UlContainer>
              </ListDesign>
              <span className="mt-2 block"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Disclaimer of Warranties
                </span>
                <span className="mt-2 block"></span>
                <UlContainer>
                  <ListDesign>
                    The Website and services are provided “as is” and “as
                    available.”
                  </ListDesign>
                  <ListDesign>
                    We disclaim all warranties, including those of
                    merchantability, fitness for a particular purpose, and
                    non-infringement.
                  </ListDesign>
                </UlContainer>
              </ListDesign>
              <span className="mt-2 block"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Indemnification
                </span>
                <span className="mt-2 block"></span>
                <p>
                  You agree to indemnify and hold harmless B&B Global Ventures,
                  LLC, its employees, and affiliates from any claims arising
                  from your use of the Website or interactions with other
                  members.
                </p>
              </ListDesign>
            </ol>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              International Users
            </span>
            <p>
              Our Website is accessible worldwide. By using the Website, you
              agree to comply with local laws, including those concerning data
              protection and house-sharing arrangements.
            </p>
            <ol className=" list-inside mt-2">
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  GDPR Compliance
                </span>
                <p className="mt-2">
                  European Union users are entitled to GDPR rights, including
                  access to, correction of, and deletion of personal data.
                </p>
              </ListDesign>
              <span className="mb-2 block"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Restricted Geographies
                </span>
                <p className="mt-2">
                  The Website may not be available in certain jurisdictions due
                  to local legal restrictions. We are not responsible for any
                  inability to access the Website in such regions.
                </p>
              </ListDesign>
            </ol>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              Intellectual Property
            </span>
            <div className=" py-3">
              <UlContainer>
                <ListDesign>
                  All Website content, including trademarks, text, graphics, and
                  software, is owned by B&B Global Ventures, LLC.
                </ListDesign>
                <ListDesign>
                  Unauthorized use, reproduction, or distribution of Website
                  content is prohibited.
                </ListDesign>
              </UlContainer>
            </div>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              Dispute Resolution
            </span>
            <span className="mb-2 block"></span>
            <ol className=" list-inside">
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Informal Resolution
                </span>
                <p className="mt-2">
                  Users must attempt to resolve disputes informally by
                  contacting us at{" "}
                  <Link
                    className="text-blue-500"
                    href={"mailto:info@expatglobalgroup.com"}
                  >
                    info@expatglobalgroup.com
                  </Link>
                  .
                </p>
              </ListDesign>
              <span className="mb-2 block"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Binding Arbitration
                </span>
                <p className="mt-2">
                  If informal resolution fails, disputes will be resolved
                  through binding arbitration in accordance with the rules of
                  the American Arbitration Association (AAA).
                </p>
              </ListDesign>
              <span className="mb-2 block"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Class Action Waiver
                </span>
                <p className="mt-2">
                  Disputes must be resolved on an individual basis, and users
                  waive the right to participate in any class-action lawsuit.
                </p>
              </ListDesign>
              <span className="mb-2 block"></span>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
                  Jurisdiction
                </span>
                <p className="mt-2">
                  All disputes will be governed by the laws of Texas, and
                  arbitration or legal proceedings will take place in Texas.
                </p>
              </ListDesign>
            </ol>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              Modifications to Terms
            </span>
            <p className="mt-2">
              We reserve the right to modify these Terms at any time. Updates
              will be posted on this page, and continued use of the Website
              constitutes acceptance of the revised Terms.
            </p>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              Termination
            </span>
            <p className="mt-2">
              We reserve the right to terminate or suspend your access to the
              Website at any time for any violation of these Terms or for any
              other reason deemed necessary.
            </p>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              Notices
            </span>
            <p>All notices and communications must be sent to:</p>
            <p className="py-3">
              <span className="font-semibold text-black/75">Email:</span>{" "}
              <Link
                className="text-blue-500"
                href={"mailto:info@expatglobalgroup.com"}
              >
                info@expatglobalgroup.com
              </Link>
              .
            </p>
          </ListDesign>
          <ListDesign>
            <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 mb-3">
              Contact Us
            </span>
            <p>
              For questions or concerns about these Terms, please contact us:
            </p>
            <p className="py-3">
              <span className="font-semibold text-black/75">Email:</span>{" "}
              <Link
                className="text-blue-500"
                href={"mailto:info@expatglobalgroup.com"}
              >
                info@expatglobalgroup.com
              </Link>
              .
            </p>
            <h5 className="font-semibold text-black/75">
              Mailing Address: B&B Global Ventures, LLC.
            </h5>
            <div className="pl-10 pt-5">
              <p>945 McKinney St., Suite 11891, Houston, Texas, 77002 USA</p>
            </div>
          </ListDesign>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndCondition;
