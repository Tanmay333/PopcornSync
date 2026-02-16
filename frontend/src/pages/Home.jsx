import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = "test-room";
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-white text-5xl font-bold tracking-tight">
          PopcornSync 🍿
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Watch movies together. From anywhere.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={createRoom}
            className="bg-[#6C63FF] hover:opacity-90 transition text-white px-7 py-3 rounded-xl text-sm font-medium"
          >
            Create Room
          </button>

          <button className="border border-gray-700 hover:bg-gray-800 transition text-white px-7 py-3 rounded-xl text-sm font-medium">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
