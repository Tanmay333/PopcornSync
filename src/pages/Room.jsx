import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { FaYoutube, FaNetflix, FaUserFriends } from "react-icons/fa";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [videoInput, setVideoInput] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [source, setSource] = useState("youtube");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [participants] = useState(["You", "Friend1"]);

  const handleSend = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  const handleSourceChange = (type) => {
    setSource(type);
    setVideoUrl("");
    setVideoInput("");
  };

  const convertToEmbedUrl = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\s&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url; // fallback if already embed link
  };

  const handleLoadVideo = () => {
    const embedUrl = convertToEmbedUrl(videoInput);
    setVideoUrl(embedUrl);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0c29] text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-[#1c1c2b] shadow-md">
        <h2 className="text-xl font-bold">🎥 Room: {roomId}</h2>
        <button onClick={() => navigate("/")} className="bg-red-600 px-4 py-2 rounded">
          Leave Room
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Video + Controls */}
        <div className="flex-1 p-6">
          {/* Source Select */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleSourceChange("youtube")}
              className={`flex items-center gap-2 px-4 py-2 rounded ${source === "youtube" ? "bg-blue-600" : "bg-white/10"}`}
            >
              <FaYoutube /> YouTube
            </button>
            <button
              onClick={() => handleSourceChange("netflix")}
              className={`flex items-center gap-2 px-4 py-2 rounded ${source === "netflix" ? "bg-red-600" : "bg-white/10"}`}
            >
              <FaNetflix /> Netflix
            </button>
          </div>

          {/* Video Window */}
          {source === "youtube" ? (
            <>
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  className="w-full h-[65vh] rounded-lg shadow-lg"
                  allow="autoplay"
                  allowFullScreen
                  title="YouTube Video"
                />
              ) : (
                <div className="text-center text-gray-300">
                  <p className="mb-3">Paste a YouTube video link and click "Load Video"</p>
                  <button
                    onClick={() => window.open("https://www.youtube.com", "_blank")}
                    className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    Open YouTube
                  </button>
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="Paste YouTube Link (https://www.youtube.com/watch?v=...)"
                  className="px-4 py-2 w-full max-w-md rounded text-black"
                />
                <button onClick={handleLoadVideo} className="bg-green-600 px-4 py-2 rounded">
                  Load Video
                </button>
              </div>
            </>
          ) : (
            <div className="bg-black/20 rounded-lg p-6 text-center h-[65vh] flex flex-col justify-center items-center">
              <p className="text-lg mb-2">To watch Netflix together:</p>
              <p className="text-sm text-gray-400 mb-4">Start a screen share using browser extension</p>
              <a
                href="https://www.netflix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
              >
                Open Netflix
              </a>
            </div>
          )}
        </div>

        {/* Right: Chat + Participants */}
        <div className="w-80 bg-[#1a1a2e] p-4 border-l border-white/10 flex flex-col">
          <h3 className="text-lg font-semibold mb-3">💬 Chat</h3>
          <div className="flex-1 overflow-y-auto space-y-2 mb-3">
            {chatMessages.map((msg, index) => (
              <div key={index} className="bg-white/10 p-2 rounded text-sm">
                <strong className="text-pink-400">{msg.sender}</strong>: {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="flex-1 px-3 py-2 rounded text-black"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="bg-blue-600 px-3 py-2 rounded">
              <FiSend />
            </button>
          </div>

          {/* Participants */}
          <div className="mt-4">
            <h4 className="text-sm font-bold mb-2 flex items-center gap-1">
              <FaUserFriends /> Participants
            </h4>
            <ul className="space-y-1 text-sm">
              {participants.map((user, index) => (
                <li key={index} className="text-white/80">{user}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
