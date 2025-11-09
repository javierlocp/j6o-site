export const isVideo = (src) => /\.(mp4|webm|ogg|mov|m4v)$/i.test(src);

/** @typedef {{
 *   title: string;
 *   images: string[];
 *   poster?: string;
 *   visit?: { href: string; label?: string };
 *   wip?: boolean;
 * }} Exploration
 */

/** @type {Exploration[]} */
export const explorations = [
  {
    title: "Doremi Finance — Building",
    images: [
      "/showcase/explorations/doremi/doremi-landing-vid-v2.mp4",
      "/showcase/explorations/doremi/doremi-about.png",
      "/showcase/explorations/doremi/doremi-compare-fees.png",
      "/showcase/explorations/doremi/doremi-hero.png",
      "/showcase/explorations/doremi/doremi-feature.png",
    ],
    wip: true, // WIP tag
    visit: { href: "https://doremi-landing-ui.vercel.app/", label: "Visit" }, // With Visit Link
  },
  {
    title: "Custom Icons",
    images: ["/showcase/explorations/design-exp/tr-assets.png"],
  },
  {
    title: "Micro-animation, Interaction",
    images: ["/showcase/explorations/ai/manus.mp4"],
    poster: "/showcase/explorations/ai/motion.png",
  },
  {
    title: "Chatter.sh, Side Project, Concept",
    images: [
      "/showcase/explorations/chatter/dashboard.png",
      "/showcase/explorations/chatter/cluster-details.png",
      "/showcase/explorations/chatter/chat.png",
    ],
  },
];
