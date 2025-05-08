import React from "react";

const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props} // Allow passing additional props like className, style, etc.
    >
      <g clipPath="url(#clip0_699_3259)">
        <path
          d="M18 2C20.206 2 22 3.794 22 6V18C22 20.206 20.206 22 18 22H6C3.794 22 2 20.206 2 18V6C2 3.794 3.794 2 6 2H18ZM18 0H6C2.686 0 0 2.686 0 6V18C0 21.314 2.686 24 6 24H18C21.314 24 24 21.314 24 18V6C24 2.686 21.314 0 18 0Z"
          fill="#E00000"
        />
        <path
          d="M6 12C6 11.448 6.447 11 7 11H17C17.552 11 18 11.448 18 12C18 12.552 17.552 13 17 13H7C6.447 13 6 12.552 6 12Z"
          fill="#E00000"
        />
      </g>
      <defs>
        <clipPath id="clip0_699_3259">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MinusIcon;
