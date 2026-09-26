/**
 * Pack the Saddlebag — Game Content & Data
 * Pure data structures, no React dependencies.
 */

export interface SaddlebagItem {
  id: string;
  name: string;
  slots: number;
  kind: "essential" | "luxury";
  icon: string;
  quip: string;
}

export interface SaddlebagEvent {
  id: string;
  text: string;
  needs: readonly string[];
  handled?: string;
  handledByItem?: Record<string, string>;
  missed: string;
  isBonus?: boolean;
}

export interface SaddlebagTrip {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  slots: number;
  essentialPool: readonly string[];
  drawCount: number;
  hasSunriseBonus: "always" | "never" | "chance50";
  roadReport: readonly string[];
  packingTip: string;
}

export interface PackerTitle {
  minStars: number;
  maxStars: number;
  title: string;
  line: string;
}

export interface SaddlebagBadge {
  id: string;
  name: string;
  description: string;
}

export const SADDLEBAG_ITEMS: readonly SaddlebagItem[] = [
  // Essentials (table order)
  {
    id: "rain-jacket",
    name: "Rain jacket",
    slots: 1,
    kind: "essential",
    icon: "CloudRain",
    quip: "Optimism is nice. Waterproofing is nicer.",
  },
  {
    id: "puncture-kit",
    name: "Puncture kit",
    slots: 1,
    kind: "essential",
    icon: "CircleDot",
    quip: "Tiny kit. Enormous peace of mind.",
  },
  {
    id: "power-bank",
    name: "Power bank",
    slots: 1,
    kind: "essential",
    icon: "BatteryCharging",
    quip: "Your phone thanks you in advance.",
  },
  {
    id: "first-aid",
    name: "First-aid kit",
    slots: 1,
    kind: "essential",
    icon: "Cross",
    quip: "The thing you pack hoping you'll never open it.",
  },
  {
    id: "water",
    name: "Water bottles",
    slots: 1,
    kind: "essential",
    icon: "Droplets",
    quip: "Deeply unglamorous. Completely essential.",
  },
  {
    id: "fuse-tape",
    name: "Spare fuses & tape",
    slots: 1,
    kind: "essential",
    icon: "Zap",
    quip: "Half of all roadside repairs are tape. So is the other half.",
  },
  {
    id: "sunscreen",
    name: "Sunscreen",
    slots: 1,
    kind: "essential",
    icon: "Sun",
    quip: "Future-you's nose says thank you.",
  },
  {
    id: "paper-map",
    name: "Paper map",
    slots: 1,
    kind: "essential",
    icon: "Map",
    quip: "Works without signal. Folds badly. Perfect.",
  },
  {
    id: "thermal",
    name: "Thermal layer",
    slots: 1,
    kind: "essential",
    icon: "Snowflake",
    quip: "Mountains lie about how warm they are.",
  },
  {
    id: "snacks",
    name: "Snacks & dry fruit",
    slots: 1,
    kind: "essential",
    icon: "Cookie",
    quip: "Emergency almonds: the rider's currency.",
  },
  {
    id: "tool-roll",
    name: "Tool roll",
    slots: 1,
    kind: "essential",
    icon: "Wrench",
    quip: "For the rattle that always appears at km 212.",
  },
  {
    id: "headlamp",
    name: "Headlamp",
    slots: 1,
    kind: "essential",
    icon: "Flashlight",
    quip: "Hands free, face lit, dignity optional.",
  },
  // Luxuries (table order)
  {
    id: "camera",
    name: "Camera with four lenses",
    slots: 2,
    kind: "luxury",
    icon: "Camera",
    quip: "Four lenses. You will use one. You know this.",
  },
  {
    id: "drone",
    name: "Drone",
    slots: 2,
    kind: "luxury",
    icon: "Plane",
    quip: "Great shots. Questionable battery maths.",
  },
  {
    id: "pizza",
    name: "A whole pizza",
    slots: 2,
    kind: "luxury",
    icon: "Pizza",
    quip: "Structurally, this is a flat hope.",
  },
  {
    id: "golf-bag",
    name: "Golf bag",
    slots: 3,
    kind: "luxury",
    icon: "Flag",
    quip: "Three slots. A fairway could appear. You never know.",
  },
  {
    id: "third-jacket",
    name: "A third 'just in case' jacket",
    slots: 1,
    kind: "luxury",
    icon: "Shirt",
    quip: "The first two jackets are now nervous.",
  },
  {
    id: "speaker",
    name: "Speaker with a ghazal playlist",
    slots: 1,
    kind: "luxury",
    icon: "Music",
    quip: "Every sunset now has a soundtrack.",
  },
  {
    id: "pillow",
    name: "Full-size pillow",
    slots: 2,
    kind: "luxury",
    icon: "BedDouble",
    quip: "You have chosen comfort over physics.",
  },
  {
    id: "extra-shoes",
    name: "Extra pair of shoes",
    slots: 1,
    kind: "luxury",
    icon: "Footprints",
    quip: "In case the first pair gets bored.",
  },
];

