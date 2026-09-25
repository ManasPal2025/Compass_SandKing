import { GarageMachine } from "@/types";

/**
 * STRUCTURAL PLACEHOLDERS ONLY
 * Machines will be treated as characters in Saraswat's story once real data is supplied.
 * Zero fabricated vehicle ownership, specifications, or travel stories.
 */
export const garageMachines: GarageMachine[] = [
  {
    id: "machine-01",
    slug: "machine-01",
    name: "Machine 01",
    type: "Motorcycle",
    model: "Two-Wheeler [Details TBD]",
    year: "—",
    role: "Long-Range Companion",
    heroImage: {
      src: "/images/placeholders/garage_bike.jpg",
      alt: "Adventure motorcycle parked on a gravel mountain ridge overlook",
      caption: "Provisional visual asset — awaiting authentic photography of Saraswat's machine.",
    },
    story: "Provisional character lore. When authentic records are provided, this will capture the machine's personality and why it became an essential part of Saraswat's journeys, rather than a list of showroom specifications.",
    status: "In Active Rotation",
    keyNotes: [
      "Character note to be supplied by Saraswat",
      "Field observation placeholder",
      "Road lore placeholder",
    ],
    specs: {
      displacement: "—",
      power: "—",
      range: "—",
      characterTrait: "Unfussy, dependable companion",
    },
    isStructuralPlaceholder: true,
  },
  {
    id: "machine-02",
    slug: "machine-02",
    name: "Machine 02",
    type: "Automobile",
    model: "Four-Wheeler [Details TBD]",
    year: "—",
    role: "Overland Rig",
    heroImage: {
      src: "/images/placeholders/garage_rig.jpg",
      alt: "Overland 4x4 vehicle parked in deep foggy pine forest",
      caption: "Provisional visual asset — awaiting authentic photography of Saraswat's vehicle.",
    },
    story: "Provisional character lore. Structural placeholder for Saraswat's four-wheel companion, carrying camp provisions and camera equipment wherever asphalt ends.",
    status: "In Active Rotation",
    keyNotes: [
      "Character note to be supplied by Saraswat",
      "Field observation placeholder",
      "Overland note placeholder",
    ],
    specs: {
      displacement: "—",
      power: "—",
      range: "—",
      characterTrait: "Built for self-supported escape",
    },
    isStructuralPlaceholder: true,
  },
];
