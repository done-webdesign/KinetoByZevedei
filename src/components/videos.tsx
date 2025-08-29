import { useEffect, useRef, useState } from "react";
import smallLogo from "../assets/images/logo-small.webp";

const videos = [
  "/videos/video-1.mp4",
  "/videos/video-2.mp4",
  "/videos/video-5.mp4",
  "/videos/video-4.mp4",
];

export default function VideoCarousel() {
  const scroller = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMuted] = useState<boolean[]>(() => videos.map(() => true));
  const [isPlaying, setIsPlaying] = useState<boolean[]>(() => videos.map(() => false));
  const [flashIndicator, setFlashIndicator] = useState<boolean[]>(() => videos.map(() => false));
  const flashTimers = useRef<(number | undefined)[]>([]);

  // Auto play/pause when in view
  useEffect(() => {
    const els = videoRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target as HTMLVideoElement;
          const idx = els.indexOf(vid);
          if (idx === -1) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            try {
              vid.muted = true; // ensure autoplay works
              vid.play().then(() => {
                setIsPlaying((s) => {
                  const copy = [...s];
                  copy[idx] = true;
                  return copy;
                });
              }).catch(() => {});
            } catch {}
          } else {
            vid.pause();
            setIsPlaying((s) => {
              const copy = [...s];
              copy[idx] = false;
              return copy;
            });
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 1] }
    );
    els.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, []);

  const scrollBy = (delta: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="px-4 py-8 lg:px-0 relative">
      {/* Background shapes */}
      <div className="background-1"></div>
      <div className="background-2"></div>
      <div className="background-3"></div>

      {/* Native scroll-snap carousel */}
      <div className="relative banner-2 p-3 md:p-8 lg:p-11">
        <div
          ref={scroller}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ scrollPaddingInline: 16 }}
          aria-label="Video gallery"
        >
          {videos.map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 snap-start rounded-2xl cursor-pointer select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const vid = videoRefs.current[i];
                  if (!vid) return;
                  if (vid.paused) {
                    vid.play().catch(() => {});
                    setIsPlaying((s) => { const c=[...s]; c[i]=true; return c; });
                  } else {
                    vid.pause();
                    setIsPlaying((s) => { const c=[...s]; c[i]=false; return c; });
                  }
                  // flash indicator
                  setFlashIndicator((s) => { const c=[...s]; c[i]=true; return c; });
                  window.clearTimeout(flashTimers.current[i]);
                  // @ts-ignore
                  flashTimers.current[i] = window.setTimeout(() => {
                    setFlashIndicator((s) => { const c=[...s]; c[i]=false; return c; });
                  }, 700);
                }
              }}
              onClick={() => {
                const vid = videoRefs.current[i];
                if (!vid) return;
                if (vid.paused) {
                  vid.play().catch(() => {});
                  setIsPlaying((s) => { const c=[...s]; c[i]=true; return c; });
                } else {
                  vid.pause();
                  setIsPlaying((s) => { const c=[...s]; c[i]=false; return c; });
                }
                // flash indicator
                setFlashIndicator((s) => { const c=[...s]; c[i]=true; return c; });
                window.clearTimeout(flashTimers.current[i]);
                // @ts-ignore
                flashTimers.current[i] = window.setTimeout(() => {
                  setFlashIndicator((s) => { const c=[...s]; c[i]=false; return c; });
                }, 700);
              }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                className="w-[250px] h-[500px] object-cover rounded-2xl shadow"
                preload="metadata"
                playsInline
                muted={isMuted[i]}
                autoPlay
                loop
                controls={false}
                // remove poster to avoid static frame first
              >
                <source src={src} type="video/mp4" />
              </video>

              {/* Center play/pause indicator (YouTube-like) */}
              <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${flashIndicator[i] ? 'opacity-100' : 'opacity-0'}`}
              >
                {isPlaying[i] ? (
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="white" className="bg-black/40 rounded-full p-3">
                    <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                    <rect x="14" y="5" width="4" height="14" rx="1"></rect>
                  </svg>
                ) : (
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="white" className="bg-black/40 rounded-full p-3">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Nav buttons (optional for mouse users) */}
        <button
          onClick={() => scrollBy(-300)}
          className="btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white w-9 h-9 flex justify-center items-center rounded-lg p-2 shadow hover:bg-black/60"
          aria-label="Previous videos"
        >
          &#8249;
        </button>
        <button
          onClick={() => scrollBy(300)}
          className="btn-next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white w-9 h-9 flex justify-center items-center rounded-lg p-2 shadow hover:bg-black/60"
          aria-label="Next videos"
        >
          &#8250;
        </button>
      </div>

      {/* Bottom spacing */}
      <div className="margin-box-2"></div>
    </div>
  );
}
