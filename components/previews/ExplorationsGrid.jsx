import Image from "next/image";
import { getExplorations } from "@/content/explorations/data";
import { isVideoSrc } from "@/lib/media";
import LightBoxModal from "@/components/modals/LightBoxModal";
import { useState, useRef, useEffect } from "react";

const thumbs = getExplorations();

function VideoThumb({ sources = [], className }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);

  // Try to autoplay as soon as the video can play
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Important for iOS Safari: set these before play()d
    v.muted = true;
    v.playsInline = true;

    const tryPlay = () => {
      // On mobile Safari, play() may reject without a user gesture.
      // We do NOT mark this as failed; just ignore and keep the video element.
      v.play().catch(() => {});
    };

    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("canplay", tryPlay, { once: true });

    return () => v.removeEventListener("canplay", tryPlay);
  }, [sources]);

  // Pause when not visible; resume when in view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: "150px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // iOS safety: on first user gesture, try to play again (some builds require a gesture)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let done = false;
    const kick = () => {
      if (done) return;
      done = true;
      v.play().catch(() => {});
      window.removeEventListener("touchstart", kick, true);
      window.removeEventListener("mousedown", kick, true);
    };
    window.addEventListener("touchstart", kick, true);
    window.addEventListener("mousedown", kick, true);
    return () => {
      window.removeEventListener("touchstart", kick, true);
      window.removeEventListener("mousedown", kick, true);
    };
  }, []);

  if (failed) {
    return <div className={className + " bg-black"} />;
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className + " bg-black"}
      controls={false}
      disableRemotePlayback
      onError={() => setFailed(true)}
      onLoadedMetadata={() => {
        const v = videoRef.current;
        if (v) v.play().catch(() => {});
      }}
    >
      {sources.map((s, i) => (
        <source key={i} src={s.src} type={s.type} />
      ))}
    </video>
  );
}

export default function ExplorationsGrid() {
  const [open, setOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const openAt = (projectIdx, imageIdx = 0) => {
    setProjectIndex(projectIdx);
    setImageIndex(imageIdx);
    setOpen(true);
  };

  const next = () => {
    const imgs = thumbs[projectIndex].images ?? [];
    if (imgs.length > 1) {
      setImageIndex((prev) => (prev + 1) % imgs.length);
    } else {
      // no-op if there's only one image or video
      setImageIndex(0);
    }
  };

  const prev = () => {
    const imgs = thumbs[projectIndex].images ?? [];
    if (imgs.length > 1) {
      setImageIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
    } else {
      // no-op if there's only one image or video
      setImageIndex(0);
    }
  };

  return (
    <section aria-label="Project Preview" className="mb-20">
      <div className="mb-10 flex flex-col">
        <h2 className="mb-4 text-base text-neutral-50">Design & Exploration</h2>
        <p>
          Check out some of my side projects and design explorations below, or
          get in touch if you'd like to read full case studies.
        </p>
      </div>

      {/* Project Gallery Grid */}

      <div className="columns-1 gap-2.5 [column-fill:balance]">
        {thumbs.map((t, idx) => {
          const firstMedia = t.images?.[0];
          const hasVideo = !!(t.videos?.hevc || t.videos?.h264);

          return (
            <div key={t.title} className="relative mb-2 break-inside-avoid">
              <button
                type="button"
                onClick={() => openAt(idx)}
                className="group/thumbnail relative block aspect-3/2 w-full cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none"
                aria-label={`Open ${t.title}`}
              >
                {hasVideo ? (
                  <VideoThumb
                    sources={[
                      t.videos?.hevc && {
                        src: t.videos.hevc,
                        type: "video/mp4; codecs=hevc",
                      },
                      t.videos?.h264 && {
                        src: t.videos.h264,
                        type: "video/mp4",
                      },
                    ].filter(Boolean)}
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]"
                  />
                ) : firstMedia ? (
                  <Image
                    src={firstMedia}
                    alt={t.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 2} // preloads top items for faster LCP
                    className="object-contain transition-transform duration-300 ease-out group-hover/thumbnail:scale-[1.02]"
                  />
                ) : (
                  <div className="aspect-3/2 w-full bg-neutral-800" />
                )}

                {/* hover title */}
                <div className="pointer-events-none absolute bottom-3 left-3 translate-y-1 rounded-sm bg-neutral-50/90 px-2 py-1 text-xs text-neutral-950 opacity-0 transition-all duration-200 ease-out group-hover/thumbnail:translate-y-0 group-hover/thumbnail:opacity-100">
                  {t.title}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {(() => {
        const current = thumbs[projectIndex];
        const currentImage = current.images?.[imageIndex];
        const currentVideo =
          current.videos?.h264 || current.videos?.hevc || null;
        const currentSrc = currentImage || currentVideo || "";

        return (
          <LightBoxModal
            open={open}
            src={currentSrc}
            alt={current.title}
            onClose={() => setOpen(false)}
            onPrev={prev}
            onNext={next}
            link={current?.visit}
            wip={current?.wip}
          />
        );
      })()}
    </section>
  );
}
