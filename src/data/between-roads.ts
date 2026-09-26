export interface LifeInterest {
  id: string;
  number: string;
  title: string;
  theme: string;
  text: string;
  image: string;
  alt: string;
}

/** Clearly illustrative editorial directions until Saraswat supplies his own notes. */
export const lifeInterests: LifeInterest[] = [
  { id: "service", number: "01", title: "Show up for people", theme: "SERVICE & RESPECT", text: "A generous life makes time for other people. Respect for those who serve can be expressed quietly: by listening, showing up, and offering practical help when it is needed.", image: "/images/placeholders/journal-repair.webp", alt: "A motorcycle being carefully prepared before a ride" },
  { id: "hospitality", number: "02", title: "Make room around the table", theme: "HOSPITALITY", text: "A table, a few good friends, and nowhere else to be. A weekend gathering can make ordinary time feel generous again, with conversation that carries well into the evening.", image: "/images/placeholders/garage_rig.jpg", alt: "A quiet clearing prepared for a relaxed gathering" },
  { id: "balance", number: "03", title: "Discipline, with breathing room", theme: "FITNESS & BALANCE", text: "Consistency is built on ordinary days: show up, keep a steady routine, and leave a little room for the meal that is simply enjoyed. Balance makes discipline livable.", image: "/images/placeholders/archive_trail.jpg", alt: "A quiet forest path at first light" },
  { id: "sound", number: "04", title: "Words that stay with you", theme: "SHAYARI · GHAZALS · ODIA SONGS", text: "Shayari, ghazals, and old Odia songs carry a feeling long after the last note. This is a quiet place for the words, memories, and melodies that make their way back into the day.", image: "/images/placeholders/drift-road.webp", alt: "A warm evening landscape made for a quiet pause" },
  { id: "collecting", number: "05", title: "A considered pour", theme: "SINGLE MALT & GIN", text: "A considered pour invites attention to craft, aroma, and the glass in hand. The pleasure is in slowing down and noticing detail, without turning a personal interest into a recommendation.", image: "/images/placeholders/journal-pass.webp", alt: "A mountain evening fading into blue hour" },
  { id: "play", number: "06", title: "Play, on different ground", theme: "GOLF · DOTA · COUNTER-STRIKE 1.6", text: "A fairway, a carefully played round, or one more match of Dota or Counter-Strike 1.6: play takes many forms. Each asks for focus, patience, and the pleasure of getting better over time.", image: "/images/placeholders/hero_road.jpg", alt: "An open road winding toward the horizon" },
];
