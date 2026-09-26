/**
 * Chai Stop or Keep Riding? — Game Data
 * Pure data structures, no React dependencies.
 */

export type TimeOfDay = "morning" | "midday" | "afternoon" | "evening";
export type OptionKind = "ride" | "stop" | "detour" | "risky";

export interface TraitPoints {
  grit?: number;
  chill?: number;
  wanderlust?: number;
  chaos?: number;
}

export interface RiskyOutcome {
  p: number;
  line: string;
  distance: number;
  timeDelta: number;
  wrongTurns?: number;
}

export interface ChaiOption {
  label: string;
  kind: OptionKind;
  distanceDelta?: number;
  timeDelta?: number;
  traits?: TraitPoints;
  chai?: number;
  wrongTurns?: number;
  views?: number;
  outcomeLine?: string;
  riskyOutcomes?: readonly RiskyOutcome[];
}

export interface ChaiScene {
  id: string;
  timeOfDay: TimeOfDay;
  prompt: string;
  icon: string;
  options: readonly ChaiOption[];
  isWildcard?: boolean;
}

export interface ChaiEnding {
  id: string;
  title: string;
  line: string;
}

export interface RiderArchetype {
  id: string;
  name: string;
  description: string;
  bestBuddy: string;
  watchOut: string;
}

export const CHAI_SCENES_MORNING: readonly ChaiScene[] = [
  {
    id: "m-1",
    timeOfDay: "morning",
    prompt: "{time}. A roadside stall is pouring the first chai of the day. Steam everywhere.",
    icon: "Coffee",
    options: [
      {
        label: "Keep riding",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "Cold wind, empty road, zero regrets. Mostly.",
      },
      {
        label: "Chai stop",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "First sip. The day has officially begun.",
      },
    ],
  },
  {
    id: "m-2",
    timeOfDay: "morning",
    prompt: "Fog on the highway. Visibility: one cow.",
    icon: "CloudFog",
    options: [
      {
        label: "Ride slow and steady",
        kind: "ride",
        timeDelta: 65,
        traits: { grit: 1 },
        outcomeLine: "You and the cow reach an understanding.",
      },
      {
        label: "Wait it out with chai",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "The fog lifts exactly as your cup empties. Suspicious timing.",
      },
    ],
  },
  {
    id: "m-3",
    timeOfDay: "morning",
    prompt: "A hand-painted sign: 'Waterfall 6 km →'.",
    icon: "Waves",
    options: [
      {
        label: "Stay on route",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "The waterfall remains a rumour.",
      },
      {
        label: "Take the detour",
        kind: "detour",
        traits: { wanderlust: 2 },
        views: 1,
        outcomeLine: "It was 11 km, not 6. It was worth every one.",
      },
    ],
  },
  {
    id: "m-4",
    timeOfDay: "morning",
    prompt: "A dhaba owner waves you in: 'Aloo paratha, fresh from the tawa!'",
    icon: "UtensilsCrossed",
    options: [
      {
        label: "Wave back, ride on",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "You will think about that paratha until noon.",
      },
      {
        label: "Pull in",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "Two parathas, one chai, total contentment.",
      },
    ],
  },
  {
    id: "m-5",
    timeOfDay: "morning",
    prompt: "Your navigation app suggests a 'faster route' through a village.",
    icon: "Navigation",
    options: [
      {
        label: "Trust the app",
        kind: "risky",
        traits: { chaos: 2 },
        riskyOutcomes: [
          {
            p: 0.5,
            line: "It really was faster. You tell no one how surprised you are.",
            distance: 44,
            timeDelta: 45,
          },
          {
            p: 0.5,
            line: "The faster route goes through a wedding. You are now a guest.",
            distance: 10,
            timeDelta: 80,
            wrongTurns: 1,
          },
        ],
      },
      {
        label: "Stick to the highway",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "Predictable. Correct.",
      },
    ],
  },
  {
    id: "m-6",
    timeOfDay: "morning",
    prompt: "Sunrise over a paddy field. The light is doing something unfair.",
    icon: "Sunrise",
    options: [
      {
        label: "Ride on",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "You'll see another sunrise. Probably.",
      },
      {
        label: "Pull over for photos",
        kind: "stop",
        timeDelta: 25,
        traits: { wanderlust: 1 },
        views: 1,
        outcomeLine: "Forty photos. One is good. That's the rule.",
      },
    ],
  },
];

