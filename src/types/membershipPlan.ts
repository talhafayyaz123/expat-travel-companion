export interface membershipPlan {
  id: string;
  amount: number;
  name: string;

  interval: string;
  priceId: string;
  features: { title: string }[];
}
