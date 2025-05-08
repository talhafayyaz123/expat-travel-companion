import { LoaderIcon } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100vh] fixed left-0 top-0 flex justify-center items-center bg-opacity-50">
      <LoaderIcon className="animate-spin text-2xl" />
    </div>
  );
};

export default Loader;
