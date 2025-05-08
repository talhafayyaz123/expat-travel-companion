import Link from "next/link";
import { useGetLifestyleUserQuery } from "@/redux/Api/lifeCicleApi";
import { useParams } from "next/navigation";
import { LifeStyleViwLoder } from "../userProfile/LifeStyleViwLoder";
import { getIndustryLabel } from "@/constants/industry";
import { useGetUserQuery } from "@/redux/Api/userApi";

type ProfLifestyleData = {
  id: string;
  monthlyBudget: number;
  maritalStatus: string;
  ethnicity: string;
  religion: string;
  children: string;
  pets: string;
  education: string;
  employmentStatus: string;
  haveBusiness: boolean;
  industry: string;
  companyName: string;
  serviceDes: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  website: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export const ProfLifeStyleView: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetLifestyleUserQuery(id);
  const membership = data?.data?.user?.planName;

  const lifestyleUser = data?.data;

  if (isLoading)
    return (
      <div className="container my-16">
        <LifeStyleViwLoder />
      </div>
    );
  if (isError)
    return (
      <div className=" my-16">
        <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-[#1D2939] text-center md:text-left pb-5">
          LifeStyle
        </h2>
      </div>
    );

  if (isError)
    return (
      <div>
        <div className="container mx-auto my-44 text-center">
          <p className="text-red-500">no lifestyle available.</p>
        </div>
      </div>
    );

  return (
    <div>
      {/* Lifestyle Section */}
      <section className="mt-16">
        {/* <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-[#1D2939] text-center md:text-left py-5">
      Lifestyle</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Max Monthly Rent
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              ${lifestyleUser?.monthlyBudget || "N/A"}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Marital Status
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              {lifestyleUser?.maritalStatus || "N/A"}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Ethnicity
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              {lifestyleUser?.ethnicity || "N/A"}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Religion/Spirituality
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              {lifestyleUser?.religion || "N/A"}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Children
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              {lifestyleUser?.children || "N/A"}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Pets
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              {lifestyleUser?.pets || "N/A"}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Employment Status
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              {lifestyleUser?.employmentStatus || "N/A"}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
              Education
            </h3>
            <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
              {lifestyleUser?.education || "N/A"}
            </p>
          </div>
        </div>
      </section>
      {membership !== "Standard Membership" && (
        <div>
          {/* My Business Section */}
          {lifestyleUser?.haveBusiness && (
            <section className="mt-16">
              <h2 className="text-xl font-semibold mb-6">My Business</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                <div className="col-span-1">
                  <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
                    Industry
                  </h3>
                  <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
                    {getIndustryLabel(lifestyleUser?.industry)}
                  </p>
                </div>
                <div className="col-span-1">
                  <h3 className="text-[#344054] font-sans font-semibold text-[18px] leading-[22.32px] mb-1">
                    Company Name
                  </h3>
                  <p className="text-[#475467] font-sans text-[18px] font-normal leading-[30px]">
                    {lifestyleUser?.companyName || "N/A"}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Description of Services Section */}
          <section className="mt-16">
            <h2 className="text-xl font-semibold mb-6">
              Description of Services
            </h2>
            <textarea
              placeholder="Please share here.."
              value={lifestyleUser?.serviceDes || ""}
              readOnly
              className="w-full min-h-[120px] p-3 bg-gray-100 border border-gray-300 rounded-lg text-[#475467] font-sans text-[16px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </section>

          {/* Social Media Links */}
          <section className="mt-16">
            <h2 className="text-[18px] font-semibold mb-3 font-sans">
              Visit us online
            </h2>
            <div className="flex flex-row">
              {lifestyleUser?.facebook && (
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-[55px] cursor-pointer underline text-primary font-sans font-medium text-[18px]">
                    Facebook
                  </span>
                </Link>
              )}
              {lifestyleUser?.instagram && (
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-[55px] cursor-pointer underline text-primary font-sans font-medium text-[18px]">
                    Instagram
                  </span>
                </Link>
              )}

              {lifestyleUser?.linkedin && (
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-[55px] cursor-pointer underline text-primary font-sans font-medium text-[18px]">
                    Linkedin
                  </span>
                </Link>
              )}
            </div>
            <div className="mt-6">
              {lifestyleUser?.youtube && (
                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-[55px] cursor-pointer underline text-primary font-sans font-medium text-[18px]">
                    Youtube
                  </span>
                </Link>
              )}

              {lifestyleUser?.website && (
                <Link
                  href={lifestyleUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-[55px] cursor-pointer underline text-primary font-sans font-medium text-[18px]">
                    Website
                  </span>
                </Link>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
