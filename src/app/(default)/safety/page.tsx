// pages/safety-disclaimer.tsx

import HeaderWithBorder from "@/components/home/PageReusable/HeaderWithBorder";
import Link from "next/link";

const SafetyDisclaimer = () => {
  return (
    <div className="container  py-10  mt-[100px]">
      <div className=" mx-auto  rounded-lg  p-6 mb-3">
        {/* <p className="w-full text-center py-2">
          Excerpts from “Privacy Policy” and “Terms & Conditions”
        </p> */}
        <div className="flex justify-center items-center flex-col gap-3 pb-3">
          <h2 className="text-[#263238] font-sans text-lg md:text-3xl text-center font-bold mt-4">
            Safety Disclaimer
          </h2>
          <h1 className=" md:text-xl text-lg  text-center">
            <span className="font-bold text-black/75 ">Effective Date:</span>{" "}
            December 1, 2024
          </h1>
          <p className="text-black/75 text-center font-bold">
            Privacy Policy for B&B Global Ventures, LLC
          </p>
        </div>

        <p className="mb-5">Excerpts from “Privacy Policy” and “Terms & Conditions”:</p>

        <div className="space-y-6 ">
          {/* Introduction */}
          <p className="text-gray-700 pb-5">
            <span className="font-bold">B&B Global Ventures</span>, LLC (“we,”
            “our,” or “us”) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website,
            <Link
              className="text-blue-500"
              href={"mailto:www.ExpatGlobalGroup.com"}
            >
              www.ExpatGlobalGroup.com
            </Link>{" "}
            (the “Website”), and engage with our services. It also outlines your
            rights regarding your personal information under applicable laws,
            including the General Data Protection Regulation (GDPR) and the
            California Consumer Privacy Act (CCPA).
          </p>

          {/* Disclosure of Your Personal Data */}
          <div>
            <HeaderWithBorder text="Disclosure of Your Personal Data"></HeaderWithBorder>
            <ul className="space-y-4 list-disc md:pl-6 pl-2">
              <li className="flex items-start">
                <span className="text-gray-700">
                  <strong>Business Transactions:</strong> If the Company is
                  involved in a merger, acquisition, or asset sale, Your
                  Personal Data may be transferred. We will provide notice
                  before Your Personal Data is transferred and becomes subject
                  to a different Privacy Policy.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-700">
                  <strong>Law enforcement:</strong> Under certain circumstances,
                  the Company may be required to disclose Your Personal Data if
                  required to do so by law or in response to valid requests by
                  public authorities (e.g., a court or a government agency).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-700">
                  <strong>Other legal requirements:</strong> The Company may
                  disclose Your Personal Data in the good faith belief that such
                  action is necessary to:
                  <ul className="list-disc ml-8 mt-2 space-y-2 text-gray-700">
                    <li>Comply with a legal obligation.</li>
                    <li>
                      Protect and defend the rights or property of the Company.
                    </li>
                    <li>
                      Prevent or investigate possible wrongdoing in connection
                      with the Service.
                    </li>
                    <li>
                      Protect the personal safety of Users of the Service or the
                      public.
                    </li>
                  </ul>
                </span>
              </li>
            </ul>
          </div>

          {/* Eligibility */}

          <p className="text-gray-700 ml-3">
            This Website and its associated services are open to all individuals who meet the eligibility criteria, regardless of gender. By registering for an account, you confirm that you meet these criteria and agree to respect the inclusive nature of the platform. We are committed to fostering a safe, supportive, and respectful environment for all users.
          </p>
        </div>

        {/* Limitation of Liability */}
        <ul className="space-y-4 list-disc md:pl-6 pl-2">
          <li className="text-gray-700 ">
            B&B Global Ventures, LLC provides a platform to connect users and
            members and does not guarantee the accuracy, reliability, or safety
            of user interactions.
          </li>
          <li>
            Users are solely responsible for their interactions and arrangements
            with other members.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyDisclaimer;
