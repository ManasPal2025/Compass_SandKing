import { JournalEntry } from "@/types";

/** COMPASS journal: evergreen road and travel reflections, without invented trip details. */
export const journalEntries: JournalEntry[] = [
  {
    id: "journal-01",
    slug: "road-note-01",
    title: "Before the Road Wakes",
    type: "road-note",
    excerpt: "Before the first traffic, a road offers a rare kind of quiet: enough room to notice the light, the line, and the pace.",
    content: "The hour before sunrise is all edges and quiet: a pale horizon, a road still cool from the night, the first bend waiting without instruction.",
    bodyParagraphs: [
      "Nothing asks to be hurried. Without traffic or a schedule to chase, small details return: the texture beneath a tyre, the change in the air, the widening strip of light.",
      "Then the day begins. The road remains, asking only for attention, one turn at a time."
    ],
    image: {
      src: "/images/placeholders/journal-pass.webp",
      alt: "An empty mountain road appearing through dawn mist",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "landscape",
    },
    tags: ["Dispatch", "Solitude", "Highland"],
    readingTime: "1 min read",
    layoutVariant: "prominent",
  },
  {
    id: "journal-02",
    slug: "road-note-02",
    title: "The Space Between Turns",
    type: "observation",
    excerpt: "A clear stretch of road can loosen the mind’s grip on everything waiting beyond it.",
    content: "Quiet is not empty. It gives the mind a little distance from its own urgency.",
    bodyParagraphs: [
      "With the visor closed, attention settles on a few honest things: a clean line, changing light, the steady hum beneath you.",
      "There is no need to make a lesson of it. Sometimes a little open road is enough to let a thought arrive, and then let it pass.",
      "The next turn will come when it comes."
    ],
    tags: ["Observation", "Solitude"],
    readingTime: "1 min read",
    layoutVariant: "compact",
  },
  {
    id: "journal-03",
    slug: "road-note-03",
    title: "The Patience of a Small Repair",
    type: "mechanical",
    excerpt: "A mechanical pause is part of the journey: a moment to look closely, work carefully, and find a steadier pace.",
    content: "A small repair slows the day down to the scale of a fastener, a tool, and a careful look.",
    bodyParagraphs: [
      "It rewards patience before speed. A familiar machine is easier to understand when its ordinary sounds and habits are known.",
      "Check the simple things, work methodically, and leave enough time to do the job properly. The pause becomes part of the journey, not a break from it."
    ],
    image: {
      src: "/images/placeholders/journal-repair.webp",
      alt: "An unbranded adventure motorcycle resting after rain",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "landscape",
    },
    images: [
      {
        src: "/images/placeholders/garage_bike.jpg",
        alt: "Close view of an adventure motorcycle after rainfall",
        caption: "AI-generated photo study · not original photography.",
        aspectRatio: "landscape",
      },
      {
        src: "/images/placeholders/garage_rig.jpg",
        alt: "A four-wheel travel vehicle beneath a misty forest canopy",
        caption: "AI-generated photo study · not original photography.",
        aspectRatio: "landscape",
      }
    ],
    tags: ["Wrenching", "Patience", "Machines"],
    readingTime: "1 min read",
    layoutVariant: "featured",
  },
  {
    id: "journal-04",
    slug: "road-note-04",
    title: "On Stepping Away from the Routine",
    type: "thought",
    excerpt: "A change of pace can begin with one unplanned turn.",
    content: "A little distance from routine can make room for a clearer view of it.",
    bodyParagraphs: [
      "The calendar fills itself. A day outside it asks for something else: enough time to turn aside, stop for a view, and keep the route loose.",
      "Stepping away is not an escape from everyday life. It is a way to meet it again with a little more room to think.",
      "One unplanned turn can be plenty."
    ],
    tags: ["Reflection", "Freedom", "Life"],
    readingTime: "1 min read",
    layoutVariant: "fragment",
  },
  {
    id: "journal-05",
    slug: "road-note-05",
    title: "Where the Fog Settles",
    type: "dispatch",
    excerpt: "Fog softens the forest until the road appears only as far as the light allows.",
    content: "Weather has its own pace among the pines. A quiet moment is enough to notice it.",
    bodyParagraphs: [
      "Fog changes a familiar shape into a suggestion. The trees thin, the edges soften, and the road appears only as far as the light allows.",
      "Water gathers on needles, sinks into the ground, and disappears into the next breath of cloud.",
      "There is no need to make a moment larger than it is. Notice it, let it pass, keep moving when ready."
    ],
    image: {
      src: "/images/placeholders/archive_trail.jpg",
      alt: "A narrow trail fading into a misty pine forest",
      caption: "AI-generated photo study · not original photography.",
      aspectRatio: "landscape",
    },
    tags: ["Dispatch", "Nature", "Atmosphere"],
    readingTime: "1 min read",
    layoutVariant: "prominent",
  }
];
