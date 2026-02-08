import { useState } from "react";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {
  const [page, setPage] = useState("home");

  if (page === "room") {
    return <Room />;
  }

  return <Home onCreate={() => setPage("room")} />;
}

export default App;
