import { ArchiveItem } from "@/types";

/**
 * COMPASS — ARCHIVE DATA ARCHITECTURE
 * 
 * STRUCTURAL PLACEHOLDERS ONLY
 * All entries flagged with isStructuralPlaceholder: true.
 * Awaiting Saraswat's authentic photography archive.
 * Real image assets will be dropped into /public/images/archive/
 * 
 * Strict Authenticity:
 * Zero fabricated locations, dates, or personal claims attached to provisional assets.
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
    date: "Provisional Archive",
    location: "Location Pending",
    image: {
      src: "/images/placeholders/hero_road.jpg",
      alt: "Empty winding asphalt road cutting through misty hills at dawn",
      caption: "Provisional visual asset — awaiting Saraswat's authentic photography archive.",
      aspectRatio: "landscape",
    },
    note: "Curving coastal blacktop holding the mountain line before the morning fog clears.",
    storyParagraphs: [
      "The mist held to the valley floor for forty minutes before the crosswinds from the inlet began to disperse it. Tarmac still damp from early sea spray.",
      "A quiet section of asphalt where the mountain meets the coastal cliffside. No traffic, only the steady rhythm of turns and changing grade.",
      "Structural note: This provisional record demonstrates the primary single-photo editorial layout."
    ],
    relatedJournalSlug: "road-note-01",
    relatedJournalTitle: "Before the Road Wakes",
    gridSpan: "wide",
    isStructuralPlaceholder: true,
  },
  {
    id: "arch-02",
    slug: "frame-02",
    title: "Forest Single Track",
    category: "Nature",
    date: "Provisional Archive",
    location: "Location Pending",
    image: {
      src: "/images/placeholders/archive_trail.jpg",
      alt: "Unpaved forest track through tall pine trees in morning mist",
      caption: "Provisional visual asset — awaiting Saraswat's authentic photography archive.",
      aspectRatio: "square",
    },
    note: "Unpaved forest track through tall pine timber in morning mist.",
    storyParagraphs: [
      "High timber corridors where the road narrows to a single vehicle width. The soil retains the smell of pine bark and morning moisture.",
      "A quiet pause in dense woods where the only motion is moisture dripping from the pine canopy onto the soil.",
      "Structural note: Demonstrates square/portrait crop presentation in the editorial archive."
    ],
    relatedJournalSlug: "road-note-05",
    relatedJournalTitle: "The Smell of Wet Pine and Low Fog",
    gridSpan: "regular",
    isStructuralPlaceholder: true,
  },
  {
    id: "arch-03",
    slug: "frame-03",
    title: "Mountain Saddle",
    category: "Machines",
    date: "Provisional Archive",
    location: "Location Pending",
    image: {
      src: "/images/placeholders/garage_bike.jpg",
      alt: "Adventure motorcycle parked on a gravel mountain ridge overlook",
      caption: "Provisional visual asset — awaiting Saraswat's authentic photography archive.",
      aspectRatio: "landscape",
    },
    note: "Long-range companion paused on a high pass gravel overlook.",
    storyParagraphs: [
      "Heat radiating from the engine headers into the thin alpine air. A quick breather while checking tire pressures on the loose gravel descent.",
      "Structural note: Demonstrates a photo-series story with supporting sequence imagery below the narrative."
    ],
    gallery: [
      {
        src: "/images/placeholders/hero_road.jpg",
        alt: "The winding approach road viewed from above",
        caption: "Series frame 02 — The switchback climb leading up to the ridge.",
        aspectRatio: "landscape",
      },
    ],
    relatedJournalSlug: "road-note-03",
    relatedJournalTitle: "Field Repair on a Rainy Afternoon",
    gridSpan: "regular",
    isStructuralPlaceholder: true,
  },
  {
    id: "arch-04",
    slug: "frame-04",
    title: "Woods Clearing",
    category: "Places",
    date: "Provisional Archive",
    location: "Location Pending",
    image: {
      src: "/images/placeholders/garage_rig.jpg",
      alt: "Overland vehicle in foggy damp woods at first light",
      caption: "Provisional visual asset — awaiting Saraswat's authentic photography archive.",
      aspectRatio: "landscape",
    },
    note: "Overland rig in foggy damp woods at first light.",
    storyParagraphs: [
      "Tailgate down, camp kettle heating over the single burner. Silence broken only by distant wind through the canopy.",
      "Remote woodland pull-off reached after dusk, documented at the first break of daylight through the pine trees.",
      "Structural note: Demonstrates place and setting documentation."
    ],
    gridSpan: "regular",
    isStructuralPlaceholder: true,
  },
  {
    id: "arch-05",
    slug: "frame-05",
    title: "The Fog Line",
    category: "Moments",
    date: "Provisional Archive",
    location: "Location Pending",
    image: {
      src: "/images/placeholders/archive_trail.jpg",
      alt: "A split-second moment where cloud cover meets the forest edge",
      caption: "Provisional visual asset — transitory atmosphere.",
      aspectRatio: "wide",
    },
    note: "A brief pause where the trees give way to low cloud.",
    storyParagraphs: [
      "A transitory weather window where the cloud ceiling dropped below the tree line for twenty minutes before lifting back into the upper peaks.",
      "Photographs kept not for technical perfection, but for the memory of what the air felt like at that exact turn."
    ],
    gridSpan: "wide",
    isStructuralPlaceholder: true,
  },
  {
    id: "arch-06",
    slug: "frame-06",
    title: "Pass Summit Approach",
    category: "Roads",
    date: "Provisional Archive",
    location: "Location Pending",
    image: {
      src: "/images/placeholders/hero_road.jpg",
      alt: "Road surface and shoulder gradient approaching the mountain summit",
      caption: "Provisional visual asset — pavement texture and road geometry.",
      aspectRatio: "landscape",
    },
    note: "The final switchback before the descent begins.",
    storyParagraphs: [
      "The asphalt texture changes as the elevation climbs above the tree line. Rougher aggregate, sharper curves, and colder winds.",
      "Documenting the geometries of roads that leave an impression."
    ],
    relatedJournalSlug: "road-note-02",
    relatedJournalTitle: "The 40-Kilometer Silence",
    gridSpan: "regular",
    isStructuralPlaceholder: true,
  },
];
