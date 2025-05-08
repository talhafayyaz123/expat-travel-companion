"use client";
import HeaderWithBorder from "@/components/home/PageReusable/HeaderWithBorder";
import HeaderWithoutBorder from "@/components/home/PageReusable/HeaderWithoutBorder";
import ListDesign from "@/components/home/PageReusable/ListDesign";
import UlContainer from "@/components/home/PageReusable/UlContainer";
import Link from "next/link";
import { useEffect } from "react";

const PrivacyAndPolicy = () => {
  useEffect(() => {
    const paragraphs = document.querySelectorAll("p");

    paragraphs.forEach((paragraph) => {
      if (!paragraph.classList.contains("leading-[1.7]")) {
        paragraph.classList.add("leading-[1.7]");
      }
    });
  }, []);
  const getDayWithSuffix = (day: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const mod10 = day % 10;
    const mod100 = day % 100;

    if (mod10 === 1 && mod100 !== 11) return `${day}${suffixes[1]}`;
    if (mod10 === 2 && mod100 !== 12) return `${day}${suffixes[2]}`;
    if (mod10 === 3 && mod100 !== 13) return `${day}${suffixes[3]}`;
    return `${day}${suffixes[0]}`;
  };

  const currentDate = new Date();
  const day = getDayWithSuffix(currentDate.getDate());
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;
  return (
    <div className="container mx-auto px-4 mt-[160px] overflow-hidden">
      <div className="flex justify-center items-center flex-col gap-3">
        <h2 className="text-[#263238] font-sans text-lg md:text-3xl text-center font-bold ">
          Privacy Policy
        </h2>
        <h2 className=" md:text-md text-lg text-center mt-2">
          <span className="font-bold text-black/75">Effective Date:</span>{" "}
          December 1, 2024
        </h2>
        <h2 className=" md:text-md text-lg text-center mt-2">
          <span className="font-bold text-black/75 ">Last Updated:</span> April
          22, 2025
        </h2>
        <h2 className="md:text-md text-lg text-center mt-2">
          <span className="font-bold text-black/75 ">
            Privacy Policy for B&B Global Ventures, LLC., d/b/a Expat Global
            Group™
          </span>
        </h2>
      </div>
      <div className="">
        <div className="max-w-5xl mx-auto p-6 ">
          <section className="mb-8">
            <p className="mb-4">
              <span className="text-black font-semibold">
                B&B Global Ventures, LLC
              </span>{" "}
              we our or us is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website{" "}
              <a
                href="https://www.ExpatGlobalGroup.com"
                className="text-blue-500 underline"
              >
                www.ExpatGlobalGroup.com
              </a>{" "}
              (the “Website”), and engage with our services. It also outlines
              your rights regarding your personal information under applicable
              laws, including the General Data Protection Regulation (GDPR) and
              the California Consumer Privacy Act (CCPA).
            </p>
            <p>
              By accessing or using our Website, you agree to the practices
              outlined in this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="md:text-md text-lg text-center mt-2 font-bold text-black/75 underline">
              1. B&B GLOBAL VENTURES, LLC PRIVACY POLICY.
            </h2>

            <h2 className="md:text-md text-md text-start mt-2 font-bold text-black/75 underline">
              Interpretation and Definitions
            </h2>

            <h3 className="text-md mb-2 mt-2">Interpretation</h3>
            <p className="mb-4">
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <h3 className="text-md mb-2 mt-2">Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul className="space-y-4 list-disc md:pl-6 pl-2 mt-2">
              <li className="ml-6">
                "Account" means a unique account created for You to access our
                Service or parts of our Service.
              </li>
              <li className="ml-6">
                "Business", for the purpose of the CCPA (California Consumer
                Privacy Act), refers to the Company as the legal entity that
                collects Consumers' personal information and determines the
                purposes and means of the processing of Consumers' personal
                information, or on behalf of which such information is collected
                and that alone, or jointly with others, determines the purposes
                and means of the processing of consumers' personal information,
                that does business in the State of California.
              </li>
              <li className="ml-6">
                "Company" (referred to as either "the Company", "We", "Us" or
                "Our" in this Agreement) refers to B&B Global Ventures, LLC.
              </li>
              <span className="block mt-1">
                For the purpose of the GDPR, the Company is the Data Controller.
              </span>
              <li className="ml-6">
                "Country" refers to THE UNITED STATES OF AMERICA.
              </li>
              <li className="ml-6">
                "Consumer", for the purpose of the CCPA (California Consumer
                Privacy Act), means a natural person who is a California
                resident. A resident, as defined in the law, includes (1) every
                individual who is in the USA for other than a temporary or
                transitory purpose, and (2) every individual who is domiciled in
                the USA who is outside the USA for a temporary or transitory
                purpose.
              </li>
              <li className="ml-6">
                "Cookies" are small files that are placed on Your computer,
                mobile device, or any other device by a website, containing the
                details of Your browsing history on that website among its many
                uses.
              </li>
              <li className="ml-6">
                "Data Controller", for the purposes of the GDPR (General Data
                Protection Regulation), refers to the Company as the legal
                person which alone or jointly with others determines the
                purposes and means of the processing of Personal Data.
              </li>
              <li className="ml-6">
                "Device" means any device that can access the Service such as a
                computer, a cell phone, or a digital tablet.
              </li>
              <li className="ml-6">
                "Do Not Track (DNT is a concept that has been promoted by US
                regulatory authorities, in particular the U.S. Federal Trade
                Commission (FTC), for the Internet industry to develop and
                implement a mechanism for allowing Internet users to control the
                tracking of their online activities across websites. • "Personal
                Data" is any information that relates to an identified or
                identifiable individual.
              </li>
              <li className="ml-6">
                "Personal Data" is any information that relates to an identified
                or identifiable individual.
              </li>
            </ul>
          </section>

          <p className="pb-5">
            For the purposes of GDPR, Personal Data means any information
            relating to You such as a name, an identification number, location
            data, online identifier, or to one or more factors specific to the
            physical, physiological, genetic, mental, economic, cultural or
            social identity.
          </p>
          <p>
            For the purposes of the CCPA, Personal Data means any information
            that identifies, relates to, describes, or is capable of being
            associated with, or could reasonably be linked, directly or
            indirectly, with You.
          </p>

          <UlContainer>
            <ListDesign>
              <p className="pb-3">
                "Sale", for the purpose of the CCPA (California Consumer Privacy
                Act), means selling, renting, releasing, disclosing,
                disseminating, making available, transferring, or otherwise
                communicating orally, in writing, or by electronic or other
                means, a Consumer's personal information to another business or
                a third party for monetary or other valuable consideration.
              </p>
            </ListDesign>
            <ListDesign>
              {" "}
              <p className="pb-3">"Service" refers to the Website.</p>
            </ListDesign>
            <ListDesign>
              <p className="pb-3">
                "Service Provider" means any natural or legal person who
                processes the data on behalf of the Company. It refers to
                third-party companies or individuals employed by the Company to
                facilitate the Service, to provide the Service on behalf of the
                Company, to perform services related to the Service, or to
                assist the Company in analyzing how the Service is used.
              </p>
            </ListDesign>
          </UlContainer>

          {/* ................  */}
          <p className="pb-3">
            For the purpose of the GDPR, Service Providers are considered Data
            Processors.
          </p>

          <UlContainer>
            <ListDesign>
              <p className="pb-3">
                "Usage Data" refers to data collected automatically, either
                generated by the use of the Service or from the Service
                infrastructure itself (for example, the duration of a page
                visit).
              </p>
            </ListDesign>
            <ListDesign>
              {" "}
              <p className="pb-3">
                "Website" refers to <strong>B&B Global Ventures</strong>, LLC,
                WEBSITE, accessible from
                <Link
                  href={"www.ExpatGlobalGroup.com"}
                  className="text-blue-500"
                >
                  {` www.ExpatGlobalGroup.com`}
                </Link>
              </p>
            </ListDesign>
            <ListDesign>
              <p className="pb-3">
                "You" means the individual accessing or using the Service, or
                the company, or other legal entity on behalf of which such
                individual is accessing or using the Service, as applicable.
              </p>
            </ListDesign>
          </UlContainer>

          <p className="pb-3">
            Under GDPR (General Data Protection Regulation), You can be referred
            to as the Data Subject or as the User as you are the individual
            using the Service.
          </p>

          {/* .............................. */}

          <section className="mb-8">
            <h2 className="md:text-md text-lg text-start mt-2 font-bold text-black/75 underline">
              Collecting and Using Your Personal Data
            </h2>
            <h3 className=" mb-2 mt-2">Types of Data Collected</h3>
            <UlContainer>
              <ListDesign>
                <span className="md:text-md text-lg text-start mt-2 font-bold text-black/75 underline">
                  Personal Data
                </span>
                <p className="mb-4 mt-2">
                  While using Our Service, we may ask You to provide Us with
                  certain personally identifiable information that can be used
                  to contact or identify You. Personally, identifiable
                  information may include, but is not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li className="ml-6">Email address</li>
                  <li className="ml-6">First name and last name</li>
                  <li className="ml-6">Phone number</li>
                  <li className="ml-6">
                    Address, State, Province, ZIP/Postal code, City
                  </li>
                  <li className="ml-6">Usage Data</li>
                </ul>
              </ListDesign>
              <ListDesign>
                <span className="md:text-md text-md text-start mt-2 font-bold text-black/75 underline">
                  Usage Data
                </span>
                <p className="mb-4 mt-2">
                  Usage Data is collected automatically when using the Service.
                  <br />
                  <br />
                  Usage Data may include information such as Your Device's
                  Internet Protocol address (e.g. IP address), browser type,
                  browser version, the pages of our Service that You visit, the
                  time and date of Your visit, the time spent on those pages,
                  unique device identifiers and other diagnostic data.
                  <br />
                  <br /> When You access the Service by or through a mobile
                  device, We may collect certain information automatically,
                  including, but not limited to, the type of mobile device You
                  use, Your mobile device's unique ID, the IP address of Your
                  mobile device, Your mobile operating system, the type of
                  mobile Internet browser You use, unique device identifiers and
                  other diagnostic data.
                  <br />
                  <br /> We may also collect information that Your browser sends
                  whenever You visit our Service or when You access the Service
                  by or through a mobile device.
                </p>

                <ul className="list-disc list-inside space-y-2">
                  <h2 className="md:text-md text-md text-start mt-2 font-bold text-black/75 underline">
                    Tracking Technologies and Cookies
                  </h2>
                  <p className="mb-4">
                    We use Cookies and similar tracking technologies to track
                    the activity on Our Service and store certain information.
                    Tracking technologies used are beacons, tags, and scripts to
                    collect and track information and to improve and analyze Our
                    Service. The technologies We use may include:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li className="ml-6">
                      Cookies or Browser Cookies. A cookie is a small file
                      placed on Your Device. You can instruct Your browser to
                      refuse all Cookies or to indicate when a Cookie is being
                      sent. However, if You do not accept Cookies, You may not
                      be able to use some parts of our Service. Unless you have
                      adjusted Your browser setting so that it will refuse
                      Cookies, our Service may use Cookies.
                    </li>
                    <li className="ml-6">
                      Web Beacons. Certain sections of our Service and our
                      emails may contain small electronic files known as web
                      beacons (also referred to as clear gifs, pixel tags, and
                      single-pixel gifs) that permit the Company, for example,
                      to count users who have visited those pages or opened an
                      email and for other related website statistics (for
                      example, recording the popularity of a certain section and
                      verifying system and server integrity).
                    </li>
                    <p>
                      Cookies can be "Persistent" or "Session" Cookies.
                      Persistent Cookies remain on Your personal computer or
                      mobile device when You go offline, while Session Cookies
                      are deleted as soon as You close Your web browser.
                      <br />
                      <br />
                    </p>
                    <ul className="list-inside space-y-2">
                      <li className="ml-6">
                        <span className="font-semibold text-black/75">
                          Necessary / Essential Cookies
                        </span>
                        <div className="">
                          <p className="py-3">
                            Type: Session Cookies Administered by: Us
                          </p>

                          <p>
                            Purpose: These Cookies are essential to provide You
                            with services available through the Website and to
                            enable You to use some of its features. They help to
                            authenticate users and prevent fraudulent use of
                            user accounts. Without these Cookies, the services
                            that You have asked for cannot be provided, and We
                            only use these Cookies to provide You with those
                            services.
                          </p>
                        </div>
                      </li>
                      <li className="ml-6">
                        <span className="font-semibold text-black/75">
                          Cookies Policy / Notice Acceptance Cookies
                        </span>
                        <div className="">
                          <p className="py-3">
                            Type: Persistent Cookies Administered by: Us
                          </p>

                          <p>
                            Purpose: These Cookies identify if users have
                            accepted the use of cookies on the Website.
                          </p>
                        </div>
                      </li>
                      <li className="ml-6">
                        <span className="font-semibold text-black/75">
                          Functionality Cookies
                        </span>
                        <div className="">
                          <p className="py-3">
                            Type: Persistent Cookies Administered by: Us
                          </p>

                          <p>
                            Purpose: These Cookies allow us to remember choices
                            You make when You use the Website, such as
                            remembering your login details or language
                            preference. The purpose of these Cookies is to
                            provide You with a more personal experience and to
                            avoid You having to re-enter your preferences every
                            time You use the Website.
                          </p>
                        </div>
                      </li>
                      <li className="ml-6">
                        <span className="font-semibold text-black/75">
                          Tracking and Performance Cookies
                        </span>
                        <div className="">
                          <p className="py-3">
                            Type: Persistent Cookies Administered by:
                            Third-Parties
                          </p>

                          <p>
                            Purpose: These Cookies are used to track information
                            about traffic to the Website and how users use the
                            Website. The information gathered via these Cookies
                            may directly or indirectly identify you as an
                            individual visitor. This is because the information
                            collected is typically linked to a pseudonymous
                            identifier associated with the device you use to
                            access the Website. We may also use these Cookies to
                            test new pages, features, or new functionality of
                            the Website to see how our users react to them.
                          </p>
                        </div>
                      </li>
                      <p>
                        For more information about the cookies we use and your
                        choices regarding cookies, please visit our Cookies
                        Policy or the Cookies section of our Privacy Policy.
                      </p>
                    </ul>
                  </ul>
                </ul>
              </ListDesign>
            </UlContainer>
          </section>

          <section className="mb-8">
            <h2 className="text-md font-semibold mb-4 underline w-max">
              Use of Your Personal Data
            </h2>

            <h3 className=" mb-3">
              The Company may use Personal Data for the following purposes:
            </h3>
            <UlContainer>
              <ListDesign>
                To provide and maintain our Service, including to monitor the
                usage of our Service.
              </ListDesign>
              <ListDesign>
                To manage Your Account: to manage Your registration as a user of
                the Service. The Personal Data You provide can give You access
                to different functionalities of the Service that are available
                to You as a registered user.
              </ListDesign>
              <ListDesign>
                For the performance of a contract: the development, compliance,
                and undertaking of the purchase contract for the products,
                items, or services You have purchased or of any other contract
                with Us through the Service.
              </ListDesign>
              <ListDesign>
                To contact You: To contact You by email, telephone calls, SMS,
                or other equivalent forms of electronic communication, such as a
                mobile application's push notifications regarding updates or
                informative communications related to the functionalities,
                products, or contracted services, including the security
                updates, when necessary or reasonable for their implementation.
              </ListDesign>
              <ListDesign>
                To provide You with news, special offers, and general
                information about other goods, services, and events which we
                offer that are similar to those that you have already purchased
                or inquired about unless You have opted not to receive such
                information.
              </ListDesign>
              <ListDesign>
                To manage Your requests: To attend and manage Your requests to
                Us.
              </ListDesign>
              <ListDesign>
                For business transfers: We may use Your information to evaluate
                or conduct a merger, divestiture, restructuring, reorganization,
                dissolution, or other sale or transfer of some or all of Our
                assets, whether as a going concern or as part of bankruptcy,
                liquidation, or similar proceeding, in which Personal Data held
                by Us about our Service Users is among the assets transferred.
              </ListDesign>
              <ListDesign>
                For other purposes: We may use Your information for other
                purposes, such as data analysis, identifying usage trends,
                determining the effectiveness of our promotional campaigns, and
                to evaluate and improve our Service, products, services,
                marketing, and your experience.
              </ListDesign>
            </UlContainer>

            <p className="my-3">
              We may share Your personal information in the following
              situations:
            </p>
            <UlContainer>
              <ListDesign>
                With Service Providers: We may share Your personal information
                with Service Providers to monitor and analyze the use of our
                Service, for payment processing, to contact You.
              </ListDesign>
              <ListDesign>
                For business transfers: We may share or transfer Your personal
                information in connection with, or during negotiations of, any
                merger, sale of Company assets, financing, or acquisition of all
                or a portion of Our business to another company.
              </ListDesign>
              <ListDesign>
                With Affiliates: We may share Your information with Our
                affiliates, in which case we will require those affiliates to
                honor this Privacy Policy. Affiliates include Our parent company
                and any other subsidiaries, joint venture partners, or other
                companies that We control or that are under common control with
                Us.
              </ListDesign>
              <ListDesign>
                With business partners: We may share Your information with Our
                business partners to offer You certain products, services, or
                promotions.
              </ListDesign>
              <ListDesign>
                With other users: when You share personal information or
                otherwise interact in the public areas with other users, such
                information may be viewed by all users and may run the risk of
                being publicly distributed outside.
              </ListDesign>
              <ListDesign>
                With Your consent: We may disclose Your personal information for
                any other purpose with Your consent.
              </ListDesign>
            </UlContainer>
          </section>

          {/* .......................... */}

          <section>
            <h2 className="text-md font-semibold mb-4 underline w-max">
              Retention of Your Personal Data
            </h2>
            <p>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </p>
            <p className="pt-3">
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </p>
          </section>

          {/* ............ */}

          <section>
            <h2 className="text-md font-semibold mb-4 underline w-max mt-6">
              Transfer of Your Personal Data
            </h2>
            <p className="pb-3">
              Your information, including Personal Data, is processed at the
              Company's operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country, or other
              governmental jurisdiction where the data protection laws may
              differ from those from Your jurisdiction.
            </p>
            <p className="pb-3">
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </p>
            <p>
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </p>
          </section>
          <section>
            <h2 className="text-md font-semibold mb-4 underline w-max mt-6">
              Disclosure of Your Personal Data
            </h2>
            <UlContainer>
              <ListDesign>
                <h3 className="font-semibold w-max mb-3 text-black/75 underline">
                  Business Transactions
                </h3>

                <p>
                  If the Company is involved in a merger, acquisition, or asset
                  sale, Your Personal Data may be transferred. We will provide
                  notice before Your Personal Data is transferred and becomes
                  subject to a different Privacy Policy.
                </p>
              </ListDesign>
              <ListDesign>
                <h3 className="pt-3 font-semibold w-max mb-3 text-black/75 underline">
                  Law enforcement
                </h3>

                <p>
                  Under certain circumstances, the Company may be required to
                  disclose Your Personal Data if required to do so by law or in
                  response to valid requests by public authorities (e.g. a court
                  or a government agency).
                </p>
              </ListDesign>
              <ListDesign>
                <h3 className="pt-3 font-semibold w-max mb-3 text-black/75 underline">
                  Other legal requirements
                </h3>

                <div>
                  The Company may disclose Your Personal Data in the good faith
                  belief that such action is necessary to:
                  <span className="block mt-4"></span>
                  <UlContainer>
                    <ListDesign>
                      <p>Comply with a legal obligation.</p>
                    </ListDesign>
                    <ListDesign>
                      <p>
                        Protect and defend the rights or property of the
                        Company.
                      </p>
                    </ListDesign>
                    <ListDesign>
                      <p>
                        Prevent or investigate possible wrongdoing in connection
                        with the Service.
                      </p>
                    </ListDesign>
                    <ListDesign>
                      <p>
                        Protect the personal safety of Users of the Service or
                        the public.
                      </p>
                    </ListDesign>
                    <ListDesign>
                      <p>Protect against legal liability.</p>
                    </ListDesign>
                  </UlContainer>
                </div>
              </ListDesign>
              <ListDesign>
                <h3 className="pt-3 font-semibold w-max mb-3 text-black/75 underline">
                  Security of Your Personal Data
                </h3>

                <p>
                  The security of Your Personal Data is important to us, but
                  remember that no method of transmission over the Internet, or
                  method of electronic storage is 100% secure. While we strive
                  to use commercially acceptable means to protect Your Personal
                  Data, We cannot guarantee its absolute security.
                </p>
              </ListDesign>
            </UlContainer>
          </section>
          <section className="mt-5">
            <p className="font-semibold pb-3">
              Detailed Information on the Processing of Your Personal Data:
            </p>
            <p>
              The Service Providers We use may have access to Your Personal
              Data. These third-party vendors collect, store, use, process, and
              transfer information about your activity on Our Service in
              accordance with their Privacy Policies.
            </p>

            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 underline mt-6">
                Analytics
              </h2>
              <p>
                We may use third-party Service providers to monitor and analyze
                the use of our Service. [LIST]
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 underline mt-6">
                Email Marketing
              </h2>
              <p>
                We may use Your Personal Data to contact You with newsletters,
                marketing or promotional materials, and other information that
                may be of interest to You. You may opt-out of receiving any, or
                all, of these communications from Us by following the
                unsubscribe link or instructions provided in any email We send
                or by contacting Us.
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 underline mt-6">
                Payments
              </h2>
              <p>
                We may offer paid products and services as part of the Service.
                Payment processing for these transactions will be handled
                exclusively by third-party platforms, including Stripe.
              </p>
              <p className="my-3">
                We do not store or collect payment card details. All payment
                information is provided directly to third-party payment
                processors, such as Stripe, whose use of your personal
                information is governed by their respective Privacy Policies.
                These processors comply with the Payment Card Industry Data
                Security Standard (PCI-DSS), which is maintained by the PCI
                Security Standards Council, a collaboration of brands like Visa,
                Mastercard, American Express, and Discover. PCI-DSS compliance
                ensures the secure handling of payment information.
              </p>
              <p>
                For more information about Stripe’s data practices, please refer
                to their Privacy Policy.
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 underline mt-6">
                GDPR Privacy Policy
              </h2>
              <p>Legal Basis for Processing Personal Data under GDPR</p>
              <p className="my-2">
                We may process Personal Data under the following conditions:
              </p>
              <UlContainer>
                <ListDesign>
                  <p>
                    Consent: You have given your consent for processing Personal
                    Data for one or more specific purposes.
                  </p>
                </ListDesign>
                <ListDesign>
                  <p>
                    Performance of a contract: Provision of Personal Data is
                    necessary for the performance of an agreement with you
                    and/or for any pre-contractual obligations thereof.
                  </p>
                </ListDesign>
                <ListDesign>
                  <p>
                    Legal obligations: Processing Personal Data is necessary for
                    compliance with a legal obligation to which the Company is
                    subject.
                  </p>
                </ListDesign>
                <ListDesign>
                  <p>
                    Vital interests: Processing Personal Data is necessary in
                    order to protect your vital interests or those of another
                    natural person.
                  </p>
                </ListDesign>
                <ListDesign>
                  <p>
                    Public interests: Processing Personal Data is related to a
                    task that is carried out in the public interest or in the
                    exercise of official authority vested in the Company.
                  </p>
                </ListDesign>
                <ListDesign>
                  <p>
                    Legitimate interests: Processing Personal Data is necessary
                    for the purposes of the legitimate interests pursued by the
                    Company.
                  </p>
                </ListDesign>
              </UlContainer>
              <p className="mt-3">
                In any case, the Company will gladly help to clarify the
                specific legal basis that applies to the processing, and in
                particular, whether the provision of Personal Data is a
                statutory or contractual requirement, or a requirement necessary
                to enter into a contract.
              </p>
            </div>
          </section>

          <section className="">
            <h2 className="font-semibold w-max mb-3 text-black/75 underline mt-6">
              Your Rights under the GDPR
            </h2>

            <p>
              The Company undertakes to respect the confidentiality of Your
              Personal Data and to guarantee You can exercise Your rights.
            </p>
            <p className="my-3">
              You have the right under this Privacy Policy, and by law if You
              are within the EU, to:
            </p>
            <UlContainer>
              <ListDesign>
                <p>
                  Request access to Your Personal Data. The right to access,
                  update, or delete the information We have on You. Whenever
                  made possible, you can access, update, or request the deletion
                  of Your Personal Data directly within your account settings
                  section. If you are unable to perform these actions yourself,
                  please contact us to assist You. This also enables you to
                  receive a copy of the Personal Data We hold about You.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Request correction of the Personal Data that we hold about
                  you. You have the right to have any incomplete or inaccurate
                  information we hold about you corrected.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Object to processing of Your Personal Data. This right exists
                  where We are relying on a legitimate interest as the legal
                  basis for Our processing and there is something about Your
                  particular situation, which makes You want to object to our
                  processing of Your Personal Data on this ground. You also have
                  the right to object where We are processing Your Personal Data
                  for direct marketing purposes.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Request the erasure of Your Personal Data. You have the right
                  to ask Us to delete or remove Personal Data when there is no
                  good reason for Us to continue processing it.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Request the transfer of Your Personal Data. We will provide to
                  You, or to a third party You have chosen, Your Personal Data
                  in a structured, commonly used, machine-readable format.
                  Please note that this right only applies to automated
                  information that You initially provided consent for Us to use
                  or where We used the information to perform a contract with
                  You.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Withdraw Your consent. You have the right to withdraw Your
                  consent to use your Personal Data. If You withdraw Your
                  consent, We may not be able to provide You with access to
                  certain specific functionalities of the Service.
                </p>
              </ListDesign>
            </UlContainer>
          </section>

          {/* .................. */}
          <section className="my-5">
            <h2 className="font-semibold w-max mb-3 text-black/75 underline mt-6">
              CCPA Privacy Policy
            </h2>
            <p>
              This privacy notice section for California residents supplements
              the information contained in Our Privacy Policy and it applies
              solely to all visitors, users, and others who reside in the State
              of California.
            </p>
            <h2 className="w-max border-b border-b-black/75 my-3">
              Categories of Personal Information Collected
            </h2>
            <p>
              We collect information that identifies, relates to, describes,
              references, is capable of being associated with, or could
              reasonably be linked, directly or indirectly, with a particular
              Consumer or Device. The following is a list of categories of
              personal information that we may collect or may have been
              collected from California residents within the last twelve (12)
              months.
            </p>
            <p>
              Please note that the categories and examples provided in the list
              below are those defined in the CCPA. This does not mean that all
              examples of that category of personal information were in fact
              collected by Us, but reflects our good faith belief to the best of
              our knowledge that some of that information from the applicable
              category may be and may have been collected. For example, certain
              categories of personal information would only be collected if You
              provided such personal information directly to Us.
            </p>

            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category A: Identifiers.
              </h2>
              <p className="pb-2">
                Examples: A real name, alias, postal address, unique personal
                identifier, online identifier, Internet Protocol address, email
                address, account name, driver's license number, passport number,
                or other similar identifiers.
              </p>
              <p>Collected: Yes.</p>
            </div>

            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category B: Personal information categories listed in the
                California Customer Records statute (Cal. Civ. Code § 1798.80(e.
              </h2>
              <p className="pb-2">
                Examples: A name, signature, Social Security number, physical
                characteristics or description, address, telephone number,
                passport number, driver's license or state identification card
                number, insurance policy number, education, employment,
                employment history, bank account number, credit card number,
                debit card number, or any other financial information, medical
                information, or health insurance information. Some personal
                information included in this category may overlap with other
                categories.
              </p>
              <p>Collected: Yes.</p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category C: Protected classification characteristics under
                California and Federal law.
              </h2>
              <p className="pb-2">
                Examples: Age (40 years or older), race, color, ancestry,
                national origin, citizenship, religion or creed, marital status,
                medical condition, physical or mental disability, sex (including
                gender, gender identity, gender expression, pregnancy or
                childbirth and related medical conditions), sexual orientation,
                veteran or military status, genetic information (including
                familial genetic information).
              </p>
              <p>Collected: Yes.</p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category D: Commercial information.
              </h2>
              <p className="pb-2">
                Examples: Records and history of products or services purchased
                or considered.
              </p>
              <p>Collected: Yes.</p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category E: Biometric information.
              </h2>
              <p className="pb-2">
                Examples: Genetic, physiological, behavioral, and biological
                characteristics, or activity patterns used to extract a template
                or other identifier or identifying information, such as
                fingerprints, faceprints, voiceprints, iris or retina scans,
                keystroke, gait, or other physical patterns, and sleep, health,
                or exercise data.
              </p>
              <p>Collected: No.</p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category F: Internet or other similar network activity.
              </h2>
              <p className="pb-2">
                Examples: Interaction with our Service or advertisement.
                Collected: Yes.
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category G: Geolocation data.
              </h2>
              <p className="pb-2">Examples: Approximate physical location.</p>
              <p>Collected: No.</p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category H: Sensory data.
              </h2>
              <p className="pb-2">
                Examples: Audio, electronic, visual, thermal, olfactory, or
                similar information.
              </p>
              <p>Collected: No.</p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category I: Professional or employment-related information.
              </h2>
              <p className="pb-2">
                Examples: Current or past job history or performance
                evaluations.
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold mb-3 text-black/75 mt-6">
                Category J: Non-public education information (per the Family
                Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34
                C.F.R. Part 99)).
              </h2>
              <p className="pb-2">
                Examples: Education records directly related to a student
                maintained by an educational institution or party acting on its
                behalf, such as grades, transcripts, class lists, student
                schedules, student identification codes, student financial
                information, or student disciplinary records.
              </p>
              <p>Collected: No.</p>
            </div>
            <div className="">
              <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
                Category K: Inferences drawn from other personal information.
              </h2>
              <p className="pb-2">
                Examples: Profile reflecting a person's preferences,
                characteristics, psychological trends, predispositions,
                behavior, attitudes, intelligence, abilities, and aptitudes.
              </p>
              <p>Collected: Yes.</p>
            </div>

            <p className="pb-3">
              Under CCPA, personal information does not include:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                <p>Publicly available information from government records</p>
              </ListDesign>
              <ListDesign>
                <p>Deidentified or aggregated consumer information</p>
              </ListDesign>
              <ListDesign>
                <p>Information excluded from the CCPA's scope, such as:</p>
              </ListDesign>
              <ListDesign>
                <p>
                  Health or medical information covered by the Health Insurance
                  Portability and Accountability Act of 1996 (HIPAA) and the
                  California Confidentiality of Medical Information Act (CMIA)
                  or clinical trial data
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Personal Information covered by certain sector-specific
                  privacy laws, including the Fair Credit Reporting Act (FRCA),
                  the Gramm-Leach-Bliley Act (GLBA) or California Financial
                  Information Privacy Act (FIPA), and the Driver's Privacy
                  Protection Act of 1994
                </p>
              </ListDesign>
            </UlContainer>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Sources of Personal Information
            </h2>
            <p>
              We obtain the categories of personal information listed above from
              the following categories of sources:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                <p>
                  Directly from You. For example, from the forms You complete on
                  our Service, preferences You express or provide through our
                  Service, or from Your purchases on our Service.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Indirectly from You. For example, from observing Your activity
                  on our Service.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Automatically from You. For example, through cookies We or our
                  Service Providers set on Your Device as You navigate through
                  our Service.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  From Service Providers. For example, third-party vendors to
                  monitor and analyze the use of our Service, third-party
                  vendors for payment processing, or other third-party vendors
                  that We use to provide the Service to You.
                </p>
              </ListDesign>
            </UlContainer>
          </section>
          {/* .............. */}

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Use of Personal Information for Business Purposes or Commercial
              Purposes:
            </h2>
            <p>
              We may use or disclose personal information We collect for
              "business purposes" or "commercial purposes" (as defined under the
              CCPA), which may include the following examples:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                <p>To operate our Service and provide You with our Service.</p>
              </ListDesign>
              <ListDesign>
                <p>For internal administrative and auditing purposes.</p>
              </ListDesign>
              <ListDesign>
                <p>
                  To provide You with support and to respond to Your inquiries,
                  including investigating and addressing Your concerns and
                  monitoring and improving our Service.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  To fulfill or meet the reason You provided the information.
                  For example, if You share Your contact information to ask a
                  question about our Service, We will use that personal
                  information to respond to Your inquiry. If You provide Your
                  personal information to purchase a product or service, We will
                  use that information to process Your payment and facilitate
                  delivery.
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  To respond to law enforcement requests and as required by
                  applicable law, court order, or governmental regulations
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  As described to You when collecting Your personal information
                  or as otherwise set forth in the CCPA.
                </p>
              </ListDesign>
              <ListDesign>
                <p>For internal administrative and auditing purposes.</p>
              </ListDesign>
              <ListDesign>
                <p>
                  To detect security incidents and protect against malicious,
                  deceptive, fraudulent, or illegal activity, including, when
                  necessary, to prosecute those responsible for such activities.
                </p>
              </ListDesign>
            </UlContainer>
            <p className="pb-2">
              Please note that the examples provided above are illustrative and
              not intended to be exhaustive. For more details on how we use this
              information, please refer to the "Use of Your Personal Data"
              section.
            </p>
            <p>
              If We decide to collect additional categories of personal
              information or use the personal information We collected for
              materially different, unrelated, or incompatible purposes We will
              update this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Disclosure of Personal Information for Business Purposes or
              Commercial Purposes:
            </h2>
            <p>
              We may use or disclose and may have used or disclosed in the last
              twelve (12) months the following categories of personal
              information for business or commercial purposes:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                <p>Category A: Identifiers</p>
              </ListDesign>
              <ListDesign>
                <p>
                  Category B: Personal information categories listed in the
                  California Customer Records statute (Cal. Civ. Code §
                  1798.80(e))
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Category C: Protected classification characteristics under
                  California and Federal law
                </p>
              </ListDesign>
              <ListDesign>
                <p>Category D: Commercial information.</p>
              </ListDesign>
              <ListDesign>
                <p>Category F: Internet or other similar network activity</p>
              </ListDesign>
            </UlContainer>
            <p className="pb-2">
              Please note that the categories listed above are those defined in
              the CCPA. This does not mean that all examples of that category of
              personal information were in fact disclosed, but reflects our good
              faith belief to the best of our knowledge that some of that
              information from the applicable category may be and may have been
              disclosed.
            </p>
            <p>
              When We disclose personal information for a business purpose or a
              commercial purpose, We enter a contract that describes the purpose
              and requires the recipient to both keep that personal information
              confidential and not use it for any purpose except performing the
              contract.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Sale of Personal Information:
            </h2>
            <p className="mb-3">
              As defined in the CCPA, "sell" and "sale" mean selling, renting,
              releasing, disclosing, disseminating, making available,
              transferring, or otherwise communicating orally, in writing, or by
              electronic or other means, a consumer's personal information by
              the business to a third party for valuable consideration. This
              means that We may have received some kind of benefit in return for
              sharing personal information, but not necessarily a monetary
              benefit.
            </p>
            <p className="mb-3">
              Please note that the categories listed below are those defined in
              the CCPA. This does not mean that all examples of that category of
              personal information were in fact sold, but reflects our good
              faith belief to the best of our knowledge that some of that
              information from the applicable category may be and may have been
              shared for value in return.
            </p>
            <p>
              We may sell and may have sold in the last twelve (12) months the
              following categories of personal information:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                <p>Category A: Identifiers</p>
              </ListDesign>
              <ListDesign>
                <p>
                  Category B: Personal information categories listed in the
                  California Customer Records statute (Cal. Civ. Code §
                  1798.80(e))
                </p>
              </ListDesign>
              <ListDesign>
                <p>
                  Category C: Protected classification characteristics under
                  California and Federal law
                </p>
              </ListDesign>
              <ListDesign>
                <p>Category D: Commercial information.</p>
              </ListDesign>
              <ListDesign>
                <p>Category F: Internet or other similar network activity</p>
              </ListDesign>
            </UlContainer>
            {/* <p className="pb-2">
              Please note that the categories listed above are those defined in
              the CCPA. This does not mean that all examples of that category of
              personal information were in fact disclosed, but reflects our good
              faith belief to the best of our knowledge that some of that
              information from the applicable category may be and may have been
              disclosed.
            </p>
            <p>
              When We disclose personal information for a business purpose or a
              commercial purpose, We enter a contract that describes the purpose
              and requires the recipient to both keep that personal information
              confidential and not use it for any purpose except performing the
              contract.
            </p> */}
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Share of Personal Information:
            </h2>
            <p>
              We may share your personal information identified in the above
              categories with the following categories of third parties:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                <p>Service Providers</p>
              </ListDesign>
              <ListDesign>
                <p>Payment processors</p>
              </ListDesign>
              <ListDesign>
                <p>Our affiliates</p>
              </ListDesign>
              <ListDesign>
                <p>Our business partners.</p>
              </ListDesign>
              <ListDesign>
                <p>
                  Third-party vendors to whom You or Your agents authorize Us to
                  disclose Your personal information in connection with products
                  or services We provide to You
                </p>
              </ListDesign>
            </UlContainer>
          </section>
          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Sale of Personal Information of Minors Under 16 Years of Age:
            </h2>

            <p className="pb-3">
              We do not knowingly collect personal information from minors under
              the age of 16 through our Service, although certain third party
              websites that we link to may do so. These third-party websites
              have their own terms of use and privacy policies and we encourage
              parents and legal guardians to monitor their children's Internet
              usage and instruct their children to never provide information on
              other websites without their permission.
            </p>

            <p className="pb-3">
              We do not sell the personal information of Consumers We actually
              know are less than 16 years of age, unless We receive affirmative
              authorization (the "right to opt-in") from either the Consumer who
              is between 13 and 16 years of age or the parent or guardian of a
              Consumer less than 13 years of age. Consumers who opt-in to the
              sale of personal information may opt out of future sales at any
              time. To exercise the right to opt out, You (or Your authorized
              representative) may submit a request to Us by contacting Us.
            </p>
            <p>
              If You have reason to believe that a child under the age of 13 (or
              16) has provided Us with personal information, please contact Us
              with sufficient detail to enable Us to delete that information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Your Rights under the CCPA
            </h2>
            <p>
              The CCPA provides California residents with specific rights
              regarding their personal information. If You are a resident of
              California, You have the following rights:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                <p>
                  The right to notice. You have the right to be notified which
                  categories of Personal Data are being collected and the
                  purposes for which the Personal Data is being used.
                </p>
              </ListDesign>
              <ListDesign>
                <div className="">
                  The right to request. Under CCPA, You have the right to
                  request that We disclose information to You about Our
                  collection, use, sale, disclosure for business purposes, and
                  share of personal information. Once We receive and confirm
                  Your request, We will disclose to You:
                  <ol className="pl-6 list-decimal">
                    <ListDesign>
                      <p>
                        The categories of personal information We collected
                        about You
                      </p>
                    </ListDesign>
                    <ListDesign>
                      <p>
                        The categories of sources for the personal information
                        We collected about You
                      </p>
                    </ListDesign>
                    <ListDesign>
                      <p>
                        Our business or commercial purpose for collecting or
                        selling that personal information
                      </p>
                    </ListDesign>
                    <ListDesign>
                      <p>
                        The categories of third parties with whom We share that
                        personal information
                      </p>
                    </ListDesign>
                    <ListDesign>
                      The specific pieces of personal information We collected
                      about You
                    </ListDesign>
                    <ListDesign>
                      If we sold Your personal information or disclosed Your
                      personal information for a business purpose, We will
                      disclose to You:
                    </ListDesign>
                  </ol>
                  <ol className="list-[lower-alpha] list-inside">
                    <ListDesign>
                      The categories of personal information categories sold
                    </ListDesign>
                    <ListDesign>
                      The categories of personal information categories
                      disclosed
                    </ListDesign>
                    <ListDesign>
                      The right to say no to the sale of Personal Data
                      (opt-out). You have the right to direct Us to not sell
                      Your personal information. To submit an opt-out request
                      please contact Us.
                    </ListDesign>
                    <ListDesign>
                      The right to delete Personal Data. You have the right to
                      request the deletion of Your Personal Data, subject to
                      certain exceptions. Once We receive and confirm Your
                      request, We will delete (and direct Our Service Providers
                      to delete) Your personal information from our records,
                      unless an exception applies. We may deny Your deletion
                      request if retaining the information is necessary for Us
                      or Our Service Providers to:
                    </ListDesign>
                    <ListDesign>
                      Complete the transaction for which We collected the
                      personal information, provide a good or service that You
                      requested, take actions reasonably anticipated within the
                      context of our ongoing business relationship with You, or
                      otherwise perform our contract with You.
                    </ListDesign>
                    <ListDesign>
                      Detect security incidents, protect against malicious,
                      deceptive, fraudulent, or illegal activity, or prosecute
                      those responsible for such activities.
                    </ListDesign>
                    <ListDesign>
                      Debug products to identify and repair errors that impair
                      existing intended functionality.
                    </ListDesign>
                    <ListDesign>
                      Exercise free speech, ensure the right of another consumer
                      to exercise their free speech rights, or exercise another
                      right provided for by law.
                    </ListDesign>
                    <ListDesign>
                      Comply with the California Electronic Communications
                      Privacy Act (Cal. Penal Code § 1546 et. seq.).
                    </ListDesign>
                    <ListDesign>
                      Engage in public or peer-reviewed scientific, historical,
                      or statistical research in the public interest that
                      adheres to all other applicable ethics and privacy laws,
                      when the information's deletion may likely render
                      impossible or seriously impair the research's achievement
                      if You previously provided informed consent.
                    </ListDesign>
                    <ListDesign>
                      Enable solely internal uses that are reasonably aligned
                      with consumer expectations based on Your relationship with
                      Us.
                    </ListDesign>
                    <ListDesign>Comply with a legal obligation.</ListDesign>
                    <ListDesign>
                      Make other internal and lawful uses of that information
                      that are compatible with the context in which You provided
                      it.
                    </ListDesign>
                    <ListDesign>
                      The right not to be discriminated against. You have the
                      right not to be discriminated against for exercising any
                      of Your consumer's rights, including by:
                      <ol className="pl-6 list-[lower-roman] list-inside">
                        <ListDesign>
                          Denying goods or services to You
                        </ListDesign>
                        <ListDesign>
                          Charging different prices or rates for goods or
                          services, including the use of discounts or other
                          benefits or imposing penalties
                        </ListDesign>
                        <ListDesign>
                          Providing a different level or quality of goods or
                          services to You
                        </ListDesign>
                        <ListDesign>
                          Suggesting that You will receive a different price or
                          rate for goods or services or a different level or
                          quality of goods or services
                        </ListDesign>
                      </ol>
                    </ListDesign>
                  </ol>
                </div>
              </ListDesign>
            </UlContainer>
          </section>
          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              Exercising Your CCPA Data Protection Rights
            </h2>
            <p>
              In order to exercise any of your rights under the CCPA, and if you
              are a California resident, you can contact us:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                By visiting this page on our website:{" "}
                <Link
                  className="text-blue-500"
                  href={"www.ExpatGlobalGroup.com"}
                >
                  www.ExpatGlobalGroup.com
                </Link>
              </ListDesign>
              <ListDesign>
                By sending us an email:{" "}
                <Link
                  className="text-blue-500"
                  href={"mailto:info@expatglobalGroup.com"}
                >
                  info@expatglobalGroup.com
                </Link>
              </ListDesign>
            </UlContainer>

            <div className="">
              <p className="py-2">
                Only You, or a person registered with the California Secretary
                of State that You authorize to act on Your behalf, may make a
                verifiable request related to Your personal information.
              </p>
              <p>Your request to Us must:</p>
              <UlContainer listDisc={false}>
                <ListDesign>
                  Provide sufficient information that allows Us to reasonably
                  verify You are the person about whom We collected personal
                  information or an authorized representative
                </ListDesign>
                <ListDesign>
                  Describe Your request with sufficient detail that allows Us to
                  properly understand, evaluate, and respond to it
                </ListDesign>
              </UlContainer>
            </div>
            <div className="">
              <p className="py-2">
                We cannot respond to Your request or provide You with the
                required information if we cannot:
              </p>

              <UlContainer listDisc={false}>
                <ListDesign>
                  Verify Your identity or authority to make the request
                </ListDesign>
                <ListDesign>
                  And confirm that the personal information relates to You
                </ListDesign>
                <ListDesign>
                  We will disclose and deliver the required information free of
                  charge within 45 days of receiving Your verifiable request.
                  The time period to provide the required information may be
                  extended once by an additional 45 days when reasonably
                  necessary and with prior notice.
                </ListDesign>
              </UlContainer>
              <p className="pt-2">
                Any disclosures We provide will only cover the 12-month period
                preceding the verifiable request's receipt.
              </p>
              <p className="pt-2">
                For data portability requests, We will select a format to
                provide Your personal information that is readily usable and
                should allow You to transmit the information from one entity to
                another entity without hindrance.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6 underline">
              Do Not Sell My Personal Information
            </h2>
            <p className="pb-2">
              You have the right to opt out of the sale of your personal
              information. Once we receive and confirm a verifiable consumer
              request from you, we will stop selling your personal information.
              To exercise your right to opt out, please contact us.
            </p>
            <p>
              The Service Providers we partner with (for example, our analytics
              or advertising partners) may use technology on the Service that
              sells personal information as defined by the CCPA law. If you wish
              to opt out of the use of your personal information for
              interest-based advertising purposes and these potential sales as
              defined under CCPA law, you may do so by following the
              instructions below.
            </p>
            <p className="my-3">
              Please note that any opt-out is specific to the browser You use.
              You may need to opt-out on every browser that You use.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6">
              PIPEDA Privacy Policy (Canada Residents)
            </h2>
            <p className="pb-2">
              This section supplements our Privacy Policy and outlines how we
              handle the personal information of users located in Canada, in
              compliance with the Personal Information Protection and Electronic
              Documents Act (PIPEDA).
            </p>
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Accountability
            </h2>
            <p>
              B&amp;B Global Ventures, LLC is responsible for the personal
              information in its possession or control. We have designated a
              Privacy Officer who is accountable for our compliance with PIPEDA
              principles.
            </p>
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Purpose
            </h2>
            <p>
              We collect, use, and disclose personal information only for
              purposes that a reasonable person would consider appropriate under
              the circumstances. These purposes include providing our services,
              maintaining our website, analyzing performance, communicating with
              users, and fulfilling legal obligations.
            </p>
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Consent
            </h2>
            <p>
              We collect, use, or disclose your personal information with your
              consent, except where otherwise permitted or required by law. By
              using our Website and Services, you consent to the practices
              described in this Privacy Policy. You may withdraw your consent at
              any time, subject to legal or contractual restrictions and
              reasonable notice.
            </p>{" "}
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Limiting Collection and Use
            </h2>
            <p>
              We only collect the personal information necessary for the
              purposes stated in this Privacy Policy and use it solely for those
              purposes, unless we obtain further consent.
            </p>{" "}
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Disclosure and Retention
            </h2>
            <p>
              Personal information may be disclosed to third-party service
              providers to support our operations, as outlined in this Privacy
              Policy. We retain personal information only as long as necessary
              to fulfill the identified purposes or as required by law.
            </p>{" "}
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Accuracy
            </h2>
            <p>
              We make reasonable efforts to ensure that personal information is
              accurate, complete, and up to date for the purposes for which it
              is used.
            </p>{" "}
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Safeguards
            </h2>
            <p>
              We use appropriate security measures to protect personal
              information against unauthorized access, disclosure, or misuse.
            </p>{" "}
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Individual Access
            </h2>
            <p>
              You have the right to request access to the personal information
              we hold about you and to request corrections if the information is
              inaccurate or incomplete. To make a request, please contact us
              using the information below.
            </p>{" "}
            <h2 className="font-semibold w-max mb-0 text-black/75 mt-2">
              Inquiries and Complaints
            </h2>
            <p>
              If you have any questions, concerns, or complaints about our
              handling of your personal information under PIPEDA, you may
              contact our Privacy Officer at{" "}
              <span className="font-semibold">info@expatglobalgroup.com</span>.
              If you are not satisfied with our response, you may contact the{" "}
              <span className="font-semibold">
                Office of the Privacy Commissioner of Canada
              </span>{" "}
              at{" "}
              <Link className="text-blue-500" href={"www.priv.gc.ca"}>
                www.priv.gc.ca.
              </Link>
            </p>{" "}
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6 underline">
              Children's Privacy
            </h2>
            <p className="pb-2">
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 13 without verification of
              parental consent, We take steps to remove that information from
              Our servers.
            </p>
            <p>
              If We need to rely on consent as a legal basis for processing Your
              information and Your country requires consent from a parent, We
              may require Your parent's consent before We collect and use that
              information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6 underline">
              Your California Privacy Rights (California's Shine the Light law)
            </h2>
            <p className="pb-2">
              Under California Civil Code Section 1798 (California's Shine the
              Light law), California residents with an established business
              relationship with us can request information once a year about
              sharing their Personal Data with third parties for the third
              parties direct marketing purposes.
            </p>
            <p>
              If you'd like to request more information under the California
              Shine the Light law, and if You are a California resident, You can
              contact Us using the contact information provided below.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6 underline">
              California Privacy Rights for Minor Users (California Business and
              Professions Code Section 22581)
            </h2>
            <p className="pb-2">
              California Business and Professions Code Section 22581 allows
              California residents under the age of 18 who are registered users
              of online sites, services, or applications to request and obtain
              removal of content or information they have publicly posted.
            </p>
            <p className="pb-2">
              To request removal of such data, and if You are a California
              resident, You can contact Us using the contact information
              provided below, and include the email address associated with Your
              account.
            </p>
            <p className="pb-2">
              Be aware that Your request does not guarantee complete or
              comprehensive removal of content or information posted online and
              that the law may not permit or require removal in certain
              circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6 underline">
              Links to Other Websites
            </h2>
            <p className="pb-2">
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third-party link, You will be
              directed to that third-party's site. We strongly advise You to
              review the Privacy Policy of every site You visit.
            </p>
            <p>
              We have no control over and assume no responsibility for the
              content, privacy policies, or practices of any third-party sites
              or services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6 underline">
              Changes to this Privacy Policy
            </h2>
            <p className="pb-2">
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="pb-2">
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="font-semibold w-max mb-3 text-black/75 mt-6 underline">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </p>
            <UlContainer listDisc={false}>
              <ListDesign>
                By visiting this page on our website{" "}
                <Link
                  className="text-blue-500"
                  href={"www.ExpatGlobalGroup.com"}
                >
                  www.ExpatGlobalGroup.com
                </Link>
              </ListDesign>
              <ListDesign>
                By sending us an email{" "}
                <Link
                  className="text-blue-500"
                  href={"mailto:info@expatglobalGroup.com"}
                >
                  info@expatglobalGroup.com
                </Link>
              </ListDesign>
            </UlContainer>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;
