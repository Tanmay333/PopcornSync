import { useRef, useState } from "react";
import sampleVideo from "../assets/sample.mp4";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="w-[920px] max-w-full">
      <video
        ref={videoRef}
        src={sampleVideo}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          videoRef.current.currentTime = 0;
        }}
        onLoadedMetadata={() => {
          setDuration(videoRef.current.duration);
        }}
        onTimeUpdate={() => {
          setCurrentTime(videoRef.current.currentTime);
        }}
        className="w-full rounded-2xl bg-black"
      />

      <div className="flex justify-center mt-4">
        <button
          onClick={togglePlay}
          className="bg-[#6C63FF] text-white px-6 py-2 rounded-xl"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <div className="text-white text-sm mt-2 text-center">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}
