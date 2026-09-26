/**
 * COMPASS — SARASWAT MISHRA
 * Core TypeScript Data Models
 * 
 * Guiding Principle: "Don't explain who Saraswat is — let them find out, one road at a time."
 * Minimal technology. Maximum personality. Authentic data contracts.
 */

export interface CurrentlyStatus {
  location: string;
  currentMachine: string;
  obsession: string;
  nextDestination: string;
  subtitle: string;
}

export type JournalEntryType = 
  | 'thought' 
  | 'dispatch' 
  | 'observation' 
  | 'mechanical' 
  | 'road-note';

export interface JournalImage {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  date?: string;
  location?: string;
  type: JournalEntryType;
  excerpt?: string;
  content: string; // Core observation or opening fragment
  bodyParagraphs?: string[]; // Multi-paragraph editorial reading
  image?: JournalImage; // Primary photograph (optional)
  images?: JournalImage[]; // Multiple photographs support (optional)
  tags?: string[];
  readingTime?: string;
  layoutVariant?: 'prominent' | 'compact' | 'featured' | 'fragment';
}

export type ArchiveCategory = 
  | 'Roads' 
  | 'Machines' 
  | 'People' 
  | 'Places' 
  | 'Nature' 
  | 'Moments' 
  | 'Trips';

export interface ArchiveGeo {
  lat: number;
  lng: number;
}

export interface ArchiveItem {
  id: string;
  slug: string;
  title: string;
  category: ArchiveCategory;
  date?: string;
  location: string;
  country?: string; // Matching TravelDestination.country
  geo?: ArchiveGeo;     // Extensible foundation for future map layer
  image: {
    src: string;
    alt: string;
    caption?: string;
    aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  };
  note?: string;
  storyParagraphs?: string[];
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
    aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  }>;
  relatedJournalSlug?: string;
  relatedJournalTitle?: string;
  gridSpan?: 'wide' | 'regular' | 'tall';
}

export type MachineType = 'Motorcycle' | 'Automobile' | 'Camera' | 'Drone' | 'Riding gear';
export type MachineCategory = 'Cars' | 'Motorcycles' | 'Capture' | 'Ride kit';

export interface GarageMachine {
  id: string;
  slug: string;
  // Never render. For the owner's reference only.
  privateReference?: string;
  name: string;
  type: MachineType;
  category: MachineCategory;
  year?: number | string;
  role: string; // e.g. "The Long-Distance Wanderer", "The Midnight Runabout"
  heroImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  story: string; // The character lore & why Saraswat loves/rides it ("Story first")
  motto: string;
  use: string;
  contentStatus: 'sample' | 'verified';
  keyNotes: string[]; // Character observations, e.g. "Never refuses an unknown trail"
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  specs?: {
    displacement?: string;
    power?: string;
    range?: string;
    characterTrait?: string;
  };
}

export interface DriftTrip {
  id: string;
  slug: string;
  title: string;
  destination: string;
  dates: string;
  duration: string;
  generalRoute: string;
  about: string;
  suitableFor: string[];
  expectations: string[];
  heroImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  isOpenForInterest: boolean;
}

export interface DriftInterestSubmission {
  name: string;
  emailOrPhone: string;
  city: string;
  vehicleOrRide?: string;
  instagram?: string;
  reason: string; // "Why do you want to Drift?"
}

export interface NavItem {
  label: string;
  href: string;
}