export const CHAI_SCENES_MIDDAY: readonly ChaiScene[] = [
  {
    id: "md-1",
    timeOfDay: "midday",
    prompt: "Noon. The tar is shimmering.",
    icon: "Sun",
    options: [
      {
        label: "Push through",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "You are now 30% rider, 70% sweat.",
      },
      {
        label: "Chai under a banyan tree",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "The banyan tree has seen many riders. It approves.",
      },
    ],
  },
  {
    id: "md-2",
    timeOfDay: "midday",
    prompt: "A truck driver swears there's a shortcut over the hill.",
    icon: "Truck",
    options: [
      {
        label: "Take the shortcut",
        kind: "risky",
        traits: { chaos: 2 },
        riskyOutcomes: [
          {
            p: 0.5,
            line: "It WAS a shortcut. You feel unstoppable.",
            distance: 50,
            timeDelta: 40,
          },
          {
            p: 0.5,
            line: "It was a goat trail. The goats were polite.",
            distance: 8,
            timeDelta: 70,
            wrongTurns: 1,
          },
        ],
      },
      {
        label: "Politely decline",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "He shrugs. He has seen your type before.",
      },
    ],
  },
  {
    id: "md-3",
    timeOfDay: "midday",
    prompt: "A friend texts: they're 20 km off your route and lunch is ready.",
    icon: "MessageCircle",
    options: [
      {
        label: "Keep riding",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "You send a sad emoji and ride on.",
      },
      {
        label: "Go for lunch",
        kind: "detour",
        timeDelta: 90,
        traits: { chill: 1, wanderlust: 1 },
        outcomeLine: "Lunch became tea became stories. Zero regrets, mild time problem.",
      },
    ],
  },
  {
    id: "md-4",
    timeOfDay: "midday",
    prompt: "Fuel gauge: suspiciously low.",
    icon: "Fuel",
    options: [
      {
        label: "Risk it to the next town",
        kind: "risky",
        traits: { chaos: 1 },
        riskyOutcomes: [
          {
            p: 0.7,
            line: "You coast into the pump on pure hope.",
            distance: 36,
            timeDelta: 50,
          },
          {
            p: 0.3,
            line: "You push the last 2 km. Character building.",
            distance: 30,
            timeDelta: 85,
          },
        ],
      },
      {
        label: "Fill up now",
        kind: "ride",
        timeDelta: 60,
        traits: { grit: 1 },
        outcomeLine: "Boring. Correct.",
      },
    ],
  },
  {
    id: "md-5",
    timeOfDay: "midday",
    prompt: "A stall is selling cold coconut water.",
    icon: "Palmtree",
    options: [
      {
        label: "Ride on",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "Your thirst files a complaint.",
      },
      {
        label: "Stop for one",
        kind: "stop",
        timeDelta: 20,
        traits: { chill: 1 },
        outcomeLine: "Technically not chai. Spiritually very close.",
      },
    ],
  },
  {
    id: "md-6",
    timeOfDay: "midday",
    prompt: "The road splits: the highway, or the ghat road with 27 hairpins.",
    icon: "Mountain",
    options: [
      {
        label: "Highway",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "Straight, smooth, forgettable.",
      },
      {
        label: "Ghat road",
        kind: "detour",
        traits: { wanderlust: 2 },
        views: 1,
        outcomeLine: "27 hairpins. You counted. Out loud.",
      },
    ],
  },
];

