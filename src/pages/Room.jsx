import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function Room() {
  const { roomCode, roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const actualRoomCode = roomCode || roomId;
  const theaterType = location.state?.theaterType || "movie";
  const roomLink = `${window.location.origin}/room/${actualRoomCode}`;

  const handleSend = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1a1a1a]">
        <div>
          <div className="text-lg font-bold text-red-500">
            🎭 {theaterType.toUpperCase()} Theater
          </div>
          <div className="text-sm text-yellow-400">
            🍿 Room Code: {actualRoomCode}
          </div>
          <div className="text-sm">
            Invite Link:{" "}
            <a href={roomLink} className="text-blue-300 underline">
              {roomLink}
            </a>
          </div>
        </div>
        <div className="flex gap-3">
          {/* Mock avatars */}
          <div className="flex -space-x-2">
            <img
              src="https://i.pravatar.cc/30?img=1"
              className="w-8 h-8 rounded-full border-2 border-red-600"
            />
            <img
              src="https://i.pravatar.cc/30?img=2"
              className="w-8 h-8 rounded-full border-2 border-red-600"
            />
            <img
              src="https://i.pravatar.cc/30?img=3"
              className="w-8 h-8 rounded-full border-2 border-red-600"
            />
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-sm"
          >
            Leave Room
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="flex flex-1">
        {/* Video Area */}
        <section className="flex-1 flex flex-col items-center justify-center p-6">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="w-full h-[65vh] rounded-lg shadow-xl"
              allow="autoplay"
              allowFullScreen
              title="video"
            ></iframe>
          ) : (
            <div className="text-center text-gray-400">
              🎬 No video yet.
              <br />
              Paste a YouTube embed link below to start watching together!
            </div>
          )}
          <input
            type="text"
            placeholder="Paste YouTube Embed Link"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-6 w-full max-w-md px-4 py-2 rounded-md text-black"
          />
        </section>

        {/* Chat */}
        <aside className="w-[340px] border-l border-white/10 bg-[#181818] flex flex-col">
          <div className="px-4 py-3 border-b border-white/5 text-red-400 font-semibold">
            💬 Live Chat
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className="bg-white/10 p-2 rounded-md max-w-[90%] break-words"
              >
                {msg}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/5 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-md text-black"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Room;
