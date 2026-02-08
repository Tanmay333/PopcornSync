import { useRef, useState, useEffect } from "react";
import sampleVideo from "../assets/sample.mp4";

export default function VideoPlayer() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;

      // Space → Play / Pause
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }

      // → Forward 5s
      if (e.code === "ArrowRight") {
        video.currentTime = Math.min(video.currentTime + 5, duration);
      }

      // ← Backward 5s
      if (e.code === "ArrowLeft") {
        video.currentTime = Math.max(video.currentTime - 5, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [duration]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const seekToPosition = (clientX, bar) => {
    if (!videoRef.current || !duration) return;

    const rect = bar.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;

    videoRef.current.currentTime = percent * duration;
  };

  return (
    <div className="w-[920px] max-w-full">
      <video
        ref={videoRef}
        src={sampleVideo}
        className="w-full rounded-2xl bg-black"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
      />

      <div className="mt-4 space-y-4">
        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            className="bg-[#6C63FF] text-white px-6 py-2 rounded-xl"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        <div
          onMouseDown={(e) => {
            setIsDragging(true);
            seekToPosition(e.clientX, e.currentTarget);
          }}
          onMouseMove={(e) => {
            if (!isDragging) return;
            seekToPosition(e.clientX, e.currentTarget);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onClick={(e) => seekToPosition(e.clientX, e.currentTarget)}
          className="w-full h-2 bg-gray-700 rounded-full cursor-pointer"
        >
          <div
            className="h-full bg-[#6C63FF] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-white text-sm mt-2 text-center">
        {duration > 0
          ? `${formatTime(currentTime)} / ${formatTime(duration)}`
          : "Loading..."}
      </div>
    </div>
  );
}