export const SADDLEBAG_EVENTS: Record<string, SaddlebagEvent> = {
  rain: {
    id: "rain",
    text: "Km 40: the sky opens like it has been waiting all week.",
    needs: ["rain-jacket"],
    handled: "Rain jacket on in thirty seconds. Smugness level: high.",
    missed: "You are now 40% rider, 60% puddle.",
  },
  puncture: {
    id: "puncture",
    text: "A nail has chosen your rear tyre.",
    needs: ["puncture-kit"],
    handled: "Plugged, pumped and rolling in fifteen minutes.",
    missed: "You learn a new phrase: 'nearest puncture shop, 22 km'.",
  },
  "phone-dead": {
    id: "phone-dead",
    text: "Phone at 3%. The navigation voice is getting sleepy.",
    needs: ["power-bank", "paper-map"],
    handledByItem: {
      "power-bank": "Charged up. The voice lives.",
      "paper-map": "Phone dies. You unfold the map like it's 1998. Still works.",
    },
    missed: "You navigate by vibes. The vibes are wrong.",
  },
  "fog-night": {
    id: "fog-night",
    text: "Fog rolls in just as the light fades.",
    needs: ["headlamp"],
    handled: "Headlamp on. The fog is now merely atmospheric.",
    missed: "You set up camp by touch. It is mostly a bush.",
  },
  "closed-dhaba": {
    id: "closed-dhaba",
    text: "The only dhaba for 50 km is closed for a wedding.",
    needs: ["snacks"],
    handled: "Emergency almonds deployed. Morale holds.",
    missed: "Your stomach begins composing sad poetry.",
  },
  "loose-mirror": {
    id: "loose-mirror",
    text: "Your mirror now faces the sky. Very scenic. Not useful.",
    needs: ["tool-roll", "fuse-tape"],
    handledByItem: {
      "tool-roll": "Two turns of a spanner. Order restored.",
      "fuse-tape": "Tape. Lots of tape. It holds.",
    },
    missed: "You ride with a mirror that only shows clouds.",
  },
  "harsh-sun": {
    id: "harsh-sun",
    text: "Noon, no shade, and the sun is taking it personally.",
    needs: ["sunscreen"],
    handled: "Sunscreen on. Your nose survives the day.",
    missed: "You arrive with a two-tone face. It's a look.",
  },
  "no-shops-water": {
    id: "no-shops-water",
    text: "No shops for 80 km and the heat has opinions.",
    needs: ["water"],
    handled: "Sip, ride, sip. Smooth.",
    missed: "You start seriously considering a coconut tree's feelings.",
  },
  "dawn-chill": {
    id: "dawn-chill",
    text: "The pre-dawn wind off the water is colder than promised.",
    needs: ["thermal", "third-jacket"],
    handledByItem: {
      thermal: "Thermal layer on. Toasty.",
      "third-jacket": "The third jacket was right all along. It will never let you forget it.",
    },
    missed: "You invent a new dance called 'the shiver'.",
  },
  "freezing-night": {
    id: "freezing-night",
    text: "The pass drops below zero after dark.",
    needs: ["thermal", "third-jacket"],
    handledByItem: {
      thermal: "Warm enough to actually sleep.",
      "third-jacket": "The third jacket saves the night. Legend.",
    },
    missed: "You sleep in every item you packed. It is not enough.",
  },
  scrape: {
    id: "scrape",
    text: "A slow slide on loose gravel. Just a scrape — this time.",
    needs: ["first-aid"],
    handled: "Cleaned, covered, carrying on.",
    missed: "You patch it with hope and a napkin.",
  },
  "no-signal": {
    id: "no-signal",
    text: "No signal for the next 90 km.",
    needs: ["paper-map"],
    handled: "Paper map out. You feel like an explorer.",
    missed: "Three wrong turns and one very confused goat.",
  },
  "blown-fuse": {
    id: "blown-fuse",
    text: "Your lights flicker, then quit.",
    needs: ["fuse-tape"],
    handled: "New fuse, lights back. Two minutes, zero drama.",
    missed: "You wait for a passing truck and a kind stranger.",
  },
  "thin-air": {
    id: "thin-air",
    text: "The climb is long and the air is thin.",
    needs: ["water"],
    handled: "Small sips, steady pace. You make the top.",
    missed: "Your head starts drumming a song you didn't choose.",
  },
  "dark-tunnel": {
    id: "dark-tunnel",
    text: "A long, unlit tunnel, dripping from the roof.",
    needs: ["headlamp"],
    handled: "Headlamp on. The tunnel is merely spooky now.",
    missed: "You exit the tunnel mostly by faith.",
  },
  "desert-heat": {
    id: "desert-heat",
    text: "Desert noon. Even the lizards are in the shade.",
    needs: ["water"],
    handled: "Water break. The lizards are jealous.",
    missed: "You begin to understand mirages personally.",
  },
  "sand-chain": {
    id: "sand-chain",
    text: "Sand in the chain. It sounds like a coffee grinder.",
    needs: ["tool-roll"],
    handled: "Cleaned and adjusted. Silent again.",
    missed: "You ride 60 km accompanied by crunching.",
  },
  "cold-desert-night": {
    id: "cold-desert-night",
    text: "The desert forgot it was hot. It is freezing.",
    needs: ["thermal", "third-jacket"],
    handledByItem: {
      thermal: "Thermal on. Stargazing in comfort.",
      "third-jacket": "The third jacket: undefeated.",
    },
    missed: "Beautiful stars. You see them through chattering teeth.",
  },
  "empty-stretch": {
    id: "empty-stretch",
    text: "120 km of nothing. Not even a tea stall.",
    needs: ["snacks"],
    handled: "Snack break on an empty road. Weirdly perfect.",
    missed: "You start rationing a single toffee.",
  },
  "sunrise-bonus": {
    id: "sunrise-bonus",
    text: "The sunrise is ridiculous. Gold, pink, the works.",
    needs: ["camera", "drone"],
    handledByItem: {
      camera: "Frame of the year. (You used one lens.)",
      drone: "Aerial shot secured before the battery panicked.",
    },
    missed: "No photo. You'll just have to remember it. That's allowed.",
    isBonus: true,
  },
};

