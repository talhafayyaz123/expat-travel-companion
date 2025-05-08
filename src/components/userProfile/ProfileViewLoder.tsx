import React from 'react'

export const ProfileViewLoder = () => {
  return (
    <div>
        <div className="flex flex-col md:flex-row items-start justify-between p-4 md:p-6 gap-4 bg-white animate-pulse">
  <div className="flex flex-col md:flex-row gap-8 items-center w-full md:w-auto">
    <div className="relative w-32 h-32 md:w-[133px] md:h-[133px] bg-gray-300 rounded-full"></div>
    <div className="text-center md:text-left">
      <div className="h-6 bg-gray-300 rounded w-3/4 my-2"></div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="text-sm">
          <div className="block text-lg md:text-[18px] font-semibold font-sans h-6 bg-gray-300 rounded w-3/4 my-2"></div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 w-1/2 h-6 bg-gray-300 rounded my-2"></div>
            <div className="flex items-center gap-2 w-1/2 h-6 bg-gray-300 rounded my-2"></div>
          </div>
        </div>
        <div className="text-sm flex flex-col justify-between">
          <div className="text-lg md:text-[18px] font-semibold font-sans h-6 bg-gray-300 rounded w-3/4 my-2"></div>
          <div className="text-lg md:text-[18px] font-semibold font-sans h-6 bg-gray-300 rounded w-3/4 my-2"></div>
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-col items-center gap-6 md:gap-[84px] w-full md:w-auto">
    <div className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 bg-gray-300 rounded-xl text-[#000] text-sm md:text-base font-normal font-sans h-10 w-1/2"></div>
    <div className="text-primary underline text-lg md:text-xl font-semibold h-6 bg-gray-300 rounded w-1/2 my-2"></div>
  </div>
</div>
    </div>
  )
}
