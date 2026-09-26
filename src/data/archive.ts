import { ArchiveItem } from "@/types";

/**
 * COMPASS — ARCHIVE DATA ARCHITECTURE
 * 
 * Illustrative image studies paired with evergreen scene notes.
 * 
 * Strict Authenticity:
 * Exact places and dates are omitted until verified details are available.
 * 
 * Supports:
 * - Asymmetric editorial visual grid
 * - Photo series (single photo vs multi-photo editorial sequence)
 * - Journal loop integration (FROM THE JOURNAL →)
 * - Understated category grouping
 */
export const archiveItems: ArchiveItem[] = [
  {
    id: "arch-01",
    slug: "frame-01",
    title: "Coastal Ridge Pass",
    category: "Roads",
    location: "Coastal road",
    country: "Australia",
    image: {
      src: "/images/placeholders/hero_road.jpg",
      alt: "Empty winding asphalt road cutting through misty hills at dawn",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "landscape",
    },
    note: "A road between high ground and open water, softened by low cloud.",
    storyParagraphs: [
      "The road follows the edge of the land, bending in and out of the mist. Sea, hillside, and asphalt share the frame without asking for a fixed destination.",
      "Some landscapes are best read slowly: one curve, one opening in the cloud, one view that disappears as quickly as it arrived."
    ],
    relatedJournalSlug: "road-note-01",
    relatedJournalTitle: "Before the Road Wakes",
    gridSpan: "wide",
  },
  {
    id: "arch-02",
    slug: "frame-02",
    title: "Forest Single Track",
    category: "Nature",
    location: "Pine forest",
    country: "Japan",
    image: {
      src: "/images/placeholders/archive_trail.jpg",
      alt: "Unpaved forest track through tall pine trees in morning mist",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "square",
    },
    note: "A narrow trail disappears into tall pines and morning mist.",
    storyParagraphs: [
      "The trees draw the eye forward until the path becomes a thin line in the haze. Light reaches the ground in fragments, changing with every step.",
      "A forest asks for a different pace. The distance matters less than what comes into view along the way."
    ],
    relatedJournalSlug: "road-note-05",
    relatedJournalTitle: "The Smell of Wet Pine and Low Fog",
    gridSpan: "regular",
  },
  {
    id: "arch-03",
    slug: "frame-03",
    title: "Mountain Saddle",
    category: "Machines",
    location: "Mountain pass",
    country: "Switzerland",
    image: {
      src: "/images/placeholders/garage_bike.jpg",
      alt: "Adventure motorcycle parked on a gravel mountain ridge overlook",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "landscape",
    },
    note: "A machine at rest, held against the scale of the mountains.",
    storyParagraphs: [
      "Metal, stone, weather, and distance share a quiet frame. The motorcycle gives the landscape a human scale without taking it over.",
      "On a mountain road, even a pause feels like part of the route. The view opens; the next bend can wait."
    ],
    gallery: [
      {
        src: "/images/placeholders/hero_road.jpg",
        alt: "The winding approach road viewed from above",
        caption: "An illustrative view of a road climbing through the highlands.",
        aspectRatio: "landscape",
      },
    ],
    relatedJournalSlug: "road-note-03",
    relatedJournalTitle: "Field Repair on a Rainy Afternoon",
    gridSpan: "regular",
  },
  {
    id: "arch-04",
    slug: "frame-04",
    title: "Woods Clearing",
    category: "Places",
    location: "Forest clearing",
    country: "Czechia",
    image: {
      src: "/images/placeholders/garage_rig.jpg",
      alt: "Overland vehicle in foggy damp woods at first light",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "landscape",
    },
    note: "A vehicle in the trees; the space around it feels still and unhurried.",
    storyParagraphs: [
      "The forest closes in around the clearing, then gives the eye a little room. A vehicle is one small part of a much larger landscape.",
      "Here the frame is about shelter and space: the pause between leaving the road and deciding where to go next."
    ],
    gridSpan: "regular",
  },
  {
    id: "arch-05",
    slug: "frame-05",
    title: "The Fog Line",
    category: "Moments",
    location: "Low cloud",
    country: "New Zealand",
    image: {
      src: "/images/placeholders/archive_trail.jpg",
      alt: "A split-second moment where cloud cover meets the forest edge",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "wide",
    },
    note: "A brief opening where the trees give way to cloud.",
    storyParagraphs: [
      "Fog turns familiar shapes into silhouettes and makes the distance feel close. The forest seems to end, then begins again a few metres later.",
      "The moment does not need a name or a map pin. Its value is in the atmosphere that the image manages to keep."
    ],
    gridSpan: "wide",
  },
  {
    id: "arch-06",
    slug: "frame-06",
    title: "Pass Summit Approach",
    category: "Roads",
    location: "Highland road",
    country: "Australia",
    image: {
      src: "/images/placeholders/hero_road.jpg",
      alt: "Road surface and shoulder gradient approaching the mountain summit",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "landscape",
    },
    note: "A road's rhythm is written in its turns, not only in its distance.",
    storyParagraphs: [
      "The line of a road can make a landscape legible. It leads the eye across the slope, around a bend, and toward the next change in light.",
      "Roads are practical things, but a good curve has its own quiet geometry."
    ],
    relatedJournalSlug: "road-note-02",
    relatedJournalTitle: "The 40-Kilometer Silence",
    gridSpan: "regular",
  },
];
