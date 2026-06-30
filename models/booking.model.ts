export type BookingPayload = {
  bookingType: string;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
  contactName: string;
  contactNumber: string;
  submittedAt?: string;
};
