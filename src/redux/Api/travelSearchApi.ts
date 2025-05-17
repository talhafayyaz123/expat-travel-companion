import baseApi from "./baseApi";

const travelSearchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSearch: build.query({
      query: (params: Record<string, string | number | boolean | null>) => {
        const cleanedParams = Object.entries(params).reduce(
          (acc, [key, value]) => {
            if (value !== null) {
              if (
                value === null &&
                (key === "haveRoom" || key === "summitVerify")
              ) {
                acc[key] = false;
              } else {
                acc[key] = value;
              }
            }
            return acc;
          },
          {} as Record<string, string | number | boolean>
        );

        const queryParams = new URLSearchParams(
          cleanedParams as Record<string, string>
        ).toString();
        return {
          // url: `/users?${queryParams}`,
          url: `/users?${queryParams}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUserSearchQuery, useLazyUserSearchQuery } = travelSearchApi;
