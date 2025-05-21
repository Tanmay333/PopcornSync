import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function CreateRoom() {
  const [friendCount, setFriendCount] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (friendCount === "" || isNaN(friendCount)) {
      alert("Please enter a valid number of friends.");
      return;
    }

    const code = uuidv4().slice(0, 6); // Generate 6-char unique code
    setRoomCode(code);
  };

  const handleCopy = () => {
    const link = `${window.location.origin}/room/${roomCode}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        🎥 Create Room
      </h1>

      {!roomCode ? (
        <div className="flex flex-col gap-4 items-center">
          <input
            type="number"
            placeholder="How many friends?"
            value={friendCount}
            onChange={(e) => setFriendCount(e.target.value)}
            className="px-4 py-2 rounded-md text-black"
          />
          <button
            onClick={handleCreateRoom}
            className="bg-yellow-500 text-black px-6 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            Create Room
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-lg">✅ Room Created!</p>
          <p>
            <span className="font-bold text-green-400">Room Code:</span>{" "}
            {roomCode}
          </p>
          <p>
            <span className="font-bold text-blue-400">Room Link:</span>
            <br />
            <a href={`/room/${roomCode}`} className="text-blue-300 underline">
              {window.location.origin}/room/{roomCode}
            </a>
          </p>
          <button
            onClick={handleCopy}
            className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-400 transition"
          >
            Copy Invite Link 📋
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateRoom;
