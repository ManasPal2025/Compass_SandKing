export interface TravelDestination {
  id: string;
  country: string;
  region: string;
  examplePlace: string;
  latitude: number;
  longitude: number;
  mapX: number;
  mapY: number;
  image: string;
  alt: string;
  note: string;
}

/** Demonstration places for the Atlas prototype. None of these are confirmed visits. */
export const travelDestinations: TravelDestination[] = [
  { id: "au", country: "Australia", region: "Oceania", examplePlace: "Great Ocean Road", latitude: -38.68, longitude: 143.39, mapX: 87, mapY: 72, image: "/images/placeholders/hero_road.jpg", alt: "A winding road beside a misty coast", note: "An illustrative coastal-drive collection." },
  { id: "nz", country: "New Zealand", region: "Oceania", examplePlace: "Southern Alps", latitude: -43.5, longitude: 170.1, mapX: 94, mapY: 84, image: "/images/placeholders/archive-ridge.webp", alt: "A high ridge road above a sea of cloud", note: "A sample alpine-road collection." },
  { id: "sa", country: "Saudi Arabia", region: "Middle East", examplePlace: "Red Sea coast", latitude: 22.5, longitude: 39.1, mapX: 62, mapY: 47, image: "/images/placeholders/drift-road.webp", alt: "A warm road crossing open hills", note: "An illustrative desert-and-coast collection." },
  { id: "kh", country: "Cambodia", region: "Southeast Asia", examplePlace: "Mekong lowlands", latitude: 12.6, longitude: 104.9, mapX: 78, mapY: 55, image: "/images/placeholders/archive_trail.jpg", alt: "A shaded track through a green landscape", note: "A sample river-country collection." },
  { id: "vn", country: "Vietnam", region: "Southeast Asia", examplePlace: "Central coast", latitude: 16.1, longitude: 108.2, mapX: 81, mapY: 50, image: "/images/placeholders/journal-pass.webp", alt: "A mountain road emerging from cloud", note: "An illustrative coastal-and-highland collection." },
  { id: "th", country: "Thailand", region: "Southeast Asia", examplePlace: "Bangkok", latitude: 13.75, longitude: 100.5, mapX: 76, mapY: 59, image: "/images/placeholders/garage_rig.jpg", alt: "A travel vehicle paused beneath a forest canopy", note: "A sample city-and-road collection." },
  { id: "cz", country: "Czechia", region: "Europe", examplePlace: "Prague", latitude: 50.08, longitude: 14.44, mapX: 56, mapY: 34, image: "/images/placeholders/archive-ridge.webp", alt: "A winding ridge road under a broad sky", note: "An illustrative city-and-countryside collection." },
  { id: "fr", country: "France", region: "Europe", examplePlace: "Provence", latitude: 43.9, longitude: 5.1, mapX: 51, mapY: 41, image: "/images/placeholders/drift-road.webp", alt: "A sunlit road disappearing over a low ridge", note: "A sample landscape collection." },
  { id: "it", country: "Italy", region: "Europe", examplePlace: "Dolomites", latitude: 46.4, longitude: 11.8, mapX: 59, mapY: 42, image: "/images/placeholders/journal-pass.webp", alt: "A mountain pass road through morning mist", note: "An illustrative mountain-road collection." },
  { id: "ch", country: "Switzerland", region: "Europe", examplePlace: "Bernese Alps", latitude: 46.6, longitude: 8.0, mapX: 54, mapY: 34, image: "/images/placeholders/hero_road.jpg", alt: "A quiet road between green mountain slopes", note: "A sample high-country collection." },
  { id: "jp", country: "Japan", region: "East Asia", examplePlace: "Japanese Alps", latitude: 36.2, longitude: 137.8, mapX: 88, mapY: 40, image: "/images/placeholders/archive_trail.jpg", alt: "A narrow forest track softened by morning light", note: "An illustrative forest-and-mountain collection." },
  { id: "ma", country: "Morocco", region: "North Africa", examplePlace: "Atlas foothills", latitude: 31.2, longitude: -7.9, mapX: 47, mapY: 47, image: "/images/placeholders/garage_bike.jpg", alt: "A motorcycle paused above a distant valley", note: "A sample foothill-road collection." },
];
