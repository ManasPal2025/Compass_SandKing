"use client";

import React, { useState } from "react";
import { DriftInterestSubmission } from "@/types";

export function DriftInterestForm() {
  const [formData, setFormData] = useState<DriftInterestSubmission>({
    name: "",
    emailOrPhone: "",
    city: "",
    vehicleOrRide: "",
    instagram: "",
    reason: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("A note about Drift");
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email or phone: ${formData.emailOrPhone}`,
        `City: ${formData.city}`,
        `Machine / vehicle: ${formData.vehicleOrRide || "Not provided"}`,
        `Instagram: ${formData.instagram || "Not provided"}`,
        "",
        "Why I would like to Drift:",
        formData.reason,
      ].join("\n"),
    );
    window.location.href = `mailto:contact@saraswatmishra.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="border border-[#262421] bg-[#121110] p-8 md:p-12 text-center space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#b08968] block">
          EMAIL READY
        </span>
        <h3 className="text-2xl font-serif text-[#f5f3ef]">
          Thank you, {formData.name}.
        </h3>
        <p className="text-sm font-mono text-[#8a847b] max-w-md mx-auto leading-relaxed">
          Your email app should open with the note filled in. Review it and press Send to complete your message; nothing is sent before you do.
        </p>
      </div>
    );
  }

  return (
    <form
      id="drift-interest"
      onSubmit={handleSubmit}
      className="border border-[#22201e] bg-[#121110] p-6 sm:p-10 space-y-6"
    >
      <div className="border-b border-[#201e1b] pb-4">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#aba59c] block">
          EXPRESSION OF INTEREST
        </span>
        <p className="text-xs text-[#6e6860] mt-1">
          No commercial booking. Simply let Saraswat know who you are and why you want to join.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="drift-name" className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block">
            Your Name *
          </label>
          <input
            type="text"
            id="drift-name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="First and last name"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-3 text-base text-[#f5f3ef] placeholder-[#857f76] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="drift-contact" className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block">
            Email or Phone *
          </label>
          <input
            type="text"
            id="drift-contact"
            name="emailOrPhone"
            required
            inputMode="email"
            value={formData.emailOrPhone}
            onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            placeholder="How to reach you"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-3 text-base text-[#f5f3ef] placeholder-[#857f76] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="drift-city" className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block">
            City of Residence *
          </label>
          <input
            type="text"
            id="drift-city"
            name="city"
            required
            autoComplete="address-level2"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Bhubaneswar, Bangalore, Delhi"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-3 text-base text-[#f5f3ef] placeholder-[#857f76] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="drift-vehicle" className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block">
            Machine / Vehicle
          </label>
          <input
            type="text"
            id="drift-vehicle"
            name="vehicleOrRide"
            value={formData.vehicleOrRide}
            onChange={(e) => setFormData({ ...formData, vehicleOrRide: e.target.value })}
            placeholder="What would you ride or drive?"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-3 text-base text-[#f5f3ef] placeholder-[#857f76] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="drift-instagram" className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block">
          Instagram Handle (Optional)
        </label>
        <input
          type="text"
          id="drift-instagram"
          name="instagram"
          value={formData.instagram}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          placeholder="@yourhandle"
          className="w-full bg-[#181715] border border-[#2b2824] px-4 py-3 text-base text-[#f5f3ef] placeholder-[#857f76] focus:outline-none focus:border-[#b08968] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="drift-reason" className="text-xs font-mono uppercase tracking-wider text-[#aba59c] block">
          Why do you want to Drift? *
        </label>
        <textarea
          required
          id="drift-reason"
          name="reason"
          rows={4}
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          placeholder="Tell Saraswat what kind of road you are looking for..."
          className="w-full bg-[#181715] border border-[#2b2824] p-4 text-base text-[#f5f3ef] placeholder-[#857f76] focus:outline-none focus:border-[#b08968] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 bg-[#f5f3ef] hover:bg-[#e4dfd5] text-[#0c0b0a] font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors"
      >
        Prepare email
      </button>
    </form>
  );
}
