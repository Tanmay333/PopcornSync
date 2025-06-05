import { useState } from "react";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = () => {
    const code = Math.random().toString(36).substring(2, 8);
    setRoomCode(code);
  };

  const roomLink = `${window.location.origin}/room/${roomCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">🍿 PopcornSync</h1>
        <button
          onClick={handleCreateRoom}
          className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-sm font-medium"
        >
          Create Room
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Watch Together. Chat Together.
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          PopcornSync lets you enjoy YouTube, Netflix, or any video source with
          friends — all in sync, with chat and fun!
        </p>
        <button
          onClick={handleCreateRoom}
          className="mt-8 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full text-lg font-semibold shadow-md"
        >
          🎉 Join a Room
        </button>

        {/* Room Link Box */}
        {roomCode && (
          <div className="mt-10 flex flex-col items-center animate-fade-in">
            <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-5 w-full max-w-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                🎬 Your Room is Ready!
              </h3>
              <div className="flex items-center justify-between bg-black/20 rounded-md px-4 py-2 text-sm">
                <span className="truncate">{roomLink}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(roomLink)}
                  className="ml-4 bg-pink-600 hover:bg-pink-500 text-xs px-3 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mt-24 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-center">🔥 Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="🎥 Synchronized Video"
            desc="Everyone stays in sync, no matter who presses play or pause."
          />
          <FeatureCard
            title="💬 Built-in Chat"
            desc="React and chat live with your friends while watching together."
          />
          <FeatureCard
            title="🔗 Easy Sharing"
            desc="Send your room link to invite friends instantly!"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-white/40 py-6 border-t border-white/10">
        Built with ❤️ for movie lovers. © 2025 PopcornSync
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, desc }) => (
  <div className="bg-white/10 p-6 rounded-lg shadow-md">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{desc}</p>
  </div>
);

export default Home;
