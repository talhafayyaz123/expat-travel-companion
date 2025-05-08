export interface Member {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  summitMember?: string;
  summitVerify?: boolean;
  dob?: Date;
  zodiac?: string;
  age?: number;
  country?: string;
  phoneNumber?: string;
  isDeleted?: boolean;
  haveRoom?: boolean;
  state?: string;
  otp?: number;
  expirationOtp?: Date;
  isPayment?: boolean;
  subscriptionId?: string;
  planName?: string;
  customerId?: string;
  verificationImage?: string;
  priceId?: string;
  profileImage?: string;
  role?: UserRoleEnum; 
  status?: UserStatus; 
  createdAt?: Date;
  updatedAt?: Date;
}


export enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
