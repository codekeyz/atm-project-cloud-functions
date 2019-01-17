export interface Package {
  name: string;
  desc: string;
  numberOfATMS: number;
  price: number;
  timePurchased: Date;
  isActivated: boolean;
  hasExpired: boolean;
}
