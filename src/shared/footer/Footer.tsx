import Link from "next/link";
import Image from "next/image";

import googlay from "@/assets/google-play.svg";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-8 mt-16 px-4 font-sans">
      <div className="containter">
        <div className=" mx-auto space-y-8">
          {/* Navigation Links */}
          <div className="flex justify-center items-start">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm border-t-2 border-b-2 w-max py-3">
              <Link href="/safty-tips" className="hover:text-gray-800">
                Safety Tips
              </Link>
              <Link
                href="/community-guidelines"
                className="hover:text-gray-800"
              >
                Community Guidelines
              </Link>
              <Link href="/faq" className="hover:text-gray-800">
                FAQ&apos;s
              </Link>

              <Link href="/privacy-policy" className="hover:text-gray-800">
                Privacy Policy
              </Link>

              <Link href="/terms-and-condition" className="hover:text-gray-800">
                Terms & Conditions
              </Link>
              <Link href="/contact" className="hover:text-gray-800">
                Contact
              </Link>
            </nav>
          </div>

          {/* App Store Buttons */}
          {/* <div className="flex justify-center items-center gap-4">
            <Link href="https://play.google.com">
              <Image
                src={googlay}
                alt="Get it on Google Play"
                width={135} // Set width directly here
                height={40} // Set height directly here
              />
            </Link>
            <Link href="https://apps.apple.com">
              <Image
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={135}
                height={40}
              />
            </Link>
          </div> */}

          {/* Social Media Icons */}
          {/* <div className="flex justify-center gap-6">
            <Link
              href="https://www.instagram.com/expatglobalgroup/"
              className="hover:text-gray-500"
              target="_blank"
            >
              <FaInstagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61571388448957"
              className="hover:text-gray-500"
              target="_blank"
            >
              <FaFacebookF className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div> */}

          {/* Copyright */}
          {/* <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} All rights Reserved. Timweft SAS
          </div> */}

          <div className="flex justify-center items-center gap-4">
            <p>
              Expat Global Group
              <span className="text-[15px] ml-1">&trade;</span> ©2025. All
              Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
