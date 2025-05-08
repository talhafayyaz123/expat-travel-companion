import React from "react";
interface text {
  text: string;
}
const HeaderWithoutBorder = ({ text }: text) => {
  return (
    <h3 className="pt-3 font-semibold w-max mb-3 text-[#263238] md:text-[24px] text-[16px] max-sm:text-wrap max-md:max-w-full">
      {text}
    </h3>
  );
};

export default HeaderWithoutBorder;
