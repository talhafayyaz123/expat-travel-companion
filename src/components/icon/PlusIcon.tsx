import React from "react";

interface PlusIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  width = 21,
  height = 21,
  fill = "#0872BA",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
      className={className}
    >
      <path
        d="M16.2073 11.2398H11.2418V16.2053H9.58661V11.2398H4.62109V9.58466H9.58661V4.61914H11.2418V9.58466H16.2073V11.2398Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlusIcon;
