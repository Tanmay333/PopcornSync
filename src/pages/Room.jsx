import React from "react";
import { useParams } from "react-router-dom";

function Room() {
  const { roomId } = useParams();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">
        🍿 Welcome to Room
      </h1>
      <p className="text-lg">
        Room Code: <span className="font-mono text-green-400">{roomId}</span>
      </p>

      <p className="mt-4 text-sm text-gray-400">
        Streaming & sync functionality will be added here soon.
      </p>
    </div>
  );
}

export default Room;
