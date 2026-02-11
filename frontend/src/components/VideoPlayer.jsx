import { useRef, useState, useEffect } from "react";
import sampleVideo from "../assets/sample.mp4";
import socket from "../socket";

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
    const handlePlay = ({ time }) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = time;
      videoRef.current.play();
    };

    const handlePause = ({ time }) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = time;
      videoRef.current.pause();
    };

    socket.on("play-video", handlePlay);
    socket.on("pause-video", handlePause);

    return () => {
      socket.off("play-video", handlePlay);
      socket.off("pause-video", handlePause);
    };
  }, []);

  useEffect(() => {
    const handleSeek = ({ time }) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = time;
    };

    socket.on("seek-video", handleSeek);

    return () => {
      socket.off("seek-video", handleSeek);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }

      if (e.code === "ArrowRight") {
        video.currentTime = Math.min(video.currentTime + 5, duration);
      }

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
      socket.emit("play-video", { time: video.currentTime });
    } else {
      video.pause();
      socket.emit("pause-video", { time: video.currentTime });
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const seekToPosition = (clientX, bar, emit = false) => {
    if (!videoRef.current || !duration) return;

    const rect = bar.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;
    const newTime = percent * duration;

    videoRef.current.currentTime = newTime;

    if (emit) {
      socket.emit("seek-video", { time: newTime });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    seekToPosition(e.clientX, e.currentTarget, false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    seekToPosition(e.clientX, e.currentTarget, false);
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    seekToPosition(e.clientX, e.currentTarget, true);
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
          videoRef.current.currentTime = 0;
        }}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
          onClick={(e) => seekToPosition(e.clientX, e.currentTarget, true)}
          className="w-full h-2 bg-gray-700 rounded-full cursor-pointer"
        >
          <div
            className="h-full bg-[#6C63FF] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-white text-sm mt-2 text-center">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}
