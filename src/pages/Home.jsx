// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold mb-10 text-yellow-400">
        🍿 PopcornSync
      </h1>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => navigate("/create-room")}
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-400 transition"
        >
          🎬 Create Room
        </button>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="px-4 py-2 rounded-md text-black outline-none"
          />
          <button
            onClick={handleJoin}
            className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-400 transition"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