export const CHAI_SCENES_AFTERNOON: readonly ChaiScene[] = [
  {
    id: "af-1",
    timeOfDay: "afternoon",
    prompt: "A tiny temple on a hill. 140 steps up.",
    icon: "Landmark",
    options: [
      {
        label: "Ride on",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "You salute it from the saddle.",
      },
      {
        label: "Climb the steps",
        kind: "stop",
        timeDelta: 45,
        traits: { wanderlust: 1, chill: 1 },
        views: 1,
        outcomeLine: "140 steps. The view paid you back for every one.",
      },
    ],
  },
  {
    id: "af-2",
    timeOfDay: "afternoon",
    prompt: "Your back has filed a formal complaint.",
    icon: "Activity",
    options: [
      {
        label: "Ignore it",
        kind: "ride",
        traits: { grit: 2 },
        outcomeLine: "Your back has escalated the complaint.",
      },
      {
        label: "Chai and a stretch",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "Three stretches, one chai, zero complaints.",
      },
    ],
  },
  {
    id: "af-3",
    timeOfDay: "afternoon",
    prompt: "Kids by the road want to see the bike up close.",
    icon: "Baby",
    options: [
      {
        label: "Wave and go",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "They wave back with alarming enthusiasm.",
      },
      {
        label: "Stop for a minute",
        kind: "stop",
        timeDelta: 20,
        traits: { chill: 1, wanderlust: 1 },
        outcomeLine: "You let them press the horn. You are now famous in this village.",
      },
    ],
  },
  {
    id: "af-4",
    timeOfDay: "afternoon",
    prompt: "Clouds are building. It might rain, it might not.",
    icon: "CloudRain",
    options: [
      {
        label: "Race the rain",
        kind: "risky",
        traits: { grit: 1, chaos: 1 },
        riskyOutcomes: [
          {
            p: 0.6,
            line: "You won. Barely.",
            distance: 36,
            timeDelta: 50,
          },
          {
            p: 0.4,
            line: "You lost. Spectacularly.",
            distance: 30,
            timeDelta: 75,
          },
        ],
      },
      {
        label: "Wait under a shelter with chai",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "It never rained. The chai was still the right call.",
      },
    ],
  },
  {
    id: "af-5",
    timeOfDay: "afternoon",
    prompt: "A local says the best chai in the district is 3 km ahead — 'but only till 4 o'clock'.",
    icon: "Coffee",
    options: [
      {
        label: "Skip it",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "You will wonder about this chai for years.",
      },
      {
        label: "Chase it",
        kind: "stop",
        traits: { wanderlust: 1 },
        chai: 1,
        outcomeLine: "Best chai in the district: confirmed. You are no longer objective.",
      },
    ],
  },
  {
    id: "af-6",
    timeOfDay: "afternoon",
    prompt: "A herd of buffaloes has taken over the road.",
    icon: "ShieldAlert",
    options: [
      {
        label: "Wait patiently",
        kind: "stop",
        timeDelta: 25,
        traits: { chill: 1 },
        outcomeLine: "The buffaloes leave in their own time. As is their right.",
      },
      {
        label: "Squeeze past",
        kind: "risky",
        traits: { chaos: 1 },
        riskyOutcomes: [
          {
            p: 0.6,
            line: "Clean pass. The buffaloes didn't even look up.",
            distance: 36,
            timeDelta: 50,
          },
          {
            p: 0.4,
            line: "One buffalo chose violence (a slow lean). You waited anyway.",
            distance: 36,
            timeDelta: 75,
          },
        ],
      },
    ],
  },
];

