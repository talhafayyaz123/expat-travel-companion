import jsPDF from "jspdf";
import { ReceiptData } from "@/types/transaction";
import { formatDate, formatCurrency } from "./format";

export function generatePDF(data: ReceiptData): string {
  const { transaction, companyName, companyAddress } = data;

  if (!transaction) {
    throw new Error("Transaction data is required");
  }

  const doc = new jsPDF();
  doc.setFont("helvetica");

  // Add company info
  doc.setFontSize(18);
  doc.text(companyName, 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(companyAddress, 105, 30, { align: "center" });

  // Add receipt title
  doc.setFontSize(16);
  doc.text("Receipt", 105, 50, { align: "center" });

  // Add transaction details
  doc.setFontSize(12);
  let y = 70;
  const details = [
    `Transaction ID: ${transaction.tranId}`,
    `Date: ${formatDate(transaction.date)}`,
    `Email: ${transaction.userEmail}`,
    `Membership: ${transaction.subscriptionPlane}`,
    `Status: ${transaction.status}`,
    `Amount: ${formatCurrency(transaction.amount)}`,
  ];

  details.forEach((detail) => {
    doc.text(detail, 20, y);
    y += 10; // Increment y for the next line
  });

  // Return the PDF as a data URL
  return doc.output("dataurlstring");
}
