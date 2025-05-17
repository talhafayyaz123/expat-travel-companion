"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import Image from "next/image";
import age from "@/assets/profile/fi_5670747.png";
import zodiac from "@/assets/profile/fi_5796707.png";
import { useGetUserByIdQuery, useGetUserQuery } from "@/redux/Api/userApi";
import { useParams } from "next/navigation";
import { ProfileViewLoder } from "../userProfile/ProfileViewLoder";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetMyfavQuery, useMyfavAddMutation } from "@/redux/Api/favariteApi";
import { getCountryLabel } from "@/constants/countryOptions";
import { getStateLabel } from "@/constants/stateOptions";
import ChatModal from "../chatModal/chat";
import genderIcon from "@/assets/profile/gender.svg";
import seekingIcon from "@/assets/profile/seeking.svg";
import { FaExclamation, FaExclamationCircle } from "react-icons/fa";
import Placeholder from "@/assets/placholder.png";

interface User {
  id: any | string;
  firstName: string;
  lastName: string;
  email: string;
  summitMember: string | null;
  summitVerify: boolean;
  dob: string;
  zodiac: string;
  age: string | null;
  country: string;
  phoneNumber: string | null;
  isDeleted: boolean;
  haveRoom: boolean;
  state: string | null;
  profileImage: string | null;
  role: string;
  status: string;
}
interface FavoriteProfile {
  userId: string;
}
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  summitVerify: boolean;
}

