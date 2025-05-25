import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

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
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a1a1a] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-8 text-red-600 drop-shadow-lg">
        🍿 PopcornSync
      </h1>

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <button
          onClick={() => navigate("/create-room")}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-2xl text-lg font-semibold w-full"
        >
          <FaPlusCircle /> Create Room
        </button>

        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-gray-400 backdrop-blur-md border border-white/20"
          />
          <button
            onClick={handleJoin}
            className="bg-green-600 hover:bg-green-500 px-5 rounded-xl text-white font-medium"
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>

        <div className="text-center text-xs text-gray-400 mt-4">
          Made with ❤️ for movie nights
        </div>
      </div>
    </div>
  );
}

export default Home;
