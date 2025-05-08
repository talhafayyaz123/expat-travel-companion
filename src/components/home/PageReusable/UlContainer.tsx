import React from "react";

interface props {
  children: React.ReactNode;
  listDisc?: any;
}

const UlContainer = ({ listDisc = true, children }: props) => {
  return (
    <ul className={`space-y-4 ${listDisc ? "list-disc" : ""}  md:pl-6 pl-2`}>
      {children}
    </ul>
  );
};

export default UlContainer;
