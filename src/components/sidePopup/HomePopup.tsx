"use client";

import { useEffect, useState } from "react";
import { Notebook, X } from "lucide-react";
import Cookies from "js-cookie";
import Image from "next/image";
import addImage from "../../../public/add.jpg";

function HomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  useEffect(() => {
    const popupClosed = Cookies.get("homePopupClosed");
    if (popupClosed) {
    }
  }, []);

  const closePopup = () => {
    Cookies.set("homePopupClosed", "true", { expires: 10 / 24 });
    setIsOpen(false);
  };

  const closeSecondPopup = () => {
    setIsSecondOpen(false);
  };

  return (
    <>
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-[999]">
        <div className="relative h-5">
          <div
            className="bg-white rounded-sm shadow-lg py-1 px-2 ps-[3px] flex justify-start items-center absolute -right-[60px] top-0 hover:right-0 transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <Notebook size={18} />
            <button className="ms-4">New</button>
          </div>
        </div>
        <div className="relative h-5 mt-4">
          {" "}
          <div
            className="bg-white rounded-sm shadow-lg py-1 px-2 ps-[3px] flex justify-start items-center absolute -right-[78px] top-0 hover:right-0 transition-all duration-300"
            onClick={() => setIsSecondOpen(true)}
          >
            <Notebook size={18} />
            <button className="ms-2">Promos</button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-1/2 -translate-y-1/2 right-0 z-[999] w-[600px] custom-width bg-white shadow-lg transform  transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 pb-0 border-b flex justify-between items-center bg-white">
          <button
            onClick={() => closePopup()}
            className="p-1 rounded-md hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 bg-white h-full">
          <h4 className="text-sm text-gray-600 font-semibold text-center border-b pb-4">
            <strong>BIG NEWS...</strong> Expat Global Group Referral program is
            now available! Starting today, you can earn money by referring us to
            anyone you think would benefit from being part of our community. We
            want to grow our membership organically and would love your help!
          </h4>
          <div className="max-h-[400px] custom-popup-height overflow-y-auto">
            <h3 className="text-sm text-black font-bold text-center mt-3 ps-2">
              **Launch Party Promotion**
            </h3>
            <h4 className="text-sm text-black font-bold text-center mt-3 ps-2">
              Earn a 50% commission for each invitee that joins by August 31,
              2025, when they use your personal referral code!
            </h4>
            {/* <h3 className="text-sm text-black font-medium text-start mt-3 ps-2">
              Simply:
            </h3> */}
            <ul className="list-decimal pb-5 pt-2 px-9">
              <li className="text-sm text-gray-800 font-normal text-start mt-3">
                <p>Grab your own personal referral code here:</p>
                <a
                  href="https://expatglobalgroup.promotekit.com/"
                  className="text-blue-600"
                  target="_blank"
                >
                  expatglobalgroup.promotekit.com
                </a>
              </li>
              <li className="text-sm text-gray-800 font-normal text-start mt-3">
                Share it with people you think would benefit from being part of
                our community
              </li>
              <li className="text-sm text-gray-800 font-normal text-start mt-3">
                <p>Earn a commission when your invitee becomes a member</p>
                (they’ll get 10% off their 1<sup>st</sup> month)
              </li>

              <li className="text-sm text-gray-800 font-normal text-start mt-3">
                <b>Win-Win-Win!</b> <p>Expat Global Group grows</p>{" "}
                <p>You make passive income, and</p>
                <p>
                  Your invitee discovers a budget-friendly travel hack! 🏡✈️
                </p>
              </li>
            </ul>
            <h3 className="text-sm text-gray-800 font-normal text-center mt-3 ps-2">
              Thank you for being part of our journey — let’s grow together 🌍✨
            </h3>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-1/2 -translate-y-1/2 right-0 z-[999] promos-width promos-height w-[600px] bg-white shadow-lg transform transition-transform duration-300 ${
          isSecondOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 pb-0 border-b flex justify-between items-center bg-white">
          <button
            onClick={() => closeSecondPopup()}
            className="p-1 rounded-md hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 bg-white h-full">
          <div className="max-h-[450px] overflow-y-auto">
            <a href="https://travelingmailbox.com/?ref=3494" target="_blank">
              <Image
                src={addImage}
                alt=""
                width={400}
                className="block mx-auto"
              />
              <h5 className="text-sm text-black font-medium text-start mt-3 px-16">
                Disclosure: This website may earn a small commission if you make
                a purchase through the links on this page. Your support helps us
                continue to grow.
              </h5>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePopup;
