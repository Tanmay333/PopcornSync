import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

const Room = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [participants] = useState(["You", "Aditi", "Rahul", "Ankit"]);

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;
    setMessages([...messages, { user: "You", text: chatInput }]);
    setChatInput("");
    setShowEmojiPicker(false);
  };

  const handlePlay = () => {
    if (ReactPlayer.canPlay(youtubeUrl)) {
      setCurrentUrl(`${youtubeUrl}?rel=0`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c2b] to-[#12121a] text-white p-4 md:p-8 font-sans overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🎥 PopcornSync Room</h1>
        <p className="text-sm text-gray-400">
          Room Code:{" "}
          <span className="font-mono bg-gray-800 px-2 py-1 rounded">a3345</span>
        </p>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black/60 rounded-xl p-4 shadow-xl">
            {!currentUrl && (
              <div className="h-[570px] flex items-center justify-center text-gray-400 text-lg">
                🎬 Movie will begin shortly...
              </div>
            )}
            {currentUrl && (
              <ReactPlayer
                url={currentUrl}
                controls
                playing
                width="100%"
                height="570px"
              />
            )}
          </div>

          {/* Paste Link */}
          <div className="flex gap-3">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube link here..."
              className="flex-grow bg-white/10 px-4 py-2 rounded border border-white/20 focus:outline-none"
            />
            <button
              onClick={handlePlay}
              className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded font-medium"
            >
              ▶️ Play
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Participants */}
          <div className="bg-black/60 rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">👥 Participants</h2>
            <ul className="space-y-1 text-sm text-white/80">
              {participants.map((name, i) => (
                <li key={i} className="bg-white/5 px-3 py-1 rounded">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Section */}
          <div className="bg-black/60 rounded-xl p-4 shadow-lg h-[450px] flex flex-col">
            <h2 className="text-lg font-semibold mb-2">💬 Chat</h2>
            <div className="flex-grow overflow-y-auto space-y-2 mb-3">
              {messages.map((msg, i) => (
                <div key={i} className="bg-white/10 px-3 py-2 rounded text-sm">
                  <strong>{msg.user}: </strong>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="relative flex items-center">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="mr-2 text-xl text-yellow-400"
              >
                <FaSmile />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-14 z-10">
                  <EmojiPicker
                    onEmojiClick={(e) => setChatInput(chatInput + e.emoji)}
                    theme="dark"
                  />
                </div>
              )}
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-white/10 px-3 py-2 rounded border border-white/20 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
