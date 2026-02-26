import VideoPlayer from "../components/VideoPlayer";
import ChatPanel from "../components/ChatPanel";
import RoomHeader from "../components/RoomHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(1);

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  useEffect(() => {
    socket.on("participants-count", (count) => {
      setParticipants(count);
    });

    return () => {
      socket.off("participants-count");
    };
  }, []);

  const leaveRoom = () => {
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="h-screen bg-[#0B0B0F] p-8">
      <div className="mb-4 px-2 text-white flex items-center justify-between">
        <h1 className="text-lg font-semibold">🎬 PopcornSync Room</h1>
        <div className="flex items-center gap-3 ml-auto "></div>
        <span className="text-sm text-gray-400 pr-3 border-r border-white/10">
          {participants} participant{participants > 1 ? "s" : ""}
        </span>
        <button
          onClick={leaveRoom}
          className="
    px-4 py-2
    rounded-lg
    text-sm
    border border-red-500/40
    text-red-400
    hover:bg-red-500/10
    transition
  "
        >
          Leave Room
        </button>
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
