export interface Transaction {
  id: string;
  userEmail: string;
  subscriptionPlane: string; // Could be a specific set of values like "Standard Membership", etc.
  subscriptionId: string;
  date: string; // Date string in ISO format
  amount: number;
  tranId: string;
  status: "paid" | "unpaid" | "pending"; // Define more status values if needed
  hosted_invoice_url: string;
  invoice_pdf: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface ReceiptData {
  transaction: Transaction;
  companyName: string;
  companyAddress: string;
}
