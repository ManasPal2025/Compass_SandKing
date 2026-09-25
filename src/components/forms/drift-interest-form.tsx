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
    // Non-commercial expression of interest
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="border border-[#262421] bg-[#121110] p-8 md:p-12 text-center space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#b08968] block">
          NOTE RECEIVED
        </span>
        <h3 className="text-2xl font-serif text-[#f5f3ef]">
          Thank you, {formData.name}.
        </h3>
        <p className="text-sm font-mono text-[#8a847b] max-w-md mx-auto leading-relaxed">
          Saraswat reviews these notes personally. If the rhythm and route feel like a mutual fit, he will reach out directly.
        </p>
      </div>
    );
  }

  return (
    <form
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
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#8a847b] block">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="First and last name"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-2.5 text-sm text-[#f5f3ef] placeholder-[#4f4b45] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#8a847b] block">
            Email or Phone *
          </label>
          <input
            type="text"
            required
            value={formData.emailOrPhone}
            onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            placeholder="How to reach you"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-2.5 text-sm text-[#f5f3ef] placeholder-[#4f4b45] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#8a847b] block">
            City of Residence *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="e.g. Bhubaneswar, Bangalore, Delhi"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-2.5 text-sm text-[#f5f3ef] placeholder-[#4f4b45] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#8a847b] block">
            Machine / Vehicle
          </label>
          <input
            type="text"
            value={formData.vehicleOrRide}
            onChange={(e) => setFormData({ ...formData, vehicleOrRide: e.target.value })}
            placeholder="What would you ride or drive?"
            className="w-full bg-[#181715] border border-[#2b2824] px-4 py-2.5 text-sm text-[#f5f3ef] placeholder-[#4f4b45] focus:outline-none focus:border-[#b08968] transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#8a847b] block">
          Instagram Handle (Optional)
        </label>
        <input
          type="text"
          value={formData.instagram}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          placeholder="@yourhandle"
          className="w-full bg-[#181715] border border-[#2b2824] px-4 py-2.5 text-sm text-[#f5f3ef] placeholder-[#4f4b45] focus:outline-none focus:border-[#b08968] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#8a847b] block">
          Why do you want to Drift? *
        </label>
        <textarea
          required
          rows={4}
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          placeholder="Tell Saraswat what kind of road you are looking for..."
          className="w-full bg-[#181715] border border-[#2b2824] p-4 text-sm text-[#f5f3ef] placeholder-[#4f4b45] focus:outline-none focus:border-[#b08968] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 bg-[#f5f3ef] hover:bg-[#e4dfd5] text-[#0c0b0a] font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors"
      >
        Send Note to Saraswat
      </button>
    </form>
  );
}
