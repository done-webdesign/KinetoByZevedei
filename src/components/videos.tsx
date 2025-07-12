import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const videos = [
  "/public/videos/video-1.mp4",
  "/public/videos/video-2.mp4",
  "/public/videos/video-3.mp4",
  "/public/videos/video-4.mp4",
];

export default function VideoCarousel() {
  const [currentStart, setCurrentStart] = useState(0);
  const [videosPerPage, setVideosPerPage] = useState(5);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVideosPerPage(1);
      else if (w < 768) setVideosPerPage(2);
      else if (w < 1024) setVideosPerPage(3);
      else if (w < 1280) setVideosPerPage(4);
      else setVideosPerPage(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const prev = () => {
    setCurrentStart((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentStart((prev) => (prev + 1) % videos.length);
  };

  const visibleVideos = [];
  for (let i = 0; i < videosPerPage; i++) {
    visibleVideos.push(videos[(currentStart + i) % videos.length]);
  }

  const showNav = videos.length > videosPerPage;

  return (
    <div className="px-9 py-12 lg:px-0 relative">
      {/* Background shapes */}
      <div className="background-1"></div>
      <div className="background-2"></div>
      <div className="background-3"></div>

      {/* Carousel */}
      <div className="relative banner-2 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center items-center p-5 md:p-11">
        {visibleVideos.map((src, i) => (
          <div key={i} className="relative rounded-2xl">
            <ReactPlayer
              playing={false} // only play when clicked
              controls={true}
              src={src}
              width="250px"
              height="500px"
              muted
            />
          </div>
        ))}

        {showNav && (
          <>
            <button
              onClick={prev}
              className="btn-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white w-9 h-9 flex justify-center items-center rounded-lg p-2 shadow hover:bg-gray-200"
              aria-label="Previous videos"
            >
              &#8249;
            </button>
            <button
              onClick={next}
              className="btn-next absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white w-9 h-9 flex justify-center items-center rounded-lg p-2 shadow hover:bg-gray-200"
              aria-label="Next videos"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {/* Bottom spacing */}
      <div className="margin-box-2"></div>
    </div>
  );
}