export const ProfileDetailsView = () => {
  const { id } = useParams(); // Profile ID from URL params

  const [currentUserData, setCurrentUserData] = useState<UserData>();
  const [isFavorite, setIsFavorite] = useState(false); // Manage favorite state
  const [chatModalisOpen, setChatModalIsOpen] = useState(false);
  const [floatingButtonIsDisplayed, setFloatingButtonIsDisplayed] =
    useState(false);
  const [addFavorite, { data: res, isLoading: addProfile }] =
    useMyfavAddMutation();
  const {
    data: profiles,
    isLoading: favLoading,
    isError: favError,
  } = useGetMyfavQuery(undefined); // Get all favorite profiles

  useEffect(() => {
    // Check if current profile id is in the favorites list
    if (profiles?.data) {
      const isAlreadyFavorited = profiles.data.some(
        (profile: any) => profile.userId === id
      );
      setIsFavorite(isAlreadyFavorited);
    }
  }, [profiles, id]);

  const handleToggleFavorite = async (id: string) => {
    const toastID = toast.loading(
      isFavorite ? "Removing from Saved profile" : "Adding to Saved Profile"
    );

    try {
      // Call the API to add/remove favorite
      const response = await addFavorite({ userId: id }).unwrap();

      // Toggle the favorite status
      setIsFavorite(!isFavorite);

      toast.success(
        isFavorite ? "Removed from Saved Profile!" : "Added to Saved Profile!",
        { id: toastID }
      );
    } catch (error: any) {
      toast.error(error.message, { id: toastID });
    }
  };

  const { data, isLoading, isError } = useGetUserByIdQuery(id);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery({});

  useEffect(() => {
    setCurrentUserData(userData?.data);
  }, [userData]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarSrc, setAvatarSrc] = useState<string>("profile.png");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!id) {
    return (
      <div className="text-center mt-10 text-red-500">
        No Profiles ID provided.
      </div>
    );
  }

  if (isLoading) {
    return <ProfileViewLoder />;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  const currentUser = data?.data;
  // console.log("My Profile Detail", currentUser);

  const date = new Date(currentUser?.createdAt);

  const joinedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between p-4 md:p-6 gap-4 bg-white">
        <div className="flex flex-col md:flex-row gap-8 items-center w-full md:w-auto">
          <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center">
            <Avatar className="w-[133px] h-[133px]  border-2 border-slate-200">
              <Image
                src={currentUser.profileImage || Placeholder}
                alt="Profile Image"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </Avatar>
          </div>

          {/* <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          /> */}

          {/* User Details */}
          <div className="text-center md:text-left">
            <div className="flex justify-start items-center">
              <h1 className="text-xl md:text-2xl lg:text-[32px] text-[#263238] font-bold me-5">
                {currentUser?.firstName} {currentUser?.lastName || "N/A"}
              </h1>
              {data?.data?.summitVerify && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.2l-3.5-3.6L4 14.2 9 19l12-12-1.4-1.4z" />
                  </svg>
                </span>
              )}
            </div>

            <p className="text-lg md:text-[13px] font-semibold mt-1">
              Date Joined:{" "}
              <span className="text-base md:text-[16px] font-medium">
                {joinedDate}
              </span>
            </p>

            {/* Additional Details */}
            <div className="flex flex-col gap-6 mt-6">
              {/* Row 1: Country and City */}
              <div className="flex flex-col sm:flex-row justify-between gap-5">
                <p className="text-lg md:text-[18px] font-semibold">
                  Current Country:{" "}
                  <span className="text-base md:text-[16px] font-medium">
                    {getCountryLabel(currentUser?.country)}
                  </span>
                </p>
                <p className="text-lg md:text-[18px] font-semibold">
                  Current City:{" "}
                  <span className="text-base md:text-[16px] font-medium">
                    {currentUser?.city || "N/A"}
                  </span>
                </p>
              </div>

              {/* Row 2: State */}
              <div className="flex flex-col">
                <p className="text-lg md:text-[18px] font-semibold">
                  Current State/Province:{" "}
                  <span className="text-base md:text-[16px] font-medium">
                    {getStateLabel(currentUser?.state)}
                  </span>
                </p>
              </div>

              {/* Row 3: Zodiac, Age, and Accommodation */}
              <div className="flex flex-col sm:flex-row  gap-[3.3rem]">
                <div className="flex gap-10">
                  <div className="flex items-center gap-3">
                    <Image src={zodiac} alt="Zodiac Icon" />
                    <p className="text-[#1D2939] text-sm md:text-base font-semibold">
                      {currentUser?.zodiac || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image src={age} alt="Age Icon" />
                    <p className="text-[#1D2939] text-sm md:text-base font-semibold">
                      {currentUser?.age || "N/A"} y
                    </p>
                  </div>
                </div>

                {/* <p className="text-lg md:text-[18px] font-semibold">
                      Accommodation:{" "}
                      <span className="text-base md:text-[16px] font-medium">
                        {currentUser?.haveRoom ? "Yes" : "No"}
                      </span>
                    </p> */}
              </div>

              <div className="flex gap-10">
                <div className="flex items-center gap-3">
                  <Image
                    src={genderIcon}
                    alt="Zodiac Icon"
                    width={20}
                    height={20}
                  />
                  <p className="text-[#1D2939] text-sm md:text-base font-semibold">
                    Gender:{" "}
                    <span className="text-base md:text-[16px] font-medium">
                      {userData?.data?.gender}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={seekingIcon}
                    alt="Age Icon"
                    width={20}
                    height={20}
                  />
                  <p className="text-[#1D2939] text-sm md:text-base font-semibold">
                    Seeking:{" "}
                    <span className="text-base md:text-[16px] font-medium">
                      {userData?.data?.memberSeeking}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-[84px] w-full md:w-auto">
          <button
            onClick={() => handleToggleFavorite(id! as any)}
            className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 bg-[#CECECE] rounded-xl text-[#000] text-sm md:text-base font-normal font-sans"
          >
            <Heart className={`w-4 h-4 stroke-none fill-red-500  }`} />
            {isFavorite ? "Saved Profile" : "Save profile"}
          </button>
          <div>
            <button
              className={`rounded-xl  px-[20px] h-[30px] ${
                !currentUserData?.summitVerify
                  ? "bg-gray-600 text-white"
                  : "bg-primary text-white"
              }`}
              onClick={() => setChatModalIsOpen(true)}
              disabled={!currentUserData?.summitVerify}
            >
              <i className="fa-solid fa-comment me-2"></i>Chat
            </button>
            {!currentUserData?.summitVerify && (
              <div className="flex justify-center items-center px-[10px] py-[2px] bg-gray-400 rounded-lg mt-5">
                <FaExclamationCircle className="me-2" color="#fff" />
                <span className="text-white select-none">
                  You have to get verified to chat!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Request References */}
      <div>
        <h2 className="text-lg md:text-xl font-sans font-bold mt-10 md:mt-[65px]">
          Request References
        </h2>
        <div className="text-base md:text-[18px] font-normal font-sans mt-5 text-[#475467]">
          Add another dimension of trust to your profile. You can request
          references from your personal network, and the references will appear
          publicly on your profile to help other members get to know you.
        </div>
        {/* <a
          href="https://www.facebook.com/608837771792997"
          target="_blank"
          rel="noopener noreferrer"
        > */}
        <button className="mt-7 bg-primary flex items-center justify-center md:justify-start px-4 md:px-6 py-2 md:py-3 gap-2 md:gap-3 rounded-xl text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
          >
            <g clipPath="url(#clip0_543_4997)">
              <path
                d="M28 14C28 20.988 22.8802 26.7799 16.1875 27.8299V18.0469H19.4496L20.0703 14H16.1875V11.3739C16.1875 10.2665 16.73 9.1875 18.4691 9.1875H20.2344V5.74219C20.2344 5.74219 18.632 5.46875 17.1002 5.46875C13.9027 5.46875 11.8125 7.40687 11.8125 10.9156V14H8.25781V18.0469H11.8125V27.8299C5.11984 26.7799 0 20.988 0 14C0 6.26828 6.26828 0 14 0C21.7317 0 28 6.26828 28 14Z"
                fill="#1877F2"
              />
              <path
                d="M19.4496 18.0469L20.0703 14H16.1875V11.3739C16.1875 10.2667 16.7299 9.1875 18.469 9.1875H20.2344V5.74219C20.2344 5.74219 18.6323 5.46875 17.1005 5.46875C13.9026 5.46875 11.8125 7.40688 11.8125 10.9156V14H8.25781V18.0469H11.8125V27.8299C12.5253 27.9417 13.2558 28 14 28C14.7442 28 15.4747 27.9417 16.1875 27.8299V18.0469H19.4496Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_543_4997">
                <rect width="28" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Request a Reference
        </button>
        {/* </a> */}
      </div>
      <ChatModal
        isOpen={chatModalisOpen}
        setOpen={setChatModalIsOpen}
        floatingButtonIsDisplayed={floatingButtonIsDisplayed}
        setFloatingButtonDisplay={setFloatingButtonIsDisplayed}
        profileId={id}
      />
    </div>
  );
};
