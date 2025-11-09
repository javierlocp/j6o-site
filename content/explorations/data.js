// Tiny path builder
import { explorationAsset } from "@/lib/media";

// Exploration Grid Preview Data Structure

/** @typedef {{
 *   title: string;
 *   slug: string;
 *   images: string[];
 *   wip?: boolean;
 *   poster?: string;
 *   visit?: { href: string; label?: string };
 *   tags?: string[];
 *   description?: string;
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
    slug: "doremi",
    wip: true, // WIP tag
    visit: { href: "https://doremi-landing-ui.vercel.app/", label: "Visit" }, // With Visit Link
  },
  {
    title: "Custom Icons",
    slug: "misc",
    images: [explorationAsset("misc", "pixel-icon.png")],
  },
  {
    title: "Micro-animation, Interaction",
    slug: "micro-animation",
    images: [explorationAsset("micro-animation", "manus.mp4")],
  },
  {
    title: "Chatter.sh, Side Project, Concept",
    slug: "chatter",
    images: [
      explorationAsset("chatter", "dashboard.png"),
      explorationAsset("chatter", "cluster-details.png"),
      explorationAsset("chatter", "chat.png"),
    ],
  },
];

export const getExplorations = () => explorations;
