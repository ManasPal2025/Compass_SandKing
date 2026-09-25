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
  lastUpdated: string;
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
  date: string;
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
  isStructuralPlaceholder?: boolean;
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
  date: string;
  location: string;
  coordinates?: string; // Text representation e.g. "19.8135° N, 85.8312° E"
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
  isStructuralPlaceholder?: boolean;
}

export type MachineType = 'Motorcycle' | 'Automobile';

export interface GarageMachine {
  id: string;
  slug: string;
  name: string;
  type: MachineType;
  model: string;
  year: number | string;
  role: string; // e.g. "The Long-Distance Wanderer", "The Midnight Runabout"
  heroImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  story: string; // The character lore & why Saraswat loves/rides it ("Story first")
  status: 'In Active Rotation' | 'In Workshop' | 'Preserved' | 'The Road Ahead';
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
  isStructuralPlaceholder?: boolean;
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
  isStructuralPlaceholder?: boolean;
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
