"use client";

/**
 * Cinematic ambient video. The poster (any fill-mode element, usually a
 * priority next/image) paints with SSR; the MP4 starts loading only when the
 * frame approaches the viewport, fades in over the poster once it can play,
 * and pauses whenever it scrolls offscreen.
 *
 * Reduced motion or save-data: the poster simply stays — the page is
 * complete without a single video byte downloaded.
 */
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export function AmbientVideo({
  src,
  poster,
  className,
  videoClassName,
}: {
  src: string;
  /** Fill-mode poster content (e.g. a priority next/image). */
  poster: ReactNode;
  className?: string;
  videoClassName?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Start loading when the frame gets near the viewport.
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData
    ) {
      return;
    }
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Play only while visible.
  useEffect(() => {
    if (!load) return;
    const host = hostRef.current;
    const video = videoRef.current;
    if (!host || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [load]);

  return (
    <div ref={hostRef} className={cn("relative overflow-hidden", className)}>
      {poster}
      {load ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
            videoClassName,
          )}
        />
      ) : null}
    </div>
  );
}
