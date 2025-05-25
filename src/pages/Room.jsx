import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";

function Room() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#1c1c2b]">
        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
            🎬
          </div>
          <span className="text-lg font-semibold">You</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-sm"
        >
          Leave Room
        </button>
      </div>

      {/* Main */}
      <div className="flex flex-1">
        {/* Video Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {!videoUrl ? (
            <div className="text-center text-gray-300 animate-pulse">
              <p className="text-2xl mb-2">🍿 Ready to start the show?</p>
              <p className="text-md text-gray-400">
                Paste a YouTube embed link below
              </p>
            </div>
          ) : (
            <iframe
              src={videoUrl}
              className="w-full h-[60vh] rounded-lg shadow-xl"
              allow="autoplay"
              allowFullScreen
              title="video"
            ></iframe>
          )}
          <input
            type="text"
            placeholder="Paste YouTube Embed Link"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-6 w-full max-w-md px-4 py-2 text-black rounded-md shadow"
          />
        </div>

        {/* Chat Section */}
        <div className="w-80 bg-[#1a1a2e] p-4 border-l border-white/10 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            💬 Chat
          </h3>
          <div className="flex-1 overflow-y-auto mb-2 space-y-2 scrollbar-thin">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className="bg-white/10 p-2 rounded-md text-sm max-w-full break-words"
              >
                {msg}
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-md text-black"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
