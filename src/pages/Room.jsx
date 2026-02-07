import VideoPlayer from "../components/VideoPlayer";
import ChatPanel from "../components/ChatPanel";
import RoomHeader from "../components/RoomHeader";

export default function Room() {
  return (
    <div className="h-screen bg-[#0B0B0F] flex flex-col">
      <RoomHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Video Section */}
        <div className="flex-1 flex items-center justify-center">
          <VideoPlayer />
        </div>

        {/* Chat Section */}
        <ChatPanel />
      </div>
    </div>
  );
}
