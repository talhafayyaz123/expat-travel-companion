"use server";

import { Transaction, ReceiptData } from "@/types/transaction";

export async function getReceiptData(
  transaction: Transaction
): Promise<ReceiptData> {
  return {
    transaction,
    companyName: "Expat Global Group",
    companyAddress: "3050 Post Oak Blvd., Suite 510-Q94, Houston, TX. 77056",
  };
}