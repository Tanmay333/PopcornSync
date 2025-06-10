import { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import ReactPlayer from "react-player";

const Room = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoStarted, setVideoStarted] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const roomCode = "a645b";
  const roomLink = `${window.location.origin}/room/${roomCode}`;

  const handleSendMessage = () => {
    if (chatInput.trim() !== "") {
      setMessages([...messages, chatInput]);
      setChatInput("");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleStartVideo = () => {
    if (youtubeLink.trim()) {
      setVideoStarted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2b] via-[#111321] to-[#0c0d15] text-white flex">
      {/* Left: Main Video Screen */}
      <div className="w-3/5 flex flex-col justify-center items-center p-8 border-r border-white/10">
        <div className="bg-black/40 backdrop-blur-xl w-full h-[400px] rounded-xl flex items-center justify-center text-center shadow-xl border border-white/10">
          {videoStarted && ReactPlayer.canPlay(youtubeLink) ? (
            <ReactPlayer
              url={`${youtubeLink}?rel=0`}
              controls
              playing
              width="100%"
              height="100%"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            />
          ) : (
            <h1 className="text-3xl font-semibold text-white/80">
              🎬 Movie will begin shortly…
            </h1>
          )}
        </div>

        {/* YouTube Link Input + Start Button */}
        <div className="mt-6 w-full max-w-xl flex space-x-2">
          <input
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="Paste YouTube link here"
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/40 text-white focus:outline-none"
          />
          <button
            onClick={handleStartVideo}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white font-medium"
          >
            Start Movie
          </button>
        </div>
      </div>

      {/* Right: Room Info + Chat */}
      <div className="w-2/5 flex flex-col justify-between p-6">
        {/* Room Info */}
        <div className="bg-white/5 p-4 rounded-xl shadow-md border border-white/10 mb-4">
          <h2 className="text-xl font-bold mb-2">🍿 Room Details</h2>
          <div className="flex justify-between items-center bg-black/30 p-2 rounded mb-2 text-sm">
            <span>
              Room Code: <strong>{roomCode}</strong>
            </span>
            <button
              onClick={() => handleCopy(roomCode)}
              className="text-xs bg-pink-600 px-3 py-1 rounded hover:bg-pink-500"
            >
              Copy
            </button>
          </div>
          <div className="flex justify-between items-center bg-black/30 p-2 rounded text-sm">
            <span className="truncate w-[70%]">{roomLink}</span>
            <button
              onClick={() => handleCopy(roomLink)}
              className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col justify-between bg-white/5 rounded-xl p-4 shadow-md border border-white/10">
          <div className="overflow-y-auto space-y-2 mb-4 max-h-[250px] pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className="bg-black/20 px-3 py-2 rounded text-sm text-white/80 w-fit max-w-[80%]"
              >
                {msg}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button className="text-xl">
              <FaSmile />
            </button>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded bg-white/10 text-white border border-white/20 placeholder-white/40 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-600 px-3 py-2 rounded text-sm hover:bg-green-500"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/30 mt-6">
          Watching together, made magical. ✨
        </p>
      </div>
    </div>
  );
};

export default Room;
