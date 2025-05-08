

;
import { Button } from "@/components/ui/button"; // Adjust the import based on your Button component location
import React from "react";
import Link from "next/link";

const Unauthorized: React.FC = () => {




  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <Button className="bg-blue-500 text-white px-4 py-2 rounded">
        <Link href={"/"}> Go to Home</Link>
      </Button>
    </div>
  );
};

export default Unauthorized;
