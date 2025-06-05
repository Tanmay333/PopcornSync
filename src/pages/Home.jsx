import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const popcorn = document.createElement("div");
      popcorn.innerText = "🍿";
      popcorn.className = "popcorn";
      popcorn.style.left = `${Math.random() * 100}vw`;
      document.body.appendChild(popcorn);
      setTimeout(() => popcorn.remove(), 4000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateRoom = () => {
    if (!generatedRoomCode) {
      const code = Math.random().toString(36).substring(2, 8);
      setGeneratedRoomCode(code);
      setTimeout(() => setGeneratedRoomCode(""), 45000);
    }
  };

  const handleJoinRoom = () => {
    if (joinCodeInput.trim() !== "") {
      navigate(`/room/${joinCodeInput.trim()}`);
    }
  };

  const generatedRoomLink = `${window.location.origin}/room/${generatedRoomCode}`;

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white font-sans overflow-x-hidden"
      style={{
        backgroundImage: "url('/cinema-bg.jpg')",
      }}
    >
      <div className="bg-black/70 min-h-screen">
        {/* Sticky Navbar */}
        <nav className="sticky top-0 z-50 flex justify-between items-center p-6 bg-black/60 backdrop-blur-md border-b border-white/10 shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">🍿 PopcornSync</h1>
          <div className="space-x-3">
            <button
              onClick={handleCreateRoom}
              className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-sm font-medium"
            >
              🎬 Create Room
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium"
            >
              🚪 Join Room
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center mt-20 px-6">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-xl">
            Watch Together. Chat Together.
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            PopcornSync lets you enjoy YouTube, Netflix, or any video source
            with friends — all in sync, with chat and fun!
          </p>

          {/* Room Link Box */}
          {generatedRoomCode && (
            <div className="mt-10 flex flex-col items-center animate-fade-in">
              <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-5 w-full max-w-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">
                  🎬 Your Room is Ready!
                </h3>
                <div className="flex items-center justify-between bg-black/20 rounded-md px-4 py-2 text-sm">
                  <span className="truncate">{generatedRoomLink}</span>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(generatedRoomLink)
                    }
                    className="ml-4 bg-pink-600 hover:bg-pink-500 text-xs px-3 py-1 rounded"
                  >
                    Copy Link
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  🔒 Link expires in 45 seconds
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Movie Poster Carousel */}
        <section className="mt-20 max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-center">
            🍿 Fan Favorite Picks
          </h3>
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {[
              "inception.jpg",
              "interstellar.jpg",
              "darkknight.jpg",
              "avengers.jpg",
            ].map((poster, i) => (
              <img
                key={i}
                src={`/${poster}`}
                alt={poster.split(".")[0]}
                className="w-52 h-72 object-cover rounded-lg shadow-xl transition-transform hover:scale-105"
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-white/40 py-6 border-t border-white/10">
          Built with ❤️ for movie lovers. © 2025 PopcornSync
        </footer>

        {/* Join Room Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1c1c2b] text-white p-6 rounded-lg shadow-2xl w-[90%] max-w-md animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 text-center">
                🔑 Enter Room Code
              </h2>
              <input
                type="text"
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value)}
                placeholder="e.g., ab12cd"
                className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoinRoom}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
