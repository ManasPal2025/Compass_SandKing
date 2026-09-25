import { DriftTrip } from "@/types";

/**
 * DRIFT PHILOSOPHY & MANIFESTO
 * Drift is completely non-commercial.
 * No packages, no tour guides, no bookings, no commercial transactions.
 * "Saraswat is already going somewhere. If this sounds like your kind of trip, you can ask to come along."
 */
export const driftManifesto = {
  headline: "THE OPEN PASSENGER SEAT",
  tagline: "Sometimes you don't need another tourist vacation. You just need to step away from monotonous routine for a few days.",
  principles: [
    "Saraswat is already heading out on this road.",
    "This is not a packaged tour, a commercial booking, or a guided holiday.",
    "Everyone pulls their own weight, splits fuel and chai, and respects the silence of the road.",
    "No itineraries etched in stone — only general directions and an open horizon.",
  ],
};

/**
 * STRUCTURAL PLACEHOLDER FOR UPCOMING DRIFT
 * Flagged with isStructuralPlaceholder: true.
 * Zero invented routes, destinations, or dates.
 */
export const upcomingDrift: DriftTrip | null = {
  id: "drift-expedition-01",
  slug: "upcoming-drift-01",
  title: "Upcoming Drift [Route TBD]",
  destination: "Route Under Charting",
  dates: "Upcoming Season",
  duration: "Provisional Timeline",
  generalRoute: "Route outline to be confirmed by Saraswat.",
  about: "Provisional expedition profile. Saraswat charts journeys for himself; when the route and timing are confirmed, this will outline the journey for like-minded people interested in asking to join.",
  suitableFor: [
    "Riders or drivers comfortable with unhurried pace and variable road conditions",
    "People who remain adaptable when weather or terrain requires route changes",
    "Those who value the solitude of the road over structured commercial itineraries",
  ],
  expectations: [
    "Shared road expenses (fuel, modest stops, split costs)",
    "Independent mechanical readiness for your own machine",
    "Pure non-commercial travel with fellow wanderers",
  ],
  isOpenForInterest: true,
  isStructuralPlaceholder: true,
};
