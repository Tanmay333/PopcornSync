import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { FaRegSmile, FaUsers, FaVideo } from "react-icons/fa";

function Room() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState(["You", "Alex", "Sam"]);

  const handleSend = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#1c1c2b] shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
            🎬
          </div>
          <span className="text-lg font-semibold tracking-wide">You</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-sm font-medium transition-all"
        >
          Leave Room
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Animated Gradient Bubbles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-30 animate-ping bottom-20 right-20" />
        </div>

        {/* Video & Participants Section */}
        <div className="flex-1 flex flex-col items-center justify-start p-8 pt-4 z-10 relative">
          <div className="w-full max-w-4xl bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-5 pb-8 shadow-xl transition-all duration-300">
            {!videoUrl ? (
              <div className="text-center text-gray-300 animate-fade-in space-y-2 py-16">
                <p className="text-3xl font-bold">🎉 Welcome to the Room!</p>
                <p className="text-sm text-gray-400">
                  Paste a YouTube embed link below to start watching together
                </p>
              </div>
            ) : (
              <div className="relative mb-6">
                <iframe
                  src={videoUrl}
                  className="w-full h-[80vh] rounded-lg shadow-2xl border border-white/10"
                  allow="autoplay"
                  allowFullScreen
                  title="video"
                ></iframe>
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center gap-2">
                  <FaVideo /> Playing video...
                </div>
              </div>
            )}
            <input
              type="text"
              placeholder="Paste YouTube Embed Link"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full max-w-sm px-4 py-2 text-black rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />
          </div>

          {/* Participants */}
          <div className="mt-6 w-full max-w-4xl flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {participants.map((user, index) => (
              <div
                key={index}
                className="bg-[#ffffff10] text-white px-4 py-2 rounded-full shadow flex items-center gap-2 text-sm"
              >
                <FaUsers className="text-pink-400" /> {user}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-80 bg-[#121212] p-5 border-l border-white/10 flex flex-col z-10">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            💬 Room Chat
          </h3>
          <div className="flex-1 overflow-y-auto mb-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-1">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className="bg-white/10 px-3 py-2 rounded-lg text-sm max-w-full break-words shadow-sm"
              >
                <p className="text-pink-400 font-medium text-xs">
                  {msg.sender}
                </p>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg text-black border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg shadow transition-all"
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
