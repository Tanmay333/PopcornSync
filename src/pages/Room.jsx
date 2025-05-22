import React from "react";
import { useLocation, useParams } from "react-router-dom";

function Room() {
  const { roomCode } = useParams();
  const location = useLocation();
  const theaterType = location.state?.theaterType || "movie"; // default

  const roomLink = `${window.location.origin}/room/${roomCode}`;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">
          🎭 {theaterType.toUpperCase()} Theater
        </h2>
        <div className="text-right">
          <p className="text-sm">
            Room Code:{" "}
            <span className="text-green-400 font-mono">{roomCode}</span>
          </p>
          <p className="text-sm">
            Invite Link:{" "}
            <a href={roomLink} className="text-blue-300 underline">
              {roomLink}
            </a>
          </p>
        </div>
      </div>

      {/* Screen Area */}
      <div className="w-full max-w-3xl bg-gray-800 aspect-video rounded-xl flex items-center justify-center text-gray-400">
        <p>🎬 Your video will appear here</p>
      </div>

      {/* Add Video Button */}
      <button
        className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-xl hover:bg-yellow-400"
        onClick={() => alert("Coming Soon: Add video")}
      >
        ➕ Add Video
      </button>
    </div>
  );
}

export default Room;
