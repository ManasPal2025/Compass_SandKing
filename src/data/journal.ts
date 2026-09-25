import { JournalEntry } from "@/types";

/**
 * COMPASS — JOURNAL DATA ARCHITECTURE
 * 
 * STRUCTURAL PLACEHOLDERS ONLY
 * All entries flagged with isStructuralPlaceholder: true.
 * Real entries will be provided by Saraswat in his authentic voice.
 * Zero fabricated travel experiences, fake personal history, or invented facts.
 * 
 * Supports:
 * - Varied editorial rhythm (prominent, compact, featured, fragment)
 * - Single photograph entries
 * - Multi-photograph entries
 * - Typography-only entries (no image)
 * - Multi-paragraph long-form reflections
 */
export const journalEntries: JournalEntry[] = [
  {
    id: "journal-01",
    slug: "road-note-01",
    title: "Before the Road Wakes",
    date: "Provisional Date",
    location: "Mountain Pass · Shoulder",
    type: "road-note",
    excerpt: "The cold air off the ridge before morning traffic begins. A stillness that only exists when engines are cold.",
    content: "Structural placeholder for Saraswat's authentic road note. When his actual writing is provided, this will contain his unedited observations from the saddle or the passenger seat.",
    bodyParagraphs: [
      "There is a particular kind of stillness that exists only at high elevation in the hour before the first transport trucks begin their haul. The asphalt is still damp with night mist, and every mechanical click of cooling metal resonates with crisp clarity.",
      "No itinerary, no mileage targets to prove to anyone. Just the immediate geometry of the upcoming corner, the clean line of the tarmac, and the rhythm of the road.",
      "Structural note: This placeholder demonstrates how Saraswat's genuine multi-paragraph travel observations and roadside reflections will render with print-like typography."
    ],
    image: {
      src: "/images/placeholders/hero_road.jpg",
      alt: "Curving mountain road through mist — provisional placeholder",
      caption: "Provisional visual asset — awaiting Saraswat's authentic road photography.",
      aspectRatio: "landscape",
    },
    tags: ["Dispatch", "Solitude", "Highland"],
    readingTime: "2 min read",
    layoutVariant: "prominent",
    isStructuralPlaceholder: true,
  },
  {
    id: "journal-02",
    slug: "road-note-02",
    title: "The 40-Kilometer Silence",
    date: "Provisional Date",
    location: "Paved Byway",
    type: "observation",
    excerpt: "When the helmet visor clicks shut and the internal dialogue finally slows down to match the speed of the landscape.",
    content: "Structural placeholder for a quiet observation on solitude, movement, and mental clarity on the open highway.",
    bodyParagraphs: [
      "Forty kilometers of steady tarmac without a junction or a traffic signal has an interesting way of resetting thoughts. The digital noise of everyday routine dissolves into the background hum of the tires.",
      "You stop calculating where you need to be by evening and simply notice the shift from pine scent to damp earth as the elevation drops.",
      "Structural note: Demonstrates purely typographic editorial layout with no accompanying photography. Confirms the journal remains beautiful and readable in pure prose."
    ],
    tags: ["Observation", "Solitude"],
    readingTime: "1 min read",
    layoutVariant: "compact",
    isStructuralPlaceholder: true,
  },
  {
    id: "journal-03",
    slug: "road-note-03",
    title: "Field Repair on a Rainy Afternoon",
    date: "Provisional Date",
    location: "Workshop Shed",
    type: "mechanical",
    excerpt: "Mechanical pauses are not interruptions to the journey; they are simply where the machine demands its share of attention.",
    content: "Structural placeholder for a mechanical incident, roadside fix, or unhurried workshop maintenance note.",
    bodyParagraphs: [
      "A loose fastener or a weeping gasket at mile marker 180 is not a catastrophe unless you are in a hurry. Unfolding the canvas tool roll on dry grass and taking thirty unhurried minutes to diagnose the issue is often where the real memory of the trip begins.",
      "Machines have their own language. If you pay attention, they tell you what is wearing out miles before it actually gives way.",
      "Structural note: Demonstrates dual-photograph support in journal entries, showing how mechanical lore, workshop notes, and gear documentation fit harmoniously into the narrative."
    ],
    image: {
      src: "/images/placeholders/garage_bike.jpg",
      alt: "Adventure motorcycle parked on high mountain pass — provisional placeholder",
      caption: "Provisional visual asset 01 — long-range machine.",
      aspectRatio: "landscape",
    },
    images: [
      {
        src: "/images/placeholders/garage_bike.jpg",
        alt: "Adventure motorcycle parked on high mountain pass — provisional placeholder",
        caption: "Provisional visual asset 01 — field service on the pass.",
        aspectRatio: "landscape",
      },
      {
        src: "/images/placeholders/garage_rig.jpg",
        alt: "Overland rig in misty forest — provisional placeholder",
        caption: "Provisional visual asset 02 — recovery gear and tools.",
        aspectRatio: "landscape",
      }
    ],
    tags: ["Wrenching", "Patience", "Machines"],
    readingTime: "3 min read",
    layoutVariant: "featured",
    isStructuralPlaceholder: true,
  },
  {
    id: "journal-04",
    slug: "road-note-04",
    title: "On Stepping Away from the Routine",
    date: "Provisional Date",
    location: "Edge of Nowhere",
    type: "thought",
    excerpt: "Nobody ever remembered the year they stayed at their desk and answered every single message on time.",
    content: "A short reflective fragment on freedom, slowing down, self-love, and unhurried wandering.",
    bodyParagraphs: [
      "Nobody ever looks back on a year and feels proud of answering emails twenty seconds faster. The days that actually stick in your memory are the ones where you took the left fork simply because you didn't know what was at the end of it.",
      "Stepping away is not escapism. It is basic maintenance of your relationship with the living world.",
      "Structural note: Minimalist note fragment emphasizing typographic weight and quiet white space."
    ],
    tags: ["Reflection", "Freedom", "Life"],
    readingTime: "1 min read",
    layoutVariant: "fragment",
    isStructuralPlaceholder: true,
  },
  {
    id: "journal-05",
    slug: "road-note-05",
    title: "The Smell of Wet Pine and Low Fog",
    date: "Provisional Date",
    location: "Highland Forest",
    type: "dispatch",
    excerpt: "A short dispatch from a gravel pull-off where timber meets the low-hanging cloud bank.",
    content: "Structural placeholder for atmospheric field dispatches written immediately after shutting off the engine.",
    bodyParagraphs: [
      "The gravel crunches under boots, and the only sound left is water droplets falling from needle to needle onto the moss below.",
      "You don't need a destination when the air feels like this. Five minutes sitting on the log with a warm cup of coffee is worth twelve hours of driving.",
      "Structural note: Demonstrates atmospheric visual pairing with single landscape editorial image."
    ],
    image: {
      src: "/images/placeholders/archive_trail.jpg",
      alt: "Misty pine forest trail — provisional placeholder",
      caption: "Provisional visual asset — quiet trail through pine mist.",
      aspectRatio: "landscape",
    },
    tags: ["Dispatch", "Nature", "Atmosphere"],
    readingTime: "2 min read",
    layoutVariant: "prominent",
    isStructuralPlaceholder: true,
  }
];
