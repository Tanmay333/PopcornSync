import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const theaterOptions = [
  { label: "🍿 Movie Theater", value: "movie" },
  { label: "📺 YouTube Theater", value: "youtube" },
  { label: "🤝 Chill Chat Room", value: "chat" },
];

function CreateRoom() {
<<<<<<< HEAD
  const [theaterType, setTheaterType] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!theaterType) {
      alert("Please select a theater type.");
      return;
    }

    const code = uuidv4().slice(0, 6);
    setRoomCode(code);

    // Navigate to the room page directly
    navigate(`/room/${code}`, {
      state: { theaterType },
    });
  };

  const handleCopy = () => {
    const link = `${window.location.origin}/room/${roomCode}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        🎥 Create Your Theater
      </h1>

      {!roomCode ? (
        <div className="flex flex-col gap-4 items-center w-full max-w-sm">
          <p className="text-lg text-center text-gray-300">
            Choose your theater type:
          </p>
          <div className="flex flex-col gap-3 w-full">
            {theaterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheaterType(option.value)}
                className={`px-4 py-3 rounded-xl font-semibold transition ${
                  theaterType === option.value
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleCreateRoom}
            className="bg-green-500 text-black px-6 py-2 rounded-xl font-semibold hover:bg-green-400 transition mt-4"
          >
            Create Room 🚀
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
            className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-400 transition"
          >
            Copy Invite Link 📋
          </button>
        </div>
      )}
=======
  const navigate = useNavigate();

  useEffect(() => {
    const roomCode = uuidv4().split("-")[0];
    navigate(`/room/${roomCode}`);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#1a1a1a] text-white">
      <div className="text-xl font-semibold animate-pulse">
        Creating your room... 🎬🍿
      </div>
>>>>>>> 124c992 (redesign UI and update app flow)
    </div>
  );
}

export default CreateRoom;
