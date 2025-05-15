"use client";

import ProfileCard from "./ProfileCard";
import { useGetMyfavQuery, useMyfavAddMutation } from "@/redux/Api/favariteApi";
import SavedProfileLoader from "../savedProfileLoader/SavedProfileLoader";
import { toast } from "sonner";

// interface Profile {
//   userId: string;
//   id: string;
//   name: string;
//   age: number;
//   businessType: string;
//   travelType: string;
//   travelBegins: string;
//   destinationCountry: string;
//   accommodation: boolean;
//   profileImage: string | null;
// }

export default function SavedProfiles() {
  // const [wishlist, setWishlist] = useState("");
  const [removeFavouriteList, { isLoading: isRemovingFavouriteList }] =
    useMyfavAddMutation();

  const {
    data: profiles,
    isLoading: favLoading,
    isError: favError,
  } = useGetMyfavQuery(undefined);

  const handleRemoveWishlist = async (id: string) => {
    const toastID = toast.loading("Removing from saved profile");

    try {
      // const data = { userId: "676a9bd761dc0b21407f4c08" };
      const res = await removeFavouriteList({ userId: id }).unwrap();

      if (res?.success) {
        toast.success("Removed from saved Profile", { id: toastID });
      } else {
        toast.error("Failed to remove from profile", { id: toastID });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastID });
    }
  };

  return (
    <div className="p-6 mt-[100px] md:mt-[178px] text-[#1D293] container mx-auto">
      <h1 className="font-sans text-3xl md:text-5xl font-semibold text-center md:text-left mb-6">
        All of your <span className="text-primary">saved profiles</span>
      </h1>

      {favLoading ? (
        <div>
          <SavedProfileLoader />
          <SavedProfileLoader />
          <SavedProfileLoader />
        </div>
      ) : favError ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <p className="bg-white w-full h-44 flex justify-center items-center rounded">
            No saved profiles found.
          </p>
        </div>
      ) : !profiles?.data?.length ? (
        <p className="bg-white w-full h-44 flex justify-center items-center rounded">
          No saved profiles found.
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6">
            {profiles?.data?.map((profile: any) => (
              <ProfileCard
                key={profile.userId}
                profile={profile}
                handleRemoveWishlist={handleRemoveWishlist}
                isRemovingFavouriteList={isRemovingFavouriteList}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
