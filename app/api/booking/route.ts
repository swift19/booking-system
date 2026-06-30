import { NextResponse } from "next/server";

import { submitBookingToN8n } from "@/lib/api/booking-webhook";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    await submitBookingToN8n(payload);

    return NextResponse.json(
      {
        success: true,
        message: "Booking request sent successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "We could not send your booking request right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
