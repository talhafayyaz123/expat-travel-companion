import { Button } from "@/components/ui/button";
import { getTravelTypeLabel } from "@/constants/traveType";
import { Heart } from "lucide-react";
import Image from "next/image";

interface SearchResultProps {
  name: string;
  age: number;
  businessType: string;
  travelType: string;
  travelBegins: string;
  destination: string;
  imageUrl: string;
}

function SearchResultCard({
  name,
  age,
  businessType,
  travelType,
  travelBegins,
  destination,
  imageUrl,
}: SearchResultProps) {
  console.log(businessType);

  return (
    <div className="flex gap-4 rounded-lg border bg-white p-4">
      <div className="relative h-32 w-32 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-lg object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-sm text-gray-500">Age: {age}y</span>
        </div>
        <div className="space-y-1 text-sm">
          <p>Business type: {businessType}</p>
          <p>Travel type: {getTravelTypeLabel(travelType)}</p>
          <p>Travel begins: {travelBegins}</p>
          <p>Destination Country: {destination}</p>
          {/* <p>Accommodation: {accommodation}</p> */}
        </div>
        <Button variant="outline" className="w-full">
          See profile details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export function SearchResults() {
  const results = [
    {
      name: "Sarah Thompson",
      age: 25,
      businessType: "Accounting & Finance",
      travelType: "Scouting Trip (1-6 weeks)",
      travelBegins: "May 2024",
      destination: "Africa",
      imageUrl: "/placeholder.svg",
    },
    // Add more results as needed
  ];

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <SearchResultCard key={index} {...result} />
      ))}
    </div>
  );
}
