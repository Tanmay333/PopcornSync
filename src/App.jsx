import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-room" element={<CreateRoom />} />
<<<<<<< HEAD
      <Route path="/join" element={<JoinRoom />} />
=======
>>>>>>> 124c992 (redesign UI and update app flow)
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
