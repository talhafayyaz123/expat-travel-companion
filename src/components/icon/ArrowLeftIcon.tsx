import React from 'react';

interface ArrowLeftIconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ width, height, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 17"
    fill="none"
  >
    <path
      d="M1 8.88354H15M15 8.88354L8 15.8835M15 8.88354L8 1.88354"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowLeftIcon;
