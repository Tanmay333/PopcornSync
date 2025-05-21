import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomCode.trim() === "") {
      alert("Please enter a room code.");
      return;
    }

    navigate(`/room/${roomCode}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">🔑 Join Room</h1>
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className="px-4 py-2 rounded text-black"
      />
      <button
        onClick={handleJoin}
        className="mt-4 px-6 py-2 bg-blue-500 rounded hover:bg-blue-400 text-white"
      >
        Join
      </button>
    </div>
  );
}

export default JoinRoom;