export const SADDLEBAG_TRIPS: readonly SaddlebagTrip[] = [
  {
    id: "trip-1",
    number: 1,
    title: "Monsoon Weekend",
    subtitle: "Two days in the hills. The forecast is mostly cloud.",
    slots: 6,
    essentialPool: ["rain", "puncture", "phone-dead", "fog-night", "closed-dhaba", "loose-mirror"],
    drawCount: 4,
    hasSunriseBonus: "never",
    roadReport: [
      "Heavy clouds all weekend.",
      "Dhabas are few and far between up there.",
      "Your mirror mount has been rattling.",
      "You'll probably be riding after dark.",
      "Tyres last checked: 'recently' (ish).",
      "Your phone battery has trust issues.",
    ],
    packingTip: "A paper map quietly doubles as a phone backup.",
  },
  {
    id: "trip-2",
    number: 2,
    title: "Coastal Sunrise Run",
    subtitle: "One long day by the sea. Towns are far apart.",
    slots: 5,
    essentialPool: ["harsh-sun", "no-shops-water", "dawn-chill", "puncture", "loose-mirror"],
    drawCount: 3,
    hasSunriseBonus: "always",
    roadReport: [
      "You leave before dawn — it'll be chilly on the coast.",
      "No shade for most of the afternoon.",
      "Long stretches without a single shop.",
      "The coast road is being resurfaced. Loose gravel, stray nails.",
      "Something on the handlebar has started buzzing.",
      "Sunrise over the water is said to be spectacular.",
    ],
    packingTip: "Bonus moments are optional. Water is not.",
  },
  {
    id: "trip-3",
    number: 3,
    title: "The High Pass",
    subtitle: "Three days above the snowline. Signal: fictional.",
    slots: 7,
    essentialPool: ["freezing-night", "scrape", "no-signal", "blown-fuse", "thin-air", "dark-tunnel", "phone-dead"],
    drawCount: 5,
    hasSunriseBonus: "never",
    roadReport: [
      "Nights drop below zero.",
      "Gravel sections on the descent.",
      "No mobile signal for most of the route.",
      "Your wiring has been moody lately.",
      "A long climb in thin air.",
      "There's an old unlit tunnel near the top.",
    ],
    packingTip: "One well-chosen item can solve two problems. Look for them.",
  },
  {
    id: "trip-4",
    number: 4,
    title: "Desert Highway",
    subtitle: "Two days on a straight road. 120 km between everything.",
    slots: 6,
    essentialPool: ["desert-heat", "harsh-sun", "sand-chain", "phone-dead", "cold-desert-night", "empty-stretch"],
    drawCount: 4,
    hasSunriseBonus: "chance50",
    roadReport: [
      "Brutal midday heat.",
      "Zero shade.",
      "Sand drifts across the road.",
      "Chargers: optimistic. Sockets: rare.",
      "Desert nights get surprisingly cold.",
      "Nothing to eat for very long stretches.",
    ],
    packingTip: "The desert is two climates wearing one coat.",
  },
  {
    id: "trip-5",
    number: 5,
    title: "The Grand Loop",
    subtitle: "Five days, every kind of weather. The final exam.",
    slots: 8,
    essentialPool: ["rain", "puncture", "phone-dead", "freezing-night", "no-signal", "blown-fuse", "harsh-sun", "closed-dhaba"],
    drawCount: 6,
    hasSunriseBonus: "always",
    roadReport: [
      "Rain likely somewhere along the way.",
      "Some very remote stretches without signal.",
      "Cold nights at altitude on day three.",
      "Hot, open plains on day four.",
      "Food stops are unpredictable.",
      "Roadworks, nails and a wiring harness that's seen things.",
      "The sunrise on day five is famous.",
    ],
    packingTip: "You can't pack for everything. Pack for what hurts most to miss.",
  },
];

