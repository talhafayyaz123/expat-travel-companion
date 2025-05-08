"use client";
import { GoFileDirectoryFill } from "react-icons/go";
import * as React from "react";

import { Transaction } from "@/types/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getReceiptData } from "./action";
import { generatePDF } from "@/utilities/pdf-generator";
import { formatCurrency, formatDate } from "@/utilities/format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlRefresh } from "react-icons/sl";
import { LiaFilterSolid, LiaSearchSolid } from "react-icons/lia";
import SearchBox from "../FilterHomeData/SearchBox";
// import { transactions } from "@/constants/transsactions";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useAllTransactionQuery } from "@/redux/Api/transactionApi";

const PaymentTable = () => {
  const [searchBoxOpen, setSearchBoxOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(10);
  // Destructuring correctly from the query result
  const { data: allTransaction, isLoading: transactionLoading } =
    useAllTransactionQuery(undefined);
  const { data: thisDayTransaction, isLoading: thisDayTransactionLoading } =
    useAllTransactionQuery(undefined);
  const { data: totalRevinue, isLoading: totalRevinueLoading } =
    useAllTransactionQuery(undefined);
  const {
    data: totalMember,
    isLoading: totalMemberLoading,
    error: totalMemberError,
  } = useAllTransactionQuery(undefined);

  // Optionally handle loading state or errors
  if (
    transactionLoading ||
    thisDayTransactionLoading ||
    totalRevinueLoading ||
    totalMemberLoading
  ) {
    return <div>Loading...</div>;
  }

  // Handle changing items per page
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to the first page
  };

  // Filtered Transactions based on Search Query
  const filteredTransactions = allTransaction?.data.filter(
    (t: Transaction) =>
      t.tranId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subscriptionPlane.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const visiblePages = 8; // Number of visible pages
    const paginationNumbers: (number | string)[] = [];

    if (totalPages > visiblePages) {
      if (currentPage > 5) {
        paginationNumbers.push(1, 2, 3, 4, "...");
      }

      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        paginationNumbers.push(i);
      }

      if (currentPage < totalPages - 4) {
        paginationNumbers.push("...", totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.push(i);
      }
    }

    return paginationNumbers;
  };

  // Handle search query
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update the search query
    setSearchBoxOpen(false); // Close the search dialog
    setCurrentPage(1); // Reset to the first page
  };

  const downloadReceipt = async (transaction: Transaction) => {
    try {
      const receiptData = await getReceiptData(transaction);
      const pdfDataUrl = generatePDF(receiptData);

      const link = document.createElement("a");
      link.href = pdfDataUrl;
      link.download = `receipt-${transaction.tranId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
    }
  };

  return (
    <div className="space-y-4 bg-white p-[12px] rounded-[12px]">
      <div className="flex justify-between items-center flex-shrink-0">
        <h2 className="text-ts font-semibold">Payment History</h2>

        <div className="flex gap-2 md:gap-2 items-center">
          <LiaSearchSolid
            className="cursor-pointer md:text-[24px] text-[#48535B]"
            onClick={() => setSearchBoxOpen(true)} // Open the search dialog
          />

          <SlRefresh
            className="cursor-pointer md:text-[24px] text-[#48535B]"
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
          />

          {/* Border */}
          <div className="h-[30px] border-r "></div>

          {/* Pagination Selection */}
          <Select onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="md:w-[100px] w-[50px] rounded-[12px] text-[#667085]">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent className="text-[#667085]">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Date</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Amount Paid</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData?.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.tranId}</TableCell>
                  <TableCell>{transaction.subscriptionPlane}</TableCell>
                  <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => downloadReceipt(transaction)}
                      title="Download Receipt"
                    >
                      <GoFileDirectoryFill className="h-4 w-4" />
                      <span className="sr-only">Download receipt</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center py-4 ">
        <button
          className="text-white bg-gray-600  disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 rounded-full flex justify-center items-center"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FaArrowLeft />
        </button>
        <div className="flex gap-2 mx-4">
          {getPaginationNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={idx}
                className={`w-8 h-8 rounded-full ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setCurrentPage(Number(page))}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          className="text-white bg-gray-600  disabled:opacity-50 w-8 h-8 rounded-full flex justify-center items-center"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Search Dialog */}
      <SearchBox
        isOpen={searchBoxOpen}
        onClose={() => setSearchBoxOpen(false)} // Close search dialog
        onSearch={handleSearch} // Trigger search
      />
    </div>
  );
};

export default PaymentTable;
