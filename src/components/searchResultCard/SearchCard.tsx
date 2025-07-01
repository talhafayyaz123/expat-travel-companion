import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useLazyUserSearchQuery } from "@/redux/Api/travelSearchApi";
import SearchResultCard from "./SearchResultCard";
import FilterLoder from "./FilterLoder";
import { setPage } from "@/redux/allSlice/travelSearchSlice";
import { useGetMyfavQuery } from "@/redux/Api/favariteApi";

interface Result {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  destination: Array<{
    TravelBegins: string;
    destinationCountry: string;
    travelType: string;
  }>;
  profileImage: string;
  lifestyle: {
    industry: string;
    monthlyBudget: number;
  };
  haveRoom: boolean;
  gender: string;
  memberSeeking: string;
  summitVerify: boolean;
}

export function SearchCard() {
  const dispatch = useDispatch();
  const travelForm = useSelector((state: RootState) => state?.travelSearch);
  const currentPage = travelForm.page;
  const itemsPerPage = travelForm.limit;

  const { data: favouriteList, isLoading: isLoadingFavouriteList } =
    useGetMyfavQuery([]);
  const [triggerUserSearch, { data, isLoading }] = useLazyUserSearchQuery();
  const [loadingParams, setLoadingParams] = useState(false);

  // Scroll To Top When Page Changes
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (travelForm) {
      const params = Object.entries(travelForm).reduce((acc, [key, value]) => {
        if (value !== "" && value !== 0) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string | number>);

      if (Object.keys(params).length > 0) {
        setLoadingParams(true);
        triggerUserSearch(params).finally(() => setLoadingParams(false));
      }
    }
  }, [travelForm, triggerUserSearch]);

  const searchItem = data?.data?.data || [];

  const totalResults = data?.data?.meta?.total || 0;

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const renderLoader = () => (
    <>
      <FilterLoder />
      <FilterLoder />
      <FilterLoder />
    </>
  );

  const renderResults = () => {
    if (searchItem.length === 0) {
      return (
        <div className="h-[296px] bg-white rounded-3xl flex items-center justify-center flex-shrink-0">
          No results found
        </div>
      );
    }

    // Filter out users in the favorite list
    // const transformedData = !isLoadingFavouriteList
    //   ? searchItem.filter(
    //       (result: Result) =>
    //         !favouriteList?.data?.some(
    //           (user: any) => user?.userId === result?.id
    //         )
    //     )
    //   : searchItem;

    // Map over the transformed data
    return searchItem.map((result: Result) => {
      const {
        id,
        firstName,
        lastName,
        age,
        destination,
        profileImage,
        lifestyle,
        haveRoom,
        gender,
        memberSeeking,
        summitVerify,
      } = result;

      // Handle undefined destination
      const {
        TravelBegins = "N/A",
        destinationCountry = "N/A",
        travelType = "N/A",
      } = destination?.[0] || {};

      return (
        <SearchResultCard
          key={id}
          id={id}
          name={`${firstName} ${lastName}`}
          age={age}
          industry={lifestyle?.industry || "N/A"}
          travelType={travelType}
          travelBegins={TravelBegins}
          destinationCountry={destinationCountry}
          haveRoom={haveRoom.toString()}
          profileImage={profileImage}
          gender={gender}
          memberSeeking={memberSeeking}
          monthlyBudget={lifestyle?.monthlyBudget || ""}
          summitVerify={summitVerify}
        />
      );
    });
  };
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-5 flex-wrap max-w-full overflow-hidden">
        <div className="flex gap-2 px-4 flex-wrap justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setPage(page))}
              className={`px-4 py-2 border rounded ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-white border-primary text-primary"
              } hover:bg-primary hover:text-white transition`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[55px] lg:col-span-2 md:col-span-2">
      {loadingParams || isLoading ? renderLoader() : renderResults()}
      {renderPagination()}
    </div>
  );
}