export const CHAI_SCENES_EVENING: readonly ChaiScene[] = [
  {
    id: "ev-1",
    timeOfDay: "evening",
    prompt: "{time}. The light turns gold. The lake is still some way off.",
    icon: "Sunset",
    options: [
      {
        label: "Keep riding hard",
        kind: "ride",
        traits: { grit: 2 },
        outcomeLine: "Golden light, blurry at speed.",
      },
      {
        label: "Stop for the golden hour",
        kind: "stop",
        traits: { wanderlust: 1 },
        views: 1,
        outcomeLine: "Some light doesn't wait for you to arrive anywhere.",
      },
    ],
  },
  {
    id: "ev-2",
    timeOfDay: "evening",
    prompt: "A signboard: 'Lake 40 km. Chai 400 m.'",
    icon: "Signpost",
    options: [
      {
        label: "Lake",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "You respect the sign's honesty and ignore it.",
      },
      {
        label: "Chai",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "You laughed at the sign. Then you obeyed it.",
      },
    ],
  },
  {
    id: "ev-3",
    timeOfDay: "evening",
    prompt: "A fellow rider flags you down to ask for directions.",
    icon: "Bike",
    options: [
      {
        label: "Point the way and go",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "Helpful, efficient, gone.",
      },
      {
        label: "Ride together for a while",
        kind: "ride",
        timeDelta: 60,
        traits: { chill: 1, wanderlust: 1 },
        outcomeLine: "You now have a riding buddy and a new group chat.",
      },
    ],
  },
  {
    id: "ev-4",
    timeOfDay: "evening",
    prompt: "The last stretch: a dirt track that may or may not be a shortcut to the shore.",
    icon: "Route",
    options: [
      {
        label: "Take the dirt track",
        kind: "risky",
        traits: { chaos: 2 },
        riskyOutcomes: [
          {
            p: 0.5,
            line: "Straight onto the shore. Cinematic.",
            distance: 50,
            timeDelta: 40,
          },
          {
            p: 0.5,
            line: "It ends at a field. A farmer points you back, kindly.",
            distance: 8,
            timeDelta: 60,
            wrongTurns: 1,
          },
        ],
      },
      {
        label: "Main road",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "The sensible road. The lake is patient.",
      },
    ],
  },
];

export const CHAI_WILDCARDS: readonly ChaiScene[] = [
  {
    id: "wc-1",
    timeOfDay: "midday", // Dynamic in run
    prompt: "A wedding procession fills the entire road. The band has spotted you.",
    icon: "Music",
    isWildcard: true,
    options: [
      {
        label: "Wait politely",
        kind: "stop",
        timeDelta: 30,
        traits: { chill: 1 },
        outcomeLine: "Twelve songs later, the road is yours.",
      },
      {
        label: "Join the dance for one song",
        kind: "stop",
        timeDelta: 25,
        traits: { chaos: 1, wanderlust: 1 },
        outcomeLine: "One song became three. You were fed twice.",
      },
      {
        label: "Find a way around",
        kind: "risky",
        traits: { chaos: 1 },
        riskyOutcomes: [
          {
            p: 0.5,
            line: "Found a lane. Clean escape.",
            distance: 20,
            timeDelta: 30,
          },
          {
            p: 0.5,
            line: "The lane led back to the wedding.",
            distance: 5,
            timeDelta: 45,
            wrongTurns: 1,
          },
        ],
      },
    ],
  },
  {
    id: "wc-2",
    timeOfDay: "afternoon",
    prompt: "The chai seller leans in: 'Special chai — ginger, cardamom and a secret.'",
    icon: "Coffee",
    isWildcard: true,
    options: [
      {
        label: "One special chai",
        kind: "stop",
        timeDelta: 20,
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "Excellent. The secret remains a secret.",
      },
      {
        label: "Make it two",
        kind: "stop",
        timeDelta: 30,
        traits: { chill: 1 },
        chai: 2,
        outcomeLine: "Two cups in, you consider moving here.",
      },
      {
        label: "Ask for the secret",
        kind: "stop",
        timeDelta: 25,
        traits: { wanderlust: 1 },
        chai: 1,
        outcomeLine: "He smiles. 'Patience.' You are none the wiser.",
      },
    ],
  },
  {
    id: "wc-3",
    timeOfDay: "morning",
    prompt: "One of your riding gloves has vanished.",
    icon: "HelpCircle",
    isWildcard: true,
    options: [
      {
        label: "Search everywhere",
        kind: "stop",
        timeDelta: 30,
        traits: { grit: 1 },
        outcomeLine: "It was in your jacket pocket the whole time.",
      },
      {
        label: "Ride with one glove",
        kind: "ride",
        traits: { chaos: 1 },
        outcomeLine: "You look like a very specific pop star.",
      },
      {
        label: "Buy a pair at the market",
        kind: "stop",
        timeDelta: 25,
        traits: { wanderlust: 1 },
        outcomeLine: "New gloves, slightly too sparkly. Fine.",
      },
    ],
  },
  {
    id: "wc-4",
    timeOfDay: "afternoon",
    prompt: "Warm, gentle rain starts falling.",
    icon: "CloudRain",
    isWildcard: true,
    options: [
      {
        label: "Ride through it",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "Wet, but weirdly happy.",
      },
      {
        label: "Stop for pakoras and chai",
        kind: "stop",
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "Rain, pakoras, chai. The holy trinity.",
      },
      {
        label: "Stand in it for a minute",
        kind: "stop",
        timeDelta: 10,
        traits: { chaos: 1, chill: 1 },
        outcomeLine: "Onlookers are confused. You are at peace.",
      },
    ],
  },
  {
    id: "wc-5",
    timeOfDay: "midday",
    prompt: "A mechanic's stall. He offers to 'just check' your chain.",
    icon: "Wrench",
    isWildcard: true,
    options: [
      {
        label: "Let him check",
        kind: "stop",
        timeDelta: 25,
        traits: { chill: 1 },
        chai: 1,
        outcomeLine: "He tightens it, refuses payment, offers chai.",
      },
      {
        label: "No thanks, all good",
        kind: "ride",
        traits: { grit: 1 },
        outcomeLine: "Your chain makes a small noise of betrayal.",
      },
      {
        label: "Ask for his life story",
        kind: "stop",
        timeDelta: 40,
        traits: { wanderlust: 2 },
        views: 1,
        outcomeLine: "Forty minutes, three generations and one excellent tip about a lake viewpoint.",
      },
    ],
  },
];

