// components/mdx/mdxComponents.jsx
import VideoEmbed from "./videoEmbed";
import Image from "next/image";
import Link from "next/link";

import { CaseSection, CaseColumns, CaseMedia, CaseText, CaseVideo } from "./caseStudyLayout";

// Extend this over time (Callout, CodeBlock, etc.) without touching every page.
export const mdxComponents = {
  // Case-study specific layout components

  CaseSection,
  CaseColumns,
  CaseMedia,
  CaseText,

  // Video Embed Component
  VideoEmbed,
  CaseVideo,
};
