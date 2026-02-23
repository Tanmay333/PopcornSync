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

        <div className="flex justify-end">
          <div className="relative w-full max-w-sm rounded-2xl p-10 bg-black/40 backdrop-blur-lg"></div>
          <div className="relative w-full max-w-sm rounded-2xl p-10 bg-black/40 backdrop-blur-lg"></div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white/15 text-9xl rotate-[-12deg] select-none tracking-widest- translate-y-8">
              🎬 ▶️ 🎞️ 🍿
            </div>
          </div>

          <div className="flex flex-col gap-50"></div>
          <button className="w-full px-12  py-6 rounded-xl border border-white/40 text-white text-base tracking-wide whitespace-nowrap">
            Create a Room
          </button>
          <div className="flex justify-end"></div>
          <div className="relative w-full max-w-sm rounded-2xl p-6  backdrop-blur-lg"></div>

          <div className="flex flex-col gap-10"></div>
          <button className="w-full px-12 py-6 rounded-xl border border-white/40 text-white text-base tracking-wide whitespace-nowrap">
            Join with Code
          </button>
        </div>
      </div>
    </div>
  );
}
