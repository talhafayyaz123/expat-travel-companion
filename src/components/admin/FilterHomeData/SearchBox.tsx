import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import React, { useState } from "react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);

    if (query.length > 5) {
      setQuery("");
      onClose();
    }
    // Close dialog after search

    setQuery("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = event.currentTarget.value;
      onSearch(query);
      if (query.length >= 5) {
        setQuery("");
        onClose();
      } // Optionally close the search box
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* DialogTrigger can be handled externally, here we do not need an extra button */}

      <DialogTrigger />

      <DialogContent>
        <div
          onClick={onClose}
          className="absolute  top-4 cursor-pointer right-3"
        >
          <X size={24} />
        </div>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Enter your search query</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for members"
            className="border p-2"
            onKeyDown={handleKeyDown}
          />

          <div className="flex justify-end gap-2">
            <Button
              className="bg-gray-500 text-white px-6 py-2 rounded-full"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBox;
