import { DriftTrip } from "@/types";

/**
 * DRIFT PHILOSOPHY & MANIFESTO
 * Drift is completely non-commercial.
 * No packages, no tour guides, no bookings, no commercial transactions.
 * A non-commercial invitation built around open roads and unhurried travel.
 */
export const driftManifesto = {
  headline: "THE OPEN PASSENGER SEAT",
  tagline: "Sometimes the best way out of routine is a road with no reason to hurry.",
  principles: [
    "An invitation to travel together, never a packaged tour.",
    "No booking fee, guide service, or paid itinerary.",
    "Each traveller remains responsible for their own costs and plans.",
    "Leave room for weather, rest, and the turn you did not expect.",
  ],
};

// Publish a trip here only after its route and timing have been confirmed.
export const upcomingDrift: DriftTrip | null = null;
