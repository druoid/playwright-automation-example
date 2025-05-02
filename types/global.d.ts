// Declare global types
export {};

declare global {
  interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    dateofBirth?: { day: number; month: number; year: string };
    address: string;
    company: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
    cardnumber?: string;
    cardexpirymonth?: string;
    cardexpiryyear?: string;
    cardcvv?: string;
  }
}
