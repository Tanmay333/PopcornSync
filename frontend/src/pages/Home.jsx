import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = "test-room";
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0B0F] overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 flex items-center min-h-screen px-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Watch movies.
            <br />
            Together. Anywhere.
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Sync video playback, chat live,
            <br />
            and feel like you’re in the same room.
          </p>
        </div>
      </div>
    </div>
  );
}
