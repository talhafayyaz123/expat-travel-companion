import React from "react";
interface text {
  text: string;
}
const HeaderWithBorder = ({ text }: text) => {
  return (
    <h3
      className="  pt-2 sm:pt-3 
      text-base sm:text-lg md:text-xl lg:text-2xl 
      font-semibold 
      border-b 
      w-max 
      mb-2 sm:mb-3 
      border-b-black/75 
      text-[#263238]
      transition-all duration-300 max-sm:text-wrap max-md:max-w-full"
    >
      {text}
    </h3>
  );
};

export default HeaderWithBorder;
