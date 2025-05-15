"use client";

import HeaderWithBorder from "../../components/home/PageReusable/HeaderWithBorder";
import ListDesign from "../../components/home/PageReusable/ListDesign";
import UlContainer from "../../components/home/PageReusable/UlContainer";
import Link from "next/link";
import React, { useEffect } from "react";

const SaftyTips = () => {
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
    <div>
      <div className="container mx-auto mt-[160px]">
        <div className="flex justify-center items-center">
          <h2 className="text-3xl text-black/90">Safety Tips for Members</h2>
        </div>
        <p className="pt-6 pb-3">
          Your safety is our top priority at Expat Global Group
          <sup className="text-[10px]">™</sup>. Whether you’re connecting with
          other members online or meeting in person, following these safety tips
          can help ensure a positive and secure experience:
        </p>

        {/* ................. */}
        <section>
          <HeaderWithBorder text="Online Safety" />
          <ul className="list-decimal pl-6 pb-2 space-y-3">
            <ListDesign>
              <p className="">Protect Your Personal Information</p>
              <UlContainer>
                <ListDesign>
                  Avoid sharing sensitive details such as your home address,
                  phone number, financial information, or personal
                  identification documents.
                </ListDesign>
                <ListDesign>
                  Use the platform’s secure messaging and video call features to
                  communicate with other members.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Verify Profiles</p>
              <UlContainer>
                <ListDesign>
                  Take time to review the profiles of other members before
                  connecting.
                </ListDesign>
                <ListDesign>
                  Be cautious of profiles with incomplete information,
                  inconsistencies, or behavior that seems too good to be true.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Trust Your Instincts</p>
              <UlContainer>
                <ListDesign>
                  If a conversation or interaction makes you feel uneasy, pause
                  and evaluate. You’re under no obligation to continue a
                  connection.
                </ListDesign>
                <ListDesign>
                  Report suspicious or inappropriate behavior to our support
                  team.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Be Cautious with External Links</p>
              <UlContainer>
                <ListDesign>
                  Avoid clicking on unknown or suspicious links shared by other
                  members.
                </ListDesign>
                <ListDesign>
                  All communication should ideally remain within the platform.
                </ListDesign>
              </UlContainer>
            </ListDesign>
          </ul>
        </section>

        {/* ................. */}
        <section>
          <HeaderWithBorder text="Offline Safety" />
          <ul className="list-decimal pl-6 pb-2 space-y-3">
            <ListDesign>
              <p className="">Choose Public Meeting Locations</p>
              <UlContainer>
                <ListDesign>
                  Meet for the first time in a well-lit, busy public place like
                  a cafe, park, or coworking space.
                </ListDesign>
                <ListDesign>
                  Let a trusted friend or family member know where you’re going
                  and who you’re meeting.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Use Reliable Transportation</p>
              <UlContainer>
                <ListDesign>
                  Arrange your own transportation to and from meetings. Avoid
                  relying on someone you’ve just met for rides.
                </ListDesign>
              </UlContainer>
            </ListDesign>

            <ListDesign>
              <p className="">Bring a Friend if Possible</p>
              <UlContainer>
                <ListDesign>
                  If you’re meeting someone for the first time, consider
                  bringing a friend or letting someone accompany you nearby.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Keep it Casual</p>
              <UlContainer>
                <ListDesign>
                  Avoid inviting someone to your home or entering their private
                  residence until you’ve built trust over time.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Know Emergency Contacts</p>
              <UlContainer>
                <ListDesign>
                  Have local emergency numbers saved in your phone.
                </ListDesign>
                <ListDesign>
                  If traveling, familiarize yourself with nearby police
                  stations, hospitals, or other support services.
                </ListDesign>
              </UlContainer>
            </ListDesign>
          </ul>
        </section>

        {/* ................. */}
        <section>
          <HeaderWithBorder text="General Safety Tips" />
          <ul className="list-decimal pl-6 pb-2 space-y-3">
            <ListDesign>
              <p className="">Communicate Clearly</p>
              <UlContainer>
                <ListDesign>
                  Be upfront about your expectations and preferences to avoid
                  misunderstandings.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Be Wary of Red Flags</p>
              <UlContainer>
                <ListDesign>
                  Avoid interactions with anyone who pressures you, exhibits
                  controlling behavior, or refuses to meet in a public space.
                </ListDesign>
              </UlContainer>
            </ListDesign>

            <ListDesign>
              <p className="">Set Boundaries</p>
              <UlContainer>
                <ListDesign>
                  Clearly communicate and enforce your boundaries. If someone
                  disrespects them, consider disengaging and reporting the
                  behavior.
                </ListDesign>
              </UlContainer>
            </ListDesign>
            <ListDesign>
              <p className="">Stay Aware</p>
              <UlContainer>
                <ListDesign>
                  Pay attention to your surroundings, both online and offline.
                  If something feels off, prioritize your safety and take
                  action.
                </ListDesign>
              </UlContainer>
            </ListDesign>
          </ul>
        </section>

        <div className="pt-4">
          By following these tips and trusting your instincts, you can
          confidently explore connections within our community while
          prioritizing your well-being. Remember, we’re here to support
          you—don’t hesitate to{" "}
          <Link href={"/contact"} className="text-blue-500">
            reach out to us
          </Link>{" "}
          with concerns or questions.
        </div>
      </div>
    </div>
  );
};

export default SaftyTips;
