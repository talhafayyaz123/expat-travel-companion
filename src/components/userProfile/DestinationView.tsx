"use client";

import logo from "@/assets/profile/tabler_edit.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getCountryLabel } from "@/constants/countryOptions";
import {
  useDeleteDestMutation,
  useGetDestinationQuery,
  useGetSingleDesQuery,
} from "@/redux/Api/destinationApi";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DeleteIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CreateDestinationModal } from "./CreateDestinationModal";
import { DestinationLoader } from "./DestinationLoader";
import { UpdateDestinationModal } from "./UpdateDestinationModal";
import { travelOption } from "@/constants/traveType";
import { SquareRadioButton } from "../SquareRadioButton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  haveRoom: boolean;
}

interface Destination {
  id: string;
  travelType: string;
  TravelBegins: string;
  destinationCountry: string;
  destinationCity: string;
  user: User;
}

export const DestinationView: React.FC = () => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [limitedData, setLimitedData] = useState<Destination[] | null>(null);

  const [deleteDestination, { isLoading: isDeleting }] =
    useDeleteDestMutation(); // Hook to delete destination
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false); // State for delete confirmation dialog
  const [destinationToDelete, setDestinationToDelete] = useState<string | null>(
    null
  ); // State to hold the id of the destination to delete

  const { data, isLoading, isError, refetch } =
    useGetDestinationQuery(undefined);
  const { data: singleDestination } = useGetSingleDesQuery(
    selectedDestinationId,
    { skip: !selectedDestinationId }
  );

  const destinationById = singleDestination?.data;

  useEffect(() => {
    if (data?.data?.data) {
      const reversedData = [...data.data.data].reverse(); // Reverse the data
      setLimitedData(reversedData.slice(0, 3)); // Store the latest 3 destinations in state
    }
  }, [data]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDestinationId(null);
  };

  const handleDeleteConfirmation = (id: string) => {
    setDestinationToDelete(id);
    setIsDeleteConfirmationOpen(true); // Show confirmation dialog
  };

  const handleDelete = async () => {
    if (destinationToDelete) {
      try {
        await deleteDestination(destinationToDelete).unwrap(); // Perform the delete action
        setLimitedData(
          (prev) =>
            prev?.filter(
              (destination) => destination.id !== destinationToDelete
            ) || null
        ); // Update the state to remove the deleted destination
        setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
      } catch (error) {}
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog without deleting
  };

  if (isLoading) {
    return (
      <div className="text-center gap-2 mt-10 container w-full">
        <DestinationLoader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p className="bg-white p-4">
          Failed to fetch destinations. Please try again later.
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p className="text-red-500">
          Failed to fetch destinations. Please try again later.
        </p>
      </div>
    );
  }

  // Hide the Create Destination button when there are 3 or more destinations
  const isCreateButtonHidden = data?.data?.data.length >= 3;

  return (
    <section>
      {/* <h2 className="text-[#1D2939] text-2xl lg:text-[40px] font-semibold my-12">
        My Destinations
      </h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {limitedData?.map((destination: Destination, index: number) => {
          const travelType = travelOption.find(
            (curElem) => curElem.value === destination?.travelType
          );
          return (
            <div
              key={destination.id}
              className="max-w-full sm:max-w-[383px] border border-solid border-gray-300 rounded-xl p-[14px]"
            >
              <div className="flex items-center justify-between">
                <div className="text-[#1D2939] font-semibold font-sans text-[16px] sm:text-[18px]">
                  <h2>Destination #{index + 1}</h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 px-2 py-1 border border-solid border-gray-300 rounded-lg relative group"
                    onClick={() => handleDeleteConfirmation(destination.id)} // Show confirmation dialog
                  >
                    <DeleteIcon />
                    <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Delete
                    </span>
                  </Button>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 px-2 py-1 border border-solid border-gray-300 rounded-lg relative group"
                        onClick={() => setSelectedDestinationId(destination.id)}
                      >
                        <Image src={logo} alt="Update icon" />
                        <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Update
                        </span>
                      </Button>
                    </DialogTrigger>
                    {selectedDestinationId && (
                      <UpdateDestinationModal
                        destinationId={selectedDestinationId}
                        destinationById={destinationById as any}
                        onClose={handleCloseDialog}
                        refetch={refetch}
                      />
                    )}
                  </Dialog>
                </div>
              </div>
              <hr className="bg-gray-300 mt-3" />
              <div>
                <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[16px] mt-4">
                  My travel type:
                  <span className="text-[#475467] font-normal ps-1">
                    {travelType?.label}
                  </span>
                </p>
                <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[16px] mt-4">
                  My travel begins:{" "}
                  <span className="text-[#475467] font-normal">
                    {new Date(destination?.TravelBegins).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                      }
                    )}
                  </span>
                </p>
                <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[16px] mt-4">
                  Destination country:{" "}
                  <span className="text-[#475467] font-normal">
                    {getCountryLabel(destination?.destinationCountry)}
                  </span>
                </p>
                <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[16px] mt-4">
                  Destination city:{" "}
                  <span className="text-[#475467] font-normal">
                    {destination?.destinationCity || "N/A"}
                  </span>
                </p>

                {/* <p className="font-sans text-[#344054] font-medium text-[16px] sm:text-[18px] mt-4">
                Have a room:{" "}
                <span className="text-[#475467] font-normal">
                  {destination?.user?.haveRoom ? "Yes" : "No"}
                </span>
              </p> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={isDeleteConfirmationOpen}
        onOpenChange={setIsDeleteConfirmationOpen}
      >
        <DialogContent className="fixed inset-0 flex items-center justify-center p-6 bg-black/30 z-50 ">
          <div className="p-5 bg-white ">
            <VisuallyHidden>
              <DialogTitle>Delete Confirmation</DialogTitle>
            </VisuallyHidden>
            <p className="text-xl">
              Are you sure you want to delete this destination?
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Button variant="outline" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleating.." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isCreateButtonHidden ? (
        <div className="mt-4 mx-5 text-center text-gray-500">
          You have reached the limit for creating destinations. Please remove an
          existing destination before adding a new one.
        </div>
      ) : (
        <div className="mt-4 ">
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 px-2 py-1 border border-solid border-gray-300 rounded-lg"
              >
                Create Destination
                {/* <div className="relative group">
                  <Required />
               
                  <span className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Type each city of interest - separate with a comma.
                  </span>
                </div> */}
              </Button>
            </DialogTrigger>
            <CreateDestinationModal
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </Dialog>
          <p className="py-2 text-xs">
            You may create up to three &#40;3&#41; destinations.
          </p>
        </div>
      )}
    </section>
  );
};
