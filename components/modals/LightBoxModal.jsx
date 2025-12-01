"use client";

import { useEffect, useRef, useState } from "react";

export default function lightBoxModal({
  open,
  src,
  alt = "",
  onClose,
  onPrev,
  onNext,
  link,
  wip,
  hasMultipleMedia = false,
}) {
  const overlayRef = useRef(null);

  // Mount long enough to play exit animation
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false); // controls CSS classes

  // Sync with `open` prop
  useEffect(() => {
    if (open) {
      setMounted(true);
      // Wait for the DOM to commit, then trigger visibility
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300); // match transition duration
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock page scroll when visible
  useEffect(() => {
    if (!mounted) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mounted]);

  // Keyboard: Esc / ← / →
  useEffect(() => {
    if (!mounted) return;
    const h = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [mounted, onClose, onPrev, onNext]);

  // Backdrop click
  const onBackdrop = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  // ── Touch swipe (same as before) ──────────────────────────────
  const start = useRef({ x: 0, y: 0 });
  const delta = useRef({ x: 0, y: 0 });
  const swiping = useRef(false);
  const THRESHOLD = 40,
    VERT_TOL = 30;

  const onTouchStart = (e) => {
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY };
    delta.current = { x: 0, y: 0 };
    swiping.current = true;
  };
  const onTouchMove = (e) => {
    if (!swiping.current) return;
    const t = e.touches[0];
    delta.current = {
      x: t.clientX - start.current.x,
      y: t.clientY - start.current.y,
    };
    if (
      Math.abs(delta.current.x) > Math.abs(delta.current.y) &&
      Math.abs(delta.current.y) < VERT_TOL
    ) {
      e.preventDefault?.();
    }
  };
  const onTouchEnd = () => {
    if (!swiping.current) return;
    swiping.current = false;
    const { x, y } = delta.current;
    if (Math.abs(x) >= THRESHOLD && Math.abs(x) > Math.abs(y)) {
      x < 0 ? onNext?.() : onPrev?.();
    }
  };

  if (!mounted) return null;

  const isVideo = /\.(mp4|webm|ogg|mov|m4v)$/i.test(src);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      onClick={onBackdrop}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={[
        "fixed inset-0 z-9999 grid place-items-center", // backdrop fade
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "bg-zinc-950/80",
        visible ? "opacity-100" : "scale-90 opacity-0",
        "motion-reduce:transition-none", // respect reduced motion
      ].join(" ")}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 cursor-pointer transition-all active:scale-80"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <path d="M5.571 21H3v-2.571h2.571V21ZM21 21h-2.571v-2.571H21V21Zm-10.286-5.143h-2.57v2.572H5.57v-2.572h2.572v-2.57h2.57v2.57Zm7.715 2.572h-2.572v-2.572h2.572v2.572Zm-2.572-2.572h-2.57v-2.57h2.57v2.57Zm-2.572-2.57h-2.571v-2.573h2.571v2.572ZM8.144 8.142h2.57v2.57H8.143v-2.57H5.57V5.57h2.573v2.572Zm7.713 2.57h-2.57v-2.57h2.57v2.57Zm2.572-2.57h-2.572V5.57h2.572v2.572ZM5.57 5.57H3V3h2.571v2.571Zm15.429 0h-2.571V3H21v2.571Z" />
        </svg>
      </button>
      <div
        className={[
          "relative will-change-transform",
          // image container fade + scale
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        {isVideo ? (
          <video
            key={src} // resets video when changing slides
            src={src}
            autoPlay
            playsInline
            loop
            muted
            preload="metadata"
            aria-label={`${alt || "Video"} (use space to play/pause)`}
            className="block max-h-[90vh] max-w-[90vw] rounded-lg select-none"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="block max-h-[90vh] max-w-[90vw] rounded-lg object-contain select-none"
            draggable={false}
          />
        )}

        {/* Visit / WIP Tag link (optional conditional) */}

        {/* Visit + WIP badges */}
        {(link?.href || wip) && (
          <div className="absolute top-6 right-6 flex items-center gap-3">
            {wip && (
              <span className="rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white/90">
                Work in progress
              </span>
            )}
            {link?.href && (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex self-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black drop-shadow-lg transition-all hover:bg-white/80 active:scale-90"
              >
                {link.label || "Visit"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  className="ml-0.5 inline-block h-3.5 w-3.5"
                >
                  <path d="M14 38h-4v-4h4v4Zm4-4h-4v-4h4v4Zm20 0h-4V18h-4v-4H14v-4h24v24Zm-16-4h-4v-4h4v4Zm4-4h-4v-4h4v4Zm4-4h-4v-4h4v4Z" />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Prev / Next */}
        {hasMultipleMedia && (
          <>
            <button
              onClick={onPrev}
              className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-black transition-all hover:bg-white hover:text-black active:scale-80"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.286 21h-2.571v-2.571h2.571V21Zm-2.571-2.571h-2.571v-2.572h2.57v2.572Zm-2.571-2.572H9.572v-2.57h2.572v2.57Zm-2.573-2.57H7v-2.573h2.571v2.572Zm2.573-2.573H9.572V8.143h2.572v2.57Zm2.57-2.571h-2.57V5.57h2.57v2.572Zm2.572-2.572h-2.571V3h2.571v2.571Z" />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/20 p-2 text-black transition-all hover:cursor-pointer hover:bg-white hover:text-black active:scale-80"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.571 21H7v-2.571h2.571V21Zm2.573-2.571H9.57v-2.572h2.572v-2.57h2.57v2.57h-2.57v2.572Zm5.141-5.143h-2.571v-2.572h2.571v2.572Zm-5.141-5.143h2.57v2.57h-2.571v-2.57H9.57V5.57h2.573v2.572ZM9.57 5.57H7V3h2.571v2.571Z" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
