"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Member } from "@/types/Member";
import Image from "next/image";
import ViewMemberDialog from "../Dialogs/ViewMemberDialog";
import DeleteMemberDialog from "../Dialogs/DeleteMemberDialog";
import profileImage from "@/assets/profile.png";
import { IoEyeOffOutline } from "react-icons/io5";

import {
  useSummitVerifyMemberMutation,
  useHideUnhideMemberMutation,
  useDeleteMemberMutation,
} from "@/redux/Api/memberApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const Dialog = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.Dialog),
  { ssr: false }
);
const DialogContent = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogContent),
  { ssr: false }
);
const DialogDescription = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogDescription),
  { ssr: false }
);
const DialogTitle = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogTitle),
  { ssr: false }
);
const DialogTrigger = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogTrigger),
  { ssr: false }
);

import { useState } from "react";
import { getCountryLabel } from "@/constants/countryOptions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface props {
  member: Member;
}

const MemberTableRow = ({ member }: props) => {
  const [updateSummit, { isLoading: isUpdatingSummit }] =
    useSummitVerifyMemberMutation();
  const [hideUnhide, { isLoading: isHideUnhiding }] =
    useHideUnhideMemberMutation();
  const [deleteMember, { isLoading: isDeleting }] = useDeleteMemberMutation();
  const [deleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleVerifyMember = async () => {
    try {
      const res = await updateSummit(member).unwrap();
      toast.success("Verified");
    } catch (error) {
    } finally {
    }
  };

  const hideUnhideMember = async () => {
    try {
      const res = await hideUnhide(member).unwrap();
      toast.success("Update");
    } catch (error) {
    } finally {
    }
  };

  const handleDelete = async () => {
    setDialogOpen(false);
    const res = await deleteMember(member).unwrap();
    toast.success("Deleted");
  };

  // const country = getCountryLabel(member?.country as string);

  const date = member?.createdAt ? new Date(member?.createdAt) : null;

  let joinedDate = "";

  if (date) {
    joinedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <>
      <TableRow
        key={member.id}
        className="h-full  flex justify-between items-end flex-shrink-0 overflow-x-auto"
      >
        <TableCell className="flex-1 shrink-0 min-w-[300px]  ">
          <div className="flex flex-shrink-0 md:items-end items-center gap-2 relative">
            <Image
              src={member.profileImage || profileImage}
              alt="Image"
              height={100}
              width={100}
              className="md:size-[88px] size-11 rounded-full "
            />
            <div className="">
              <p className="text-lg text-[#263238] font-bold">
                <span>{member.firstName + " " + member.lastName}</span>
              </p>
              <p className="md:text-[16px]  text-[#263238] my-[12px] font-medium">
                Country:{" "}
                <span className="font-light">
                  {getCountryLabel(member?.country ? member.country : "")}
                </span>
              </p>
              <div className="flex items-center gap-2 text-sm flex-shrink-0 ">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_950_4698)">
                      <path
                        d="M4.512 6.27909C4.34453 5.82815 3.6514 5.83618 3.49437 6.29072L2.18637 9.72497C1.97072 10.299 2.842 10.6304 3.06247 10.0587L3.27325 9.50525H4.72768L4.93603 10.0573C5.15821 10.632 6.02653 10.2986 5.81315 9.72631L4.51706 6.29187C4.51547 6.28759 4.51378 6.28334 4.512 6.27909ZM3.63031 8.56775L4.00381 7.58709L4.3739 8.56775H3.63031Z"
                        fill="#1D2939"
                      />
                      <path
                        d="M13.3743 6.89258C13.6331 6.89258 13.843 6.6827 13.843 6.42383C13.843 6.16495 13.6331 5.95508 13.3743 5.95508H11.9199C11.661 5.95508 11.4512 6.16495 11.4512 6.42383V9.87536C11.4512 10.1342 11.661 10.3441 11.9199 10.3441H13.3743C13.6331 10.3441 13.843 10.1342 13.843 9.87536C13.843 9.61648 13.6331 9.40661 13.3743 9.40661H12.3887V8.61833H13.267C13.5259 8.61833 13.7358 8.40845 13.7358 8.14958C13.7358 7.8907 13.5259 7.68083 13.267 7.68083H12.3887V6.89258H13.3743Z"
                        fill="#1D2939"
                      />
                      <path
                        d="M8.5815 6.8652C8.83662 6.8652 9.08262 6.94027 9.29287 7.08233C9.50741 7.22723 9.79878 7.17086 9.94372 6.95633C10.0887 6.74183 10.0322 6.45045 9.81772 6.30552C9.45187 6.05836 9.02441 5.92773 8.5815 5.92773C7.36266 5.92773 6.37109 6.91933 6.37109 8.13814C6.37109 9.35695 7.36266 10.3485 8.5815 10.3485C9.74272 10.3485 10.5537 9.43961 10.5537 8.13814C10.5537 7.87927 10.3438 7.66939 10.085 7.66939H9.04294C8.78406 7.66939 8.57419 7.87927 8.57419 8.13814C8.57419 8.39702 8.78406 8.60689 9.04294 8.60689H9.55615C9.43991 9.03817 9.14469 9.41105 8.5815 9.41105C7.87959 9.41105 7.30859 8.84002 7.30859 8.13814C7.30859 7.43623 7.87959 6.8652 8.5815 6.8652Z"
                        fill="#1D2939"
                      />
                      <path
                        d="M15.5312 7.67578C15.2724 7.67578 15.0625 7.88566 15.0625 8.14453C15.0625 10.031 14.3279 11.8045 12.9939 13.1385C11.66 14.4724 9.88643 15.207 8 15.207C6.11356 15.207 4.34 14.4724 3.00606 13.1385C1.67212 11.8045 0.9375 10.031 0.9375 8.14453C0.9375 6.25806 1.67212 4.48453 3.00606 3.15059C4.34 1.81666 6.11356 1.08203 8 1.08203C8.94603 1.08203 9.86381 1.26575 10.7279 1.62812C11.2212 1.83487 11.689 2.09738 12.1234 2.41059L11.5021 2.48887C10.8923 2.56878 11.0135 3.49425 11.6193 3.41903L13.2962 3.20778C13.5457 3.18712 13.7441 2.94878 13.7179 2.69956L13.5685 1.017C13.5456 0.759125 13.3178 0.568531 13.0601 0.591531C12.8022 0.614437 12.6117 0.842062 12.6346 1.09991L12.6843 1.65912C12.1887 1.30037 11.6542 0.999875 11.0903 0.763531C10.1109 0.352781 9.07118 0.144531 8 0.144531C5.86312 0.144531 3.85415 0.976688 2.34316 2.48769C0.832156 3.99869 0 6.00766 0 8.14453C0 10.2814 0.832156 12.2904 2.34316 13.8014C3.85415 15.3124 5.86312 16.1445 8 16.1445C10.1369 16.1445 12.1458 15.3124 13.6568 13.8014C15.1678 12.2904 16 10.2814 16 8.14453C16 7.88566 15.7901 7.67578 15.5312 7.67578Z"
                        fill="#1D2939"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_950_4698">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0 0.144531)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="font-sans font-[16px] text-secondery">
                    {member.age ? `${member.age}y` : "N/A"}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    className="text-[16px]"
                  >
                    <g clipPath="url(#clip0_950_4752)">
                      <path
                        d="M16.3633 8.14453C16.3633 6.00766 15.5311 3.99869 14.0202 2.48766C12.5091 0.976688 10.5002 0.144531 8.36328 0.144531C6.68853 0.144531 5.09256 0.656031 3.75312 1.60453C3.54328 1.48047 3.29884 1.40897 3.0379 1.40897C2.26034 1.40897 1.62775 2.04156 1.62775 2.81912C1.62775 3.08006 1.69925 3.3245 1.82331 3.53437C0.874812 4.87384 0.363281 6.46978 0.363281 8.14453C0.363281 10.2814 1.19544 12.2904 2.70641 13.8014C4.21744 15.3124 6.2264 16.1445 8.36328 16.1445C10.0379 16.1445 11.6336 15.6327 12.973 14.6842C13.183 14.8085 13.4276 14.8801 13.6887 14.8801C14.4662 14.8801 15.0988 14.2475 15.0988 13.4699C15.0988 13.209 15.0273 12.9645 14.9033 12.7547C15.8518 11.4152 16.3633 9.81928 16.3633 8.14453ZM3.03787 2.34647C3.2985 2.34647 3.51053 2.5585 3.51053 2.81912C3.51053 3.07975 3.2985 3.29178 3.03787 3.29178C2.77725 3.29178 2.56522 3.07975 2.56522 2.81912C2.56522 2.5585 2.77728 2.34647 3.03787 2.34647ZM13.6887 13.9426C13.4281 13.9426 13.216 13.7306 13.216 13.4699C13.216 13.2093 13.4281 12.9973 13.6887 12.9973C13.9493 12.9973 14.1613 13.2093 14.1613 13.4699C14.1613 13.7306 13.9493 13.9426 13.6887 13.9426ZM14.1825 12.1492C14.0287 12.0915 13.8623 12.0598 13.6887 12.0598C12.9111 12.0598 12.2785 12.6924 12.2785 13.4699C12.2785 13.6435 12.3102 13.8097 12.3678 13.9633C11.1989 14.7715 9.81471 15.207 8.36328 15.207C6.47681 15.207 4.70328 14.4724 3.36934 13.1385C2.03541 11.8045 1.30078 10.031 1.30078 8.14453C1.30078 6.69312 1.73616 5.30884 2.54431 4.13994C2.69803 4.19756 2.86431 4.22928 3.03787 4.22928C3.81544 4.22928 4.44803 3.59669 4.44803 2.81912C4.44803 2.64559 4.41634 2.47937 4.35875 2.32572C5.52769 1.51756 6.91184 1.08203 8.36328 1.08203C10.2497 1.08203 12.0233 1.81666 13.3572 3.15059C14.6912 4.48453 15.4258 6.25806 15.4258 8.14453C15.4258 9.59594 14.9906 10.9803 14.1825 12.1492Z"
                        fill="#1D2939"
                      />
                      <path
                        d="M13.371 4.54746C13.371 3.7699 12.7384 3.1373 11.9609 3.1373C11.678 3.1373 11.4144 3.22137 11.1934 3.36537C10.3642 2.87246 9.39668 2.58887 8.36403 2.58887C5.30075 2.58887 2.80859 5.08102 2.80859 8.14431C2.80859 9.17699 3.09222 10.1445 3.58509 10.9737C3.44109 11.1947 3.35706 11.4582 3.35706 11.7411C3.35706 12.5187 3.98966 13.1513 4.76722 13.1513C5.05006 13.1513 5.31353 13.0673 5.53453 12.9233C6.36378 13.4162 7.33137 13.6997 8.36406 13.6997C11.4273 13.6997 13.9195 11.2076 13.9195 8.14431C13.9195 7.11162 13.6359 6.14415 13.143 5.31493C13.287 5.0939 13.371 4.83037 13.371 4.54746ZM11.9609 4.0748C12.2215 4.0748 12.4335 4.28684 12.4335 4.54746C12.4335 4.80809 12.2215 5.02012 11.9609 5.02012C11.7002 5.02012 11.4882 4.80809 11.4882 4.54746C11.4882 4.28684 11.7002 4.0748 11.9609 4.0748ZM4.76719 12.2138C4.50656 12.2138 4.29453 12.0018 4.29453 11.7411C4.29453 11.4805 4.50656 11.2685 4.76719 11.2685C5.02781 11.2685 5.23984 11.4805 5.23984 11.7411C5.23984 12.0018 5.02781 12.2138 4.76719 12.2138ZM8.36403 12.7622C7.54569 12.7622 6.77675 12.5478 6.1095 12.1728C6.1534 12.0367 6.17734 11.8917 6.17734 11.7411C6.17734 10.9636 5.54475 10.331 4.76719 10.331C4.61653 10.331 4.47141 10.355 4.33519 10.3989C3.96025 9.73171 3.74606 8.96259 3.74606 8.14427C3.74606 5.59793 5.81765 3.52634 8.364 3.52634C9.18231 3.52634 9.95128 3.7408 10.6185 4.11571C10.5746 4.25187 10.5507 4.39687 10.5507 4.54743C10.5507 5.32499 11.1832 5.95759 11.9608 5.95759C12.1114 5.95759 12.2564 5.93362 12.3925 5.88974C12.7674 6.55699 12.9819 7.32596 12.9819 8.14431C12.982 10.6906 10.9104 12.7622 8.36403 12.7622Z"
                        fill="#1D2939"
                      />
                      <path
                        d="M9.32436 6.47852L8.3633 4.83105L7.40223 6.47852L5.49414 6.48706L6.44067 8.14415L5.49417 9.80124L7.40227 9.80977L8.3633 11.4572L9.32436 9.80977L11.2325 9.80124L10.2859 8.14415L11.2324 6.48706L9.32436 6.47852ZM9.62142 8.87093L8.78452 8.87468L8.3633 9.59668L7.94208 8.87468L7.10517 8.87093L7.5203 8.14415L7.10517 7.41737L7.94208 7.41362L8.3633 6.69162L8.78452 7.41362L9.62142 7.41737L9.2063 8.14415L9.62142 8.87093Z"
                        fill="#1D2939"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_950_4752">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.363281 0.144531)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="font-sans font-[16px] text-secondery">
                    {member.state ? member.state.slice(0, 12) : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TableCell>

        <TableCell className="flex-1 shrink-0 min-w-[180px]">
          <p className="text-[16px] text-[#263238]  font-medium">
            Membership:{" "}
            <span className="font-light">
              {member.planName ? member.planName : "N/A"}
            </span>
          </p>
          <p className="text-[16px] text-[#263238] mt-[12px] font-medium">
            Email :<span className="font-light">{member.email || ""}</span>
          </p>
        </TableCell>

        <TableCell className="flex-1 mt-[12px] flex-shrink-0 gap-2  min-w-[200px] text-wrap">
          <p>Joined Date</p>
          <p className="font-light mt-[12px]">{joinedDate}</p>
        </TableCell>
        <TableCell className="flex flex-shrink-0 gap-2 justify-end flex-1 min-w-[250px]">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={handleVerifyMember}
                  disabled={isUpdatingSummit}
                  className={` border rounded px-3 py-[6px]  ${
                    member.summitVerify ? "bg-[rgba(0,229,8,0.20)]" : ""
                  }`}
                >
                  {isUpdatingSummit ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M14.7148 4.35156L6.36328 12.7109L2.01172 8.35156L2.71484 7.64844L6.36328 11.2891L14.0117 3.64844L14.7148 4.35156Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verify member</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleVerifyMember}
                  disabled={isUpdatingSummit}
                  className={`border rounded px-3 py-[6px] ${
                    member.summitVerify ? "bg-[rgba(0,229,8,0.20)]" : ""
                  }`}
                >
                  {isUpdatingSummit ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M14.7148 4.35156L6.36328 12.7109L2.01172 8.35156L2.71484 7.64844L6.36328 11.2891L14.0117 3.64844L14.7148 4.35156Z"
                        fill="black"
                      />
                    </svg>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verify member</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className=" border rounded px-3 py-[6px]"
                  onClick={hideUnhideMember}
                >
                  {isHideUnhiding ? (
                    <div className="flex gap-2 items-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : member.status == "ACTIVE" ? (
                    <IoEyeOffOutline className="text-[16px]" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M1.73698 8.23224C1.68142 8.08256 1.68142 7.91792 1.73698 7.76824C2.27812 6.45614 3.19666 5.33427 4.37616 4.54484C5.55567 3.75541 6.94301 3.33398 8.36232 3.33398C9.78162 3.33398 11.169 3.75541 12.3485 4.54484C13.528 5.33427 14.4465 6.45614 14.9876 7.76824C15.0432 7.91792 15.0432 8.08256 14.9876 8.23224C14.4465 9.54434 13.528 10.6662 12.3485 11.4556C11.169 12.2451 9.78162 12.6665 8.36232 12.6665C6.94301 12.6665 5.55567 12.2451 4.37616 11.4556C3.19666 10.6662 2.27812 9.54434 1.73698 8.23224Z"
                        stroke="#344054"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.36328 10C9.46785 10 10.3633 9.10457 10.3633 8C10.3633 6.89543 9.46785 6 8.36328 6C7.25871 6 6.36328 6.89543 6.36328 8C6.36328 9.10457 7.25871 10 8.36328 10Z"
                        stroke="#344054"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hide filter and sort member</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setDialogOpen(true)}
                      className="border rounded px-3 py-[6px]"
                    >
                      {isDeleting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M7.0306 3.33236H9.69726C9.69726 2.97873 9.55679 2.6396 9.30674 2.38955C9.05669 2.1395 8.71755 1.99902 8.36393 1.99902C8.01031 1.99902 7.67117 2.1395 7.42112 2.38955C7.17107 2.6396 7.0306 2.97873 7.0306 3.33236ZM6.0306 3.33236C6.0306 3.02594 6.09095 2.72252 6.20821 2.43943C6.32547 2.15634 6.49735 1.89911 6.71402 1.68244C6.93069 1.46577 7.18791 1.2939 7.471 1.17664C7.7541 1.05938 8.05751 0.999023 8.36393 0.999023C8.67035 0.999023 8.97377 1.05938 9.25686 1.17664C9.53995 1.2939 9.79718 1.46577 10.0138 1.68244C10.2305 1.89911 10.4024 2.15634 10.5196 2.43943C10.6369 2.72252 10.6973 3.02594 10.6973 3.33236H14.5306C14.6632 3.33236 14.7904 3.38503 14.8841 3.4788C14.9779 3.57257 15.0306 3.69975 15.0306 3.83236C15.0306 3.96496 14.9779 4.09214 14.8841 4.18591C14.7904 4.27968 14.6632 4.33236 14.5306 4.33236H13.6506L12.8706 12.4064C12.8108 13.025 12.5226 13.5992 12.0624 14.0169C11.6021 14.4346 11.0028 14.6659 10.3813 14.6657H6.3466C5.72517 14.6658 5.126 14.4344 4.6659 14.0167C4.2058 13.599 3.91775 13.0249 3.85793 12.4064L3.07727 4.33236H2.19727C2.06466 4.33236 1.93748 4.27968 1.84371 4.18591C1.74994 4.09214 1.69727 3.96496 1.69727 3.83236C1.69727 3.69975 1.74994 3.57257 1.84371 3.4788C1.93748 3.38503 2.06466 3.33236 2.19727 3.33236H6.0306ZM7.36393 6.49902C7.36393 6.36641 7.31125 6.23924 7.21748 6.14547C7.12372 6.0517 6.99654 5.99902 6.86393 5.99902C6.73132 5.99902 6.60415 6.0517 6.51038 6.14547C6.41661 6.23924 6.36393 6.36641 6.36393 6.49902V11.499C6.36393 11.6316 6.41661 11.7588 6.51038 11.8526C6.60415 11.9463 6.73132 11.999 6.86393 11.999C6.99654 11.999 7.12372 11.9463 7.21748 11.8526C7.31125 11.7588 7.36393 11.6316 7.36393 11.499V6.49902ZM9.86393 5.99902C9.99654 5.99902 10.1237 6.0517 10.2175 6.14547C10.3113 6.23924 10.3639 6.36641 10.3639 6.49902V11.499C10.3639 11.6316 10.3113 11.7588 10.2175 11.8526C10.1237 11.9463 9.99654 11.999 9.86393 11.999C9.73132 11.999 9.60415 11.9463 9.51038 11.8526C9.41661 11.7588 9.36393 11.6316 9.36393 11.499V6.49902C9.36393 6.36641 9.41661 6.23924 9.51038 6.14547C9.60415 6.0517 9.73132 5.99902 9.86393 5.99902ZM4.85327 12.3104C4.88922 12.6815 5.06209 13.0259 5.33818 13.2764C5.61426 13.527 5.97376 13.6658 6.3466 13.6657H10.3813C10.7541 13.6658 11.1136 13.527 11.3897 13.2764C11.6658 13.0259 11.8386 12.6815 11.8746 12.3104L12.6466 4.33236H4.08127L4.85327 12.3104Z"
                            fill="#FF0000"
                          />
                        </svg>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete member</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </DialogDescription>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 border border-gray-300 rounded px-4 py-2"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white rounded px-4 py-2"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </DialogContent>
          </Dialog> */}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {/* ✅ asChild avoids nesting issues */}
            <DialogTrigger asChild>
              {/* ✅ TooltipTrigger also needs asChild to avoid button inside button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* ✅ This button is now used by both DialogTrigger and TooltipTrigger */}
                    <button
                      onClick={() => setDialogOpen(true)}
                      className="border rounded px-3 py-[6px]"
                    >
                      {isDeleting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M7.0306 3.33236H9.69726C9.69726 2.97873 9.55679 2.6396 9.30674 2.38955C9.05669 2.1395 8.71755 1.99902 8.36393 1.99902C8.01031 1.99902 7.67117 2.1395 7.42112 2.38955C7.17107 2.6396 7.0306 2.97873 7.0306 3.33236ZM6.0306 3.33236C6.0306 3.02594 6.09095 2.72252 6.20821 2.43943C6.32547 2.15634 6.49735 1.89911 6.71402 1.68244C6.93069 1.46577 7.18791 1.2939 7.471 1.17664C7.7541 1.05938 8.05751 0.999023 8.36393 0.999023C8.67035 0.999023 8.97377 1.05938 9.25686 1.17664C9.53995 1.2939 9.79718 1.46577 10.0138 1.68244C10.2305 1.89911 10.4024 2.15634 10.5196 2.43943C10.6369 2.72252 10.6973 3.02594 10.6973 3.33236H14.5306C14.6632 3.33236 14.7904 3.38503 14.8841 3.4788C14.9779 3.57257 15.0306 3.69975 15.0306 3.83236C15.0306 3.96496 14.9779 4.09214 14.8841 4.18591C14.7904 4.27968 14.6632 4.33236 14.5306 4.33236H13.6506L12.8706 12.4064C12.8108 13.025 12.5226 13.5992 12.0624 14.0169C11.6021 14.4346 11.0028 14.6659 10.3813 14.6657H6.3466C5.72517 14.6658 5.126 14.4344 4.6659 14.0167C4.2058 13.599 3.91775 13.0249 3.85793 12.4064L3.07727 4.33236H2.19727C2.06466 4.33236 1.93748 4.27968 1.84371 4.18591C1.74994 4.09214 1.69727 3.96496 1.69727 3.83236C1.69727 3.69975 1.74994 3.57257 1.84371 3.4788C1.93748 3.38503 2.06466 3.33236 2.19727 3.33236H6.0306ZM7.36393 6.49902C7.36393 6.36641 7.31125 6.23924 7.21748 6.14547C7.12372 6.0517 6.99654 5.99902 6.86393 5.99902C6.73132 5.99902 6.60415 6.0517 6.51038 6.14547C6.41661 6.23924 6.36393 6.36641 6.36393 6.49902V11.499C6.36393 11.6316 6.41661 11.7588 6.51038 11.8526C6.60415 11.9463 6.73132 11.999 6.86393 11.999C6.99654 11.999 7.12372 11.9463 7.21748 11.8526C7.31125 11.7588 7.36393 11.6316 7.36393 11.499V6.49902ZM9.86393 5.99902C9.99654 5.99902 10.1237 6.0517 10.2175 6.14547C10.3113 6.23924 10.3639 6.36641 10.3639 6.49902V11.499C10.3639 11.6316 10.3113 11.7588 10.2175 11.8526C10.1237 11.9463 9.99654 11.999 9.86393 11.999C9.73132 11.999 9.60415 11.9463 9.51038 11.8526C9.41661 11.7588 9.36393 11.6316 9.36393 11.499V6.49902C9.36393 6.36641 9.41661 6.23924 9.51038 6.14547C9.60415 6.0517 9.73132 5.99902 9.86393 5.99902ZM4.85327 12.3104C4.88922 12.6815 5.06209 13.0259 5.33818 13.2764C5.61426 13.527 5.97376 13.6658 6.3466 13.6657H10.3813C10.7541 13.6658 11.1136 13.527 11.3897 13.2764C11.6658 13.0259 11.8386 12.6815 11.8746 12.3104L12.6466 4.33236H4.08127L4.85327 12.3104Z"
                            fill="#FF0000"
                          />
                        </svg>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete member</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>

            {/* ✅ Dialog content for confirmation */}
            <DialogContent>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </DialogDescription>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 border border-gray-300 rounded px-4 py-2"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white rounded px-4 py-2"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>

      <ViewMemberDialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        member={member}
      />

      <DeleteMemberDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        // onDelete={handleDelete}
        memberName={member.firstName + member.lastName}
      />
    </>
  );
};

export default MemberTableRow;
