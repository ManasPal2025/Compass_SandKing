export interface PhotoQuizRound {
  id: string;
  placeId: string;
  image: string;
  alt: string;
  question: string;
  answer: string;
  options: string[];
  hintOne: string;
  hintTwo: string;
  reveal: string;
}

/** Fictional pairings for a functional game prototype; never a verified travel record. */
export const photoQuizRounds: PhotoQuizRound[] = [
  { id: "round-one", placeId: "nz", image: "/images/placeholders/archive-ridge.webp", alt: "A narrow road crossing a high ridge above a cloud-filled valley", question: "Which country is paired with this sample ridge scene?", answer: "New Zealand", options: ["Australia", "New Zealand", "Switzerland", "Morocco"], hintOne: "Look toward the South Pacific.", hintTwo: "The sample place is the Southern Alps.", reveal: "This demo scene is paired with the Southern Alps in New Zealand." },
  { id: "round-two", placeId: "sa", image: "/images/placeholders/drift-road.webp", alt: "A dry, sunlit landscape with a winding road", question: "Which country is paired with this warm-road study?", answer: "Saudi Arabia", options: ["Saudi Arabia", "Vietnam", "France", "Japan"], hintOne: "This sample sits in the Middle East.", hintTwo: "The example collection is labeled Red Sea coast.", reveal: "The sample destination is the Red Sea coast in Saudi Arabia." },
  { id: "round-three", placeId: "jp", image: "/images/placeholders/archive_trail.jpg", alt: "A quiet trail disappearing between tall trees", question: "Which country is paired with this forest-frame study?", answer: "Japan", options: ["Cambodia", "Japan", "Australia", "Czechia"], hintOne: "This sample is in East Asia.", hintTwo: "The example region is called the Japanese Alps.", reveal: "The sample collection pairs this forest scene with the Japanese Alps." },
  { id: "round-four", placeId: "vn", image: "/images/placeholders/journal-pass.webp", alt: "A mountain road disappearing into pale morning mist", question: "Which country is paired with this misty pass?", answer: "Vietnam", options: ["Italy", "Vietnam", "Thailand", "New Zealand"], hintOne: "The sample destination is in Southeast Asia.", hintTwo: "Its collection is labeled Central coast.", reveal: "This sample scene is paired with Vietnam's central coast." },
  { id: "round-five", placeId: "au", image: "/images/placeholders/hero_road.jpg", alt: "An empty road winding through green hills at dawn", question: "Which country is paired with this coastal-road study?", answer: "Australia", options: ["Czechia", "Australia", "Morocco", "Saudi Arabia"], hintOne: "This sample is on the southern edge of Oceania.", hintTwo: "Its illustrative place name is Great Ocean Road.", reveal: "The example collection is the Great Ocean Road in Australia." },
];
