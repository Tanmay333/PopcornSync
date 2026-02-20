import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sampleVideo from "../assets/sample.mp4";
import socket from "../socket";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const { roomId } = useParams();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showCenterIcon, setShowCenterIcon] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const saved = localStorage.getItem("videoState");
    if (!saved || !videoRef.current) return;

    const { time, isPlaying } = JSON.parse(saved);

    videoRef.current.currentTime = time;
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, []);

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
    const handleRequestVideoState = () => {
      if (!videoRef.current) return;

      socket.emit("send-video-state", {
        roomId,
        time: videoRef.current.currentTime,
        isPlaying: !videoRef.current.paused,
      });
    };

    socket.on("request-video-state", handleRequestVideoState);

    return () => {
      socket.off("request-video-state", handleRequestVideoState);
    };
  }, [roomId]);

  useEffect(() => {
    const handleSyncVideoState = ({ time, isPlaying }) => {
      if (!videoRef.current) return;

      videoRef.current.currentTime = time;
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    };

    socket.on("sync-video-state", handleSyncVideoState);

    return () => {
      socket.off("sync-video-state", handleSyncVideoState);
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
      localStorage.setItem(
        "videoState",
        JSON.stringify({ time: video.currentTime, isPlaying: true }),
      );
    } else {
      video.pause();
      socket.emit("pause-video", { time: video.currentTime });
      localStorage.setItem(
        "videoState",
        JSON.stringify({ time: video.currentTime, isPlaying: false }),
      );

      setShowCenterIcon(true);
      setTimeout(() => setShowCenterIcon(false), 600);
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

    localStorage.setItem(
      "videoState",
      JSON.stringify({
        time: newTime,
        isPlaying: !videoRef.current.paused,
      }),
    );

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
    <div className="w-[1100px] max-w-[85vw] mx-auto">
      <div className="relative group w-full">
        <video
          ref={videoRef}
          src={sampleVideo}
          className="w-full rounded-2xl bg-black cursor-pointer"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            videoRef.current.currentTime = 0;
          }}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
          onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
        />

        {showCenterIcon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <div className="bg-black/60 p-6 rounded-full">
              <span className="text-white text-4xl">▶</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-white text-sm text-center mb-2">
            {formatTime(currentTime)} / {formatTime(duration)}
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
      </div>
    </div>
  );
}
