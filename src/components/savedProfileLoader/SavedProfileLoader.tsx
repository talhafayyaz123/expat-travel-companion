

const SavedProfileLoader = () => {
  return (
    <div className="bg-white mt-7 rounded-lg shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="relative w-full h-72 sm:h-96 md:h-96 lg:w-[479px] lg:h-[351px]">
            <div className="h-full bg-gray-200 rounded-2xl"></div>
          </div>
          <div className="flex-1 w-full">
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-2 mt-2">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mt-2 md:mt-0"></div>
              </div>

              <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
            </div>

            <div className="flex flex-col sm:flex-row mt-8 gap-4">
              <div className="h-10 bg-gray-200 rounded w-full sm:w-48"></div>
              <div className="h-10 bg-gray-200 rounded w-full sm:w-48 mt-2 sm:mt-0"></div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default SavedProfileLoader