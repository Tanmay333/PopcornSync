import VideoPlayer from "../components/VideoPlayer";
import ChatPanel from "../components/ChatPanel";
import RoomHeader from "../components/RoomHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import socket from "../socket";

export default function Room() {
  const roomId = useParams();

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  return (
    <div className="h-screen bg-[#0B0B0F] p-8">
      <div className="mb-4 px-2 text-white flex items-center justify-between">
        <h1 className="text-lg font-semibold">🎬 PopcornSync Room</h1>

        <span className="text-sm text-gray-400">2 participants</span>
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <VideoPlayer />
        </div>

        <div className="self-stretch">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}
