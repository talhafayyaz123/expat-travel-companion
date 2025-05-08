import React from 'react'

export default function FilterLoder() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-7 rounded-2xl bg-white px-4 py-5 mb-6 shadow-sm animate-pulse">
        <div className="relative h-[200px] md:h-[257px] w-full md:w-[342px] flex-shrink-0">
          <div className="rounded-2xl bg-gray-200 w-full h-full"></div>
          <div className="absolute right-2 top-2 h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 md:mt-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 md:mt-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 md:mt-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 md:mt-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-2 md:mt-3"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded mt-4 w-full"></div>
        </div>
      </div>
    </div>
  )
}
