export interface MembershipPlanType {
  id?: string;
  amount: number;
  name: string;
  priceId?: string;
  productId?: string;
  features: Array<{
    title: string;
  }>;
  description?: string;
  currency?: string;
  billingInterval?: string;
  active?: boolean;
  intervalCount?: number;
  freeTrailDays?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PriceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MembershipPlanType;
}
