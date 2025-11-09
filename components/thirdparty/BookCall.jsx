"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function BookCall() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "book-a-call" });
      cal("ui", {
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      className="mt-6 mb-22 flex items-center gap-1 rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-900 transition-transform hover:cursor-pointer hover:bg-gray-300 active:scale-95"
      data-cal-namespace="book-a-call"
      data-cal-link="javierlo/book-a-call"
      data-cal-config='{"layout":"month_view"}'
    >
      <span
        aria-hidden
        className="relative inline-block size-2 rounded-full bg-green-500 before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-green-400 before:opacity-75 before:content-['']"
      />
      <div className="flex items-center">
        <span className="px-2">Exploring new opportunities</span>
        {/* Optional extra text:
        <div className="h-4 w-px bg-gradient-to-b from-transparent via-gray-400/70 to-transparent" />
        <span className="px-2">Let's Talk</span> */}
      </div>
    </button>
  );
}
