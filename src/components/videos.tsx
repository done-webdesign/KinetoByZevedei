import { useRef } from "react";
import smallLogo from "../assets/images/logo-small.webp";

const videos = [
  "/videos/video-1.mp4",
  "/videos/video-2.mp4",
  "/videos/video-5.mp4",
  "/videos/video-4.mp4",
];

export default function VideoCarousel() {
  const scroller = useRef<HTMLDivElement | null>(null);

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
            <div key={i} className="shrink-0 snap-start rounded-2xl">
              <video
                className="w-[250px] h-[500px] object-cover rounded-2xl"
                controls
                preload="metadata"
                playsInline
                muted
                poster={smallLogo.src}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
