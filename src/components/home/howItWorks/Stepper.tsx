import React from 'react';

export const Stepper = () => {
  return (
    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-blue-100 -translate-x-1/2">
      {/* Dotted line */}
      <div className="w-px h-full border-dotted border-2 absolute left-1/2 top-0 -translate-x-1/2"></div>

      {/* Step 1 */}
      <div className="absolute top-0 left-1/2 w-8 h-8 rounded-full bg-white shadow-sm  text-blue-400 flex items-center justify-center -translate-x-1/2 border-2 border-blue-500">
        1
      </div>
      {/* Step 2 */}
      <div className="absolute top-1/3 left-1/2 w-8 h-8 rounded-full bg-white shadow-sm  text-blue-400 flex items-center justify-center -translate-x-1/2 border-2 border-blue-500">
        2
      </div>
      {/* Step 3 */}
      <div className="absolute top-2/3 left-1/2 w-8 h-8 rounded-full bg-white shadow-sm  text-blue-400 flex items-center justify-center -translate-x-1/2 border-2 border-blue-500">
        3
      </div>
      {/* Step 4 */}
      <div className="absolute bottom-0 left-1/2 w-8 h-8 rounded-full bg-white shadow-sm  text-blue-400 flex items-center justify-center -translate-x-1/2 border-2 border-blue-500">
        4
      </div>
    </div>
  );
};
