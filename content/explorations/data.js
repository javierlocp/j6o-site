// Tiny path builder
import { explorationAsset } from "@/lib/media";

// Exploration Grid Preview Data Structure

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
      explorationAsset("doremi", "doremi-landing-vid-v2.mp4"),
      explorationAsset("doremi", "doremi-about.png"),
      explorationAsset("doremi", "doremi-compare-fees.png"),
      explorationAsset("doremi", "doremi-hero.png"),
      explorationAsset("doremi", "doremi-feature.png"),
    ],
    wip: true, // WIP tag
    visit: { href: "https://doremi-landing-ui.vercel.app/", label: "Visit" }, // With Visit Link
  },
  {
    title: "Custom Icons",
    images: [explorationAsset("design-exp", "pixel-icon.png")],
  },
  {
    title: "Micro-animation, Interaction",
    images: [explorationAsset("ai", "manus.mp4")],
    poster: [explorationAsset("ai", "motion.png")],
  },
  {
    title: "Chatter.sh, Side Project, Concept",
    images: [
      explorationAsset("chatter", "dashboard.png"),
      explorationAsset("chatter", "cluster-details.png"),
      explorationAsset("chatter", "chat.png"),
    ],
  },
];

export const getExplorations = () => explorations;
