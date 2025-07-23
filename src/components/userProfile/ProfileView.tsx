"use client";
import age from "@/assets/profile/fi_5670747.png";
import zodiac from "@/assets/profile/fi_5796707.png";
import logo from "@/assets/profile/tabler_edit.png";
import {
  useChangePasswordMutation,
  useGetUserQuery,
  useUpdateByUserMutation,
  useUpdateUserBioMutation,
} from "@/redux/Api/userApi";
import { Edit, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ProfileViewLoder } from "./ProfileViewLoder";

import genderIcon from "@/assets/profile/gender.svg";
import seekingIcon from "@/assets/profile/seeking.svg";
import { getCountryLabel } from "@/constants/countryOptions";
import { getStateLabel } from "@/constants/stateOptions";
import { useMembershipCancelMutation } from "@/redux/Api/membershipApi";
import { useGetAllConversationsQuery,useGetUnreadMessagesCountQuery } from "@/redux/Api/messagesApi";
import { formatDate2 } from "@/utilities/format";
import { Image as AntImage } from "antd";
import { FaExclamationCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import MessagesModal from "../chatModal/messages";
import { useRouter } from "next/navigation";


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  summitMember: string | null;
  summitVerify: boolean;
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

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  summitVerify: boolean;
}

export const ProfileView = () => {
  const router = useRouter();
  const charLimit = 300;
  const [editBio, setEditBio] = useState(false);
  const [userBio, setUserBio] = useState("");
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [chatModalisOpen, setChatModalIsOpen] = useState(false);
  const [floatingButtonIsDisplayed, setFloatingButtonIsDisplayed] =
    useState(false);
  const { data: userData, isLoading, isError } = useGetUserQuery(undefined);

  const {
    data: conversations,
    error,
    isLoading: isConversationsLoading,
  } = useGetAllConversationsQuery(undefined);

  const {
    data: conversationCounter,
    isLoading: isConversationCounterLoading,
  } = useGetUnreadMessagesCountQuery(undefined);


  // cancel subscription
  const [membershipCancel, { isLoading: isCancelLoading }] =
    useMembershipCancelMutation();
  // const { data: allUsers, isLoading: isAllUsersLoading } =
  //   useAllUserQuery(undefined);
  const [changePass] = useChangePasswordMutation();
  const currentUser = userData?.data || null;

  const handleCancelMember = async () => {
    toast.loading("Processing...");
    try {
      const res = await membershipCancel().unwrap();

      toast.dismiss();
      toast.success("Cancel subscription successfully!");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      setCurrentUserData(userData?.data);
      setUserBio(userData?.data.bio);
    }
  }, [userData]);

  const [avatarSrc, setAvatarSrc] = useState(currentUser?.profileImage);
  const [profileUpUser] = useUpdateByUserMutation();
  const [updateUserBio, { isLoading: isEditBioLoading }] =
    useUpdateUserBioMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Preview the image immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Prepare the form data to send to the backend
      const formData = new FormData();
      formData.append("image", file);

      try {
        const loadingToastId = toast.loading("Uploading image...");
        await profileUpUser(formData).unwrap();
        toast.success("Profile image updated successfully!");
        toast.dismiss(loadingToastId);
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
        toast.dismiss();
      }
    }
  };
  const handlePasswordChange = async () => {
    // Basic validations
    if (!oldPassword || !newPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Show a loading indicator
      const loadingToastId = toast.loading("Updating password...");

      // Call the API to change the password
      const response = await changePass({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }).unwrap();

      // Check the API response (if additional checks are needed)
      if (response?.success) {
        toast.success("Password changed successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(response?.message || "Failed to update the password.");
      }

      // Dismiss the loading toast
      if (!isLoading) {
        toast.dismiss(loadingToastId);
      }
    } catch (error: any) {
      // Handle errors and show the appropriate message
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Update User Bio

  const handleUpdateBio = async () => {
    try {
      const loadingToastId = toast.loading("Updating bio...");
      const response = await updateUserBio({
        id: userData.data.id,
        bio: userBio,
      }).unwrap();

      if (response?.success) {
        toast.success("Bio update successfully!");
        setEditBio(false);
      } else {
        toast.error(response?.message || "Failed to update the bio.");
      }
      if (!isLoading) {
        toast.dismiss(loadingToastId);
      }
    } catch (error: any) {
      toast.dismiss();
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // const handleEditBio = async () => {
  //   if (!userData?.data?.id) return;

  //   const toastId = toast.loading("Edit bio…");
  //   try {
  //     const res = await editUserBio({
  //       id: userData.data.id,
  //       bio: userBio,
  //     }).unwrap();
  //     console.log("Edit Bio", res);
  //     if (res?.success) {
  //       toast.success("Bio Edit Successsfully!");
  //       setUserBio(res);
  //     } else {
  //       toast.error(res?.message || "Failed to edit the bio.");
  //     }
  //     if (!isLoading) {
  //       toast.dismiss(toastId);
  //     }
  //   } catch (error: any) {
  //     if (error?.data?.message) {
  //       toast.error(error.data.message);
  //     } else {
  //       toast.error("An unexpected error occured. Please try again...");
  //     }
  //   }
  // };

  if (!userData) return null;

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="container my-5">
        <ProfileViewLoder />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading user data</div>;
  }
  const country = currentUser?.country;
  const userPayment = currentUser?.isPayment;

  return (
    <>
      {currentUser && (
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row items-start justify-between p-4 md:p-6 gap-6 ">
            {/* Profile Image and Details Section */}
            <div className="flex flex-col md:flex-row gap-6 items-center w-full md:w-auto">
              {/* Profile Image */}
              <div className="relative">
                <div className="rounded-full overflow-hidden w-[133px] h-[133px]">
                  <AntImage
                    src={avatarSrc || currentUser?.profileImage}
                    alt="Profile picture"
                    width={133}
                    height={133}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div
                  onClick={triggerFileInput}
                  className="absolute border flex cursor-pointer justify-center items-center border-gray-400 bg-white top-24 left-24 rounded-full w-8 h-8 shadow-md"
                >
                  <Image src={logo} alt="Edit" />
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />

              {/* User Details */}
              <div className="text-center md:text-left">
                <div className="flex justify-start items-center">
                  <h1 className="text-xl md:text-2xl lg:text-[32px] text-[#263238] font-bold">
                    {currentUser?.firstName} {currentUser?.lastName || "N/A"}
                  </h1>
                  {currentUserData?.summitVerify && (
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
                    {formatDate2(currentUser?.createdAt)}
                  </span>
                </p>

                {/* Additional Details */}
                <div className="flex flex-col gap-6 mt-6">
                  {/* Row 1: Country and City */}
                  <div className="flex flex-col sm:flex-row justify-between gap-5">
                    <p className="text-lg md:text-[18px] font-semibold">
                      Current Country:{" "}
                      <span className="text-base md:text-[16px] font-medium">
                        {getCountryLabel(country)}
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
                          {currentUser?.gender}
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
                          {currentUser?.memberSeeking}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block">
              {/* Actions Section */}
              <div className="flex flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
                <Link href="/basic">
                  <button className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 bg-gray-300 rounded-xl text-black text-sm md:text-base font-normal">
                    <Edit className="w-4 h-4 md:w-5 md:h-5" />
                    Edit
                  </button>
                </Link>

                {userPayment && (
                  <button
                    disabled={isCancelLoading}
                    onClick={handleCancelMember}
                    className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 bg-gray-300 rounded-xl text-black text-sm md:text-base font-normal"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="whitespace-nowrap">
                      Cancel Membership
                    </span>{" "}
                  </button>
                )}

                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gray-300 rounded-xl px-2 py-1 text-black"
                  >
                    <span className="whitespace-nowrap">Change Password</span>
                  </button>
                </div>
              </div>
              <button
                className={`block rounded-xl px-[20px] h-[30px] mt-[100px] ms-auto ${
                  !currentUserData?.summitVerify
                    ? "bg-gray-600 text-white"
                    : "bg-primary text-white"
                }`}
                onClick={() => setChatModalIsOpen(true)}
                disabled={!currentUserData?.summitVerify}
              >
                <i className="fa-solid fa-comment me-2"></i>Chat ({conversationCounter?.data})
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
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <label className="block mb-2 relative">
                  Old Password
                  <input
                    type={showPassword3 ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  />
                  <span
                    onClick={() => setShowPassword3((prev) => !prev)}
                    className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  >
                    {showPassword3 ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </label>
                <label className="block mb-4 relative">
                  New Password
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </label>
                <label className="block mb-4 relative">
                  Confirm New Password
                  <input
                    type={showPassword2 ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  />
                  <span
                    onClick={() => setShowPassword2((prev) => !prev)}
                    className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  >
                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </label>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="px-4 py-2 bg-primary text-white rounded-md"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Request References */}
          <div>
            <h2 className="text-lg md:text-xl font-sans font-bold mt-10 md:mt-[65px]">
              About Me – Bio
            </h2>

            {!editBio ? (
              <p className="text-base md:text-[18px] font-normal font-sans mt-5 text-[#475467]">
                {userBio}
              </p>
            ) : (
              <textarea
                value={userBio}
                onChange={(e) => {
                  // Optional: Add a character limit if needed
                  const charLimit = 500;
                  if (e.target.value.length <= charLimit) {
                    setUserBio(e.target.value);
                  }
                }}
                placeholder="Type here..."
                rows={5}
                style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
                className="w-full p-2 text-base border-none focus:outline-none"
              />
            )}

            <button
              className="mt-7 bg-primary flex items-center justify-center md:justify-start px-4 md:px-6 py-2 md:py-3 gap-2 md:gap-3 rounded-xl text-white"
              onClick={() => (editBio ? handleUpdateBio() : setEditBio(true))}
              disabled={isEditBioLoading}
            >
              {editBio ? "Update" : "Edit Bio"}
            </button>
          </div>

          {/* NOTE ! */}

          <div className="mt-5">
            <p>
              {" "}
              NOTE: If you have a room available in a country, please share
              details in your Bio.
            </p>
          </div>

          <MessagesModal
            isOpen={chatModalisOpen}
            setOpen={setChatModalIsOpen}
            floatingButtonIsDisplayed={floatingButtonIsDisplayed}
            setFloatingButtonDisplay={setFloatingButtonIsDisplayed}
            allConversations={conversations?.data}
          />
        </div>
      )}
    </>
  );
};
