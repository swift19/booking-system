import { API_ENDPOINTS } from "@/lib/constants/api";
import { HEADERS } from "@/lib/constants/constant";
import type { BookingPayload } from "@/models/booking.model";

export async function submitBooking(payload: BookingPayload) {
  const response = await fetch(API_ENDPOINTS.BOOKING, {
    method: "POST",
    headers: HEADERS.JSON,
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to submit booking request.");
  }

  return data;
}
