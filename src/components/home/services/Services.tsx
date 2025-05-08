"use client";

import React, { useEffect } from "react";
import HeaderWithoutBorder from "../PageReusable/HeaderWithoutBorder";


const Services = () => {
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
    <div className="mx-auto px-4 mt-[160px] container  py-5 rounded-xl overflow-hidden">
      <div className="flex justify-center items-center">
        <h1 className="mb-4 text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 border-b w-max pb-1">
          Our Services
        </h1>
      </div>
      <p className="mb-8 text-center text-sm sm:text-lg lg:text-xl text-gray-800 mt-[24px]">
        Explore the various services we offer to make your relocation experience
        smoother.
      </p>

      {/* Counseling & Assessments */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Counseling & Assessments" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>Cultural Exchange & Social Networking</p>
          <p>
            Expat Communities: Connecting with other expats for social,
            professional, or emotional support.
          </p>
          <p>
            Social Clubs/Activities: Information on social events, clubs, and
            activities for newcomers to integrate into the local community.
          </p>
        </div>
      </section>

      {/* Education & Childcare */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Education & Childcare" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            School & University Enrollment: Assistance with finding and
            enrolling children in local schools or international institutions.
          </p>
          <p>
            Tutoring Services: Language courses or tutoring for children and
            adults to ease the transition.
          </p>
          <p>
            Childcare Services: Help with finding nannies, daycare centers, or
            after-school programs.
          </p>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Emergency Services" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Emergency Evacuation Plans: Arrangements for evacuation in case of a
            political crisis, natural disaster, or personal emergency.
          </p>
          <p>
            24/7 Support Services: Access to assistance in case of an emergency,
            such as lost passports, accidents, or illness.
          </p>
        </div>
      </section>

      {/* Financial & Tax Services */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Financial & Tax Services" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Currency Exchange & Bank Accounts: Opening local bank accounts and
            handling money exchange.
          </p>
          <p>
            Tax Consultation: Guidance on local tax laws, filing requirements,
            and tax treaties.
          </p>
          <p>
            International Money Transfers: Services for transferring money
            across borders with favorable rates.
          </p>
          <p>
            Insurance: Health, life, and property insurance tailored to expats
            or travelers.
          </p>
          <p>
            Pension Planning: Advice on how to handle pensions and retirement
            savings when abroad.
          </p>
        </div>
      </section>

      {/* Healthcare and Insurance */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Healthcare and Insurance" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            International Health Insurance: Coverage for medical emergencies,
            treatments, and hospital stays abroad.
          </p>
          <p>
            Local Healthcare Registration: Help with registering for public
            health services (if applicable).
          </p>
          <p>
            Medical Records Transfer: Assistance with transferring medical
            records to new healthcare providers.
          </p>
        </div>
      </section>

      {/* Language & Cultural Integration */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Language & Cultural Integration" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Language Classes: Language courses or tutoring to help individuals
            adapt to their new environment.
          </p>
          <p>
            Cultural Training: Orientation programs or workshops to learn about
            local customs, etiquette, and traditions.
          </p>
          <p>
            Translation Services: Help with translating documents, contracts,
            and communications in the local language.
          </p>
        </div>
      </section>

      {/* Legal Services */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Legal Services" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Contract & Agreement Reviews: Legal advice on employment contracts,
            lease agreements, or local laws.
          </p>
          <p>
            Notary Services: Required for official documents such as wills,
            contracts, or property purchases.
          </p>
          <p>
            Dispute Resolution: Services for handling legal disputes in the new
            country, including labor or housing issues.
          </p>
        </div>
      </section>

      {/* Professional Services */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Professional Services" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Career Counseling: Help finding job opportunities or career advice
            tailored to the new country.
          </p>
          <p>
            Business Consulting: Services for those starting a business or
            looking for professional opportunities abroad.
          </p>
          <p>
            Networking Events: Connecting with local expat communities,
            professional groups, or social clubs.
          </p>
        </div>
      </section>

      {/* Relocation Services */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Relocation Services" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Housing & Accommodation Search: Assistance with finding housing and
            negotiating leases.
          </p>
          <p>
            Moving & Logistics: Help with moving personal belongings to the new
            country.
          </p>
          <p>
            Settling-In Assistance: Support with local orientation, such as
            setting up utilities, registering at the local authorities, etc.
          </p>
        </div>
      </section>

      {/* Screening Services */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Screening Services" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Background Checks: Comprehensive background screening for safety and
            security.
          </p>
          <p>
            Credit Screening: Assistance with understanding and managing credit
            reports.
          </p>
          <p>
            Tenant History Checks: Services to assess potential tenants for
            rental properties.
          </p>
        </div>
      </section>

      {/* Technology & Communication */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Technology & Communication" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            International SIM Cards: Mobile phone services that work across
            borders, including internet plans.
          </p>
          <p>
            Tech Setup: Services to help set up home or office internet, phone
            systems, and tech infrastructure.
          </p>
          <p>
            VPN and Security: Assistance with setting up secure communications
            and protecting online privacy.
          </p>
        </div>
      </section>

      {/* Travel & Transportation */}
      <section className="mb-8">
        <HeaderWithoutBorder text="Travel & Transportation" />
        <div className="text-sm sm:text-lg  mt-4">
          <p>
            Flight Booking and Travel Planning: Assistance with booking flights,
            arranging travel itineraries, and accommodation.
          </p>
          <p>
            Public Transportation Guidance: Help with understanding local public
            transit systems and purchasing passes.
          </p>
          <p>
            Vehicle Rentals & Leasing: Guidance for renting or leasing cars in
            the new location.
          </p>
          <p>
            Driving License Assistance: Support in obtaining a local driving
            license.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;
