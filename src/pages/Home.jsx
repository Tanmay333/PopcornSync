import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-purple-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-4 tracking-wide text-yellow-400">
        🍿 PopcornSync
      </h1>

      <p className="text-lg mb-8 text-gray-300 text-center max-w-md">
        Watch movies and shows with your friends no matter where they are. Sync
        playback and enjoy together!
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => navigate("/create-room")}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-300"
        >
          🎬 Create Room
        </button>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter Room Code"
            className="px-4 py-2 rounded-lg text-black focus:outline-none"
          />
          <button className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-all">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