export const PACKER_TITLES: readonly PackerTitle[] = [
  {
    minStars: 14,
    maxStars: 15,
    title: "The Unshakeable Packer",
    line: "Nothing surprises you. The road finds this annoying.",
  },
  {
    minStars: 10,
    maxStars: 13,
    title: "Road-Ready Regular",
    line: "Mostly prepared, occasionally damp. Healthy balance.",
  },
  {
    minStars: 6,
    maxStars: 9,
    title: "The Hopeful Improviser",
    line: "You pack like the road owes you a favour. Sometimes it pays up.",
  },
  {
    minStars: 0,
    maxStars: 5,
    title: "The Legend of the Passing Truck",
    line: "Every trip ends with a kind stranger. They all know your name.",
  },
];

export const SADDLEBAG_BADGES: Record<string, SaddlebagBadge> = {
  "fairway-nomad": {
    id: "fairway-nomad",
    name: "Fairway Nomad",
    description: "Never found a fairway. Never stopped believing.",
  },
  "carb-loaded-legend": {
    id: "carb-loaded-legend",
    name: "Carb-Loaded Legend",
    description: "Frisbee-grade pizza, every single time.",
  },
  "the-jacket-was-right": {
    id: "the-jacket-was-right",
    name: "The Jacket Was Right",
    description: "It told you so.",
  },
  "nothing-rattled": {
    id: "nothing-rattled",
    name: "Nothing Rattled",
    description: "Flawless. Suspiciously flawless.",
  },
};
