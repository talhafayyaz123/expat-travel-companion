"use client";

import HeaderWithBorder from "@/components/home/PageReusable/HeaderWithBorder";
import HeaderWithoutBorder from "@/components/home/PageReusable/HeaderWithoutBorder";
import ListDesign from "@/components/home/PageReusable/ListDesign";
import UlContainer from "@/components/home/PageReusable/UlContainer";
import React, { useEffect } from "react";

const Liability = () => {
  useEffect(() => {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach((paragraph) => {
      if (!paragraph.classList.contains("leading-[1.7]")) {
        paragraph.classList.add("leading-[1.7]");
      }
    });
  }, []);
  return (
    <div className="container mx-auto mt-[166px]">
      <div className="flex justify-center items-center flex-col gap-3 pb-3">
        <h2 className="text-[#263238] font-sans text-lg md:text-3xl text-center font-bold mt-4">
        Liability Disclaimer
        </h2>
        <h1 className=" md:text-xl text-lg  text-center">
          <span className="font-bold text-black/75 ">Effective Date:</span>{" "}
          December 1, 2024
        </h1>
        <p className="text-black/75 text-center font-bold">
          Privacy Policy for B&B Global Ventures, LLC
        </p>
      </div>

      <p className="mb-5">Excerpts from “Privacy Policy” and “Terms & Conditions”</p>

      <p className="py-3">
        The Company will also retain Usage Data for internal analysis purposes.
        Usage Data is generally retained for a shorter period of time, except
        when this data is used to strengthen the security or to improve the
        functionality of Our Service, or We are legally obligated to retain this
        data for longer time periods.
      </p>

      <p>
        The Company may disclose Your Personal Data in the good faith belief
        that such action is necessary to:
      </p>
      <UlContainer>
        <ListDesign>
          <p className="pt-2">Protect against legal liability</p>
        </ListDesign>
      </UlContainer>

      {/*  */}
      <section>
        <HeaderWithBorder text="Links to Other Websites" />
        <p>
          Our Service may contain links to other websites that are not operated
          by Us. If You click on a third-party link, You will be directed to
          that third-party&apos;s site. We strongly advise You to review the
          Privacy Policy of every site You visit.
        </p>
        <p className="pt-2">
          We have no control over and assume no responsibility for the content,
          privacy policies, or practices of any third-party sites or services.
        </p>
      </section>

      {/*  */}
      <section>
        <HeaderWithoutBorder text="Services Provided" />
        <p>
          Our platform facilitates connections between individuals seeking
          travel companions and/or roommates for room and house sharing living arrangements, particularly for international relocations. While we verify user identity through photo
          ID and social media linking, we do not guarantee the accuracy,
          reliability, or suitability of any user, member, or match.
        </p>
      </section>

      {/*  */}
      <section className="py-3 ">
        <h3 className="text-lg pl-10 mb-3 font-semibold text-black/80">
          Access and Membership Responsibilities
        </h3>
        <p>
          Unless otherwise indicated, access to the Service is exclusively
          available to current, paying members. Your membership grants you the
          ability to access the Service and participate in related
          opportunities. We provide the platform and access, but the
          responsibility for participation and usage lies with the Member.
        </p>
        <p className="pt-2">
          Failure to attend, utilize, or access the Service does not absolve the
          Member of their payment obligations. Members are responsible for all
          payments incurred during their subscription period, regardless of
          whether they achieve their desired results or fully engage with the
          Service.
        </p>
      </section>
      {/*  */}
      <section className="py-3 ">
        <h3 className="text-lg pl-10 mb-3 font-semibold text-black/80">
          User Responsibilities
        </h3>
        <p>
          Your ability to access, participate in, and benefit from the Services
          depends on your compliance with the following requirements. Failure to
          meet these responsibilities may impair your experience, for which
          <span className="font-bold"> B&B Global Ventures, LLC</span>  assumes no liability.
        </p>
      </section>
      {/*  */}
      <section className="py-3 ">
        <h3 className="text-lg pl-10 mb-3 font-semibold text-black/80">
          Personal Effort
        </h3>
        <p>
          Your success in using the Service depends significantly on your active
          participation and personal commitment. To fully benefit from the
          Service, you must:
        </p>
        <UlContainer>
          <ListDesign>Implement the tools and guidance provided,</ListDesign>
          <ListDesign>
            Dedicate time and effort outside the platform to achieve your goals,
            and
          </ListDesign>
          <ListDesign>Request support from us when needed.,</ListDesign>
        </UlContainer>

        <p className="py-2">
          By agreeing to these Terms, you accept full responsibility for your
          engagement and participation, recognizing that your effort directly
          impacts the value derived from the Service.
        </p>
      </section>

      {/* ................. */}
      <section>
        <HeaderWithoutBorder text="Disclaimer of Warranties" />
        <UlContainer>
          <ListDesign>
            The Website and services are provided “as is” and “as available.”
          </ListDesign>
          <ListDesign>
            We disclaim all warranties, including those of merchantability,
            fitness for a particular purpose, and non-infringement.
          </ListDesign>
        </UlContainer>
      </section>

      {/* .............. */}

      <section>
        <HeaderWithoutBorder text="c. Indemnification"></HeaderWithoutBorder>
        <p>
          You agree to indemnify and hold harmless B&B Global Ventures, LLC, its
          employees, and affiliates from any claims arising from your use of the
          Website or interactions with other members.
        </p>
      </section>
    </div>
  );
};

export default Liability;
