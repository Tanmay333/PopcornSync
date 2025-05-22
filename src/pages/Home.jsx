// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaDoorOpen } from "react-icons/fa";
import { IoMdCodeWorking } from "react-icons/io";

function Home() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = () => {
    if (roomCode.trim() !== "") {
      navigate(`/room/${roomCode}`);
    } else {
      alert("Please enter a room code");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 text-white flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white/10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-red-500 drop-shadow-lg animate-pulse">
          🍿 PopcornSync
        </h1>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => navigate("/create-room")}
            className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-xl font-semibold text-white shadow-md"
          >
            <FaVideo /> Create Room
          </button>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg text-black outline-none border border-gray-300"
              />
              <button
                onClick={handleJoin}
                className="bg-green-600 hover:bg-green-500 transition px-4 py-2 rounded-lg text-white font-medium"
              >
                <IoMdCodeWorking size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-300 text-center">
              Join with a room code
            </p>
          </div>

          <div className="text-center text-xs text-gray-400 mt-4">
            Made with ❤️ for movie nights
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
