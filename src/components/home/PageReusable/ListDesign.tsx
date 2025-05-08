// import React from 'react'

// const ListDesign = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default ListDesign

import React from "react";

interface props {
  children: React.ReactNode;
}

const ListDesign = ({ children }: props) => {
  return <li className="ml-6">{children}</li>;
};

export default ListDesign;
