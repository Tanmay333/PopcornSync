import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function CreateRoom() {
  const navigate = useNavigate();

  useEffect(() => {
    const roomId = uuidv4().split("-")[0];
    navigate(`/room/${roomId}`);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#1a1a1a] text-white">
      <div className="text-xl font-semibold animate-pulse">
        Creating your room... 🎬🍿
      </div>
    </div>
  );
}

export default CreateRoom;
