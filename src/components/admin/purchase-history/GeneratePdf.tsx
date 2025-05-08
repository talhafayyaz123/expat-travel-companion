import { ReceiptData } from "@/types/transaction";
import { jsPDF } from "jspdf";

// This function generates a PDF for an array of receipt data
export function generatePDF(receiptData: ReceiptData[]) {
  const doc = new jsPDF();

  // Title of the document
  doc.setFontSize(18);
  doc.text("All Transaction Receipts", 14, 20);

  let yOffset = 30; // Starting Y position

  receiptData.forEach((data, index) => {
    const { transaction, companyName, companyAddress } = data;

    // Add transaction details
    doc.setFontSize(12);
    doc.text(`Transaction ${index + 1}:`, 14, yOffset);
    yOffset += 10;
    doc.text(`Company: ${companyName}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Address: ${companyAddress}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Transaction ID: ${transaction.tranId}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Amount: ${transaction.amount}`, 14, yOffset);
    yOffset += 15; // Space between transactions

    // Add a line break if necessary
    if (yOffset > 260) {
      doc.addPage();
      yOffset = 20;
    }
  });

  // Return the PDF as a data URL
  return doc.output("dataurlstring");
}
