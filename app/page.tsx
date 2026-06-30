"use client";

import { FormEvent, useState } from "react";

import { submitBooking } from "@/lib/api/booking-client";
import { getMinCheckoutDate, getNextDay, getTodayString } from "@/lib/helper/helper";
import type { BookingPayload } from "@/models/booking.model";

const initialForm: BookingPayload = {
  bookingType: "",
  checkInDate: "",
  checkOutDate: "",
  guests: "",
  contactName: "",
  contactNumber: "",
};

export default function Home() {
  const [form, setForm] = useState<BookingPayload>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const todayString = getTodayString();
  const minCheckoutDate = getMinCheckoutDate(form.checkInDate, todayString);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionError(null);

    try {
      await submitBooking({
        ...form,
        submittedAt: new Date().toISOString(),
      });

      setSubmitted(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Unable to submit booking request."
      );
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((prev) => {
      if (name === "checkInDate") {
        return {
          ...prev,
          checkInDate: value,
          checkOutDate: getNextDay(value),
        };
      }

      if (name === "checkOutDate" && prev.checkInDate && value < prev.checkInDate) {
        return { ...prev, checkOutDate: getNextDay(prev.checkInDate) };
      }

      return { ...prev, [name]: value };
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-slate-800"
      style={{ backgroundImage: "url('/images/resort.jpg')" }}
    >
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),_transparent_35%),linear-gradient(135deg,_rgba(253,242,248,0.95)_0%,_rgba(239,246,255,0.95)_100%)]">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:px-8 lg:py-16">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                Bathan's Getaway Booking App
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Reserve your perfect getaway in a few simple steps.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  <b>Unplug. Unwind. Unforgettable.</b> Your private resort for celebrations big & small! Dive into relaxation at our exclusive resort, where every moment brings family fun and adventure.
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">🏊 6ft Pool + Kiddie Pool Safe for kids & adults, exclusive use</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">🎤 Karaoke + Sports Court Basketball, volleyball, ATV rides</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">🅿️ NO Corkage Fee Bring your own food & drinks!</p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Book Your Stay</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Enter your details and our team will confirm availability shortly.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Booking Type
                  <select
                    name="bookingType"
                    value={form.bookingType}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                    required
                  >
                    <option value="">Select booking type</option>
                    <option value="Day Tour">Day Tour</option>
                    <option value="Staycation">Staycation</option>
                  </select>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Check-in Date
                    <input
                      type="date"
                      name="checkInDate"
                      value={form.checkInDate}
                      onChange={handleChange}
                      min={todayString}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                      required
                    />
                  </label>

                  <label className="block text-sm font-medium">
                    Check-out Date
                    <input
                      type="date"
                      name="checkOutDate"
                      value={form.checkOutDate}
                      onChange={handleChange}
                      min={minCheckoutDate}
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                      required
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium">
                  Guests / No. of Pax
                  <input
                    type="number"
                    min="1"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    placeholder="2"
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                    required
                  />
                </label>

                <label className="block text-sm font-medium">
                  Contact Person
                  <input
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                    required
                  />
                </label>

                <label className="block text-sm font-medium">
                  Contact Number
                  <input
                    type="tel"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    placeholder="+63 912 345 6789"
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Request Reservation
              </button>

              {submitted ? (
                <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                  Thank you! Your booking request has been received.
                </p>
              ) : null}

              {submissionError ? (
                <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                  {submissionError}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}
