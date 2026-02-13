import VideoPlayer from "../components/VideoPlayer";
import ChatPanel from "../components/ChatPanel";
import RoomHeader from "../components/RoomHeader";
import { useEffect } from "react";
import socket from "../socket";

export default function Room() {
  const roomId = "test-room";

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, []);

  return (
    <div className="h-screen bg-[#0B0B0F] flex items-start gap-4 p-9">
      {/* LEFT: VIDEO AREA */}
      <div className="flex-1 flex items-center justify-center">
        <VideoPlayer />
      </div>

      {/* RIGHT: CHAT PANEL */}
      <ChatPanel />
    </div>
  );
}
