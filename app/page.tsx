"use client";

import { FormEvent, useState } from "react";

type BookingForm = {
  bookingType: string;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
  contactName: string;
  contactNumber: string;
};

const initialForm: BookingForm = {
  bookingType: "",
  checkInDate: "",
  checkOutDate: "",
  guests: "",
  contactName: "",
  contactNumber: "",
};

const getNextDay = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + 1);

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export default function Home() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const minCheckoutDate = form.checkInDate ? getNextDay(form.checkInDate) : todayString;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),_transparent_35%),linear-gradient(135deg,_#fdf2f8_0%,_#eff6ff_100%)] text-slate-800">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:px-8 lg:py-16">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                Paradise Resort Booking
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Reserve your perfect getaway in a few simple steps.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  Enjoy beachside villas, spa treatments, and island dining with a booking experience designed for effortless planning.
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Ocean View</p>
                  <p>Luxury villas</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Private Dining</p>
                  <p>Sunset dinners</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Spa Access</p>
                  <p>Wellness packages</p>
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
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