export const RIDER_ARCHETYPES: Record<string, RiderArchetype> = {
  "chai-connoisseur": {
    id: "chai-connoisseur",
    name: "The Chai Connoisseur",
    description: "You measure distance in cups, not kilometres. Every stall owner on this road now knows your order.",
    bestBuddy: "The Unplanned Pauser",
    watchOut: "Arriving anywhere before sunset.",
  },
  "balanced-rider": {
    id: "balanced-rider",
    name: "The Balanced Rider",
    description: "A bit of grit, a bit of chai, a bit of chaos. Annoyingly well adjusted.",
    bestBuddy: "Anyone, honestly",
    watchOut: "Being asked to plan every group trip.",
  },
  "iron-butt": {
    id: "iron-butt",
    name: "The Iron Butt",
    description: "Stops are for other people. Your saddle is your sofa.",
    bestBuddy: "The Chai Connoisseur (someone has to make you stop)",
    watchOut: "Missing every waterfall on the route.",
  },
  "unplanned-pauser": {
    id: "unplanned-pauser",
    name: "The Unplanned Pauser",
    description: "You believe the best part of the trip is the stop nobody planned. You're usually right.",
    bestBuddy: "The Sunset Chaser",
    watchOut: "Explaining to people why you're late again.",
  },
  "sunset-chaser": {
    id: "sunset-chaser",
    name: "The Sunset Chaser",
    description: "Waterfalls, hairpins, temples on hills — if there's a view, you're taking the detour.",
    bestBuddy: "The Unplanned Pauser",
    watchOut: "A camera roll with 4,000 photos of one sunset.",
  },
  "shortcut-believer": {
    id: "shortcut-believer",
    name: "The Shortcut Believer",
    description: "Every 'shortcut' is a new adventure. Some of them are even shorter.",
    bestBuddy: "The Iron Butt (for the rescue)",
    watchOut: "Goats. Weddings. Fields. Goats again.",
  },
};
