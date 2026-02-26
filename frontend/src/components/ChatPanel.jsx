import { useState, useEffect } from "react";
import socket from "../socket";
import { useParams } from "react-router-dom";

export default function ChatPanel() {
  const { roomId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, self: true }]);

    socket.emit("send-message", {
      roomId,
      message: input,
    });

    setInput("");
  };

  useEffect(() => {
    const handleReceive = ({ message }) => {
      setMessages((prev) => [...prev, { text: message, self: false }]);
    };

    socket.on("receive-message", handleReceive);

    return () => {
      socket.off("receive-message", handleReceive);
    };
  }, []);

  return (
    <div className="w-[320px] h-full bg-[#111] rounded-2xl flex flex-col border border-white/10">
      <div className="px-4 py-3 border-b border-white/10 text-white font-semibold">
        Live Chat
      </div>

      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl ${
                msg.self
                  ? "bg-[#6C63FF] text-white"
                  : "bg-[#1C1C22] text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type a message..."
          className="
            flex-1 px-4 py-3
            rounded-xl
            bg-[#1A1A1F]
            text-white text-sm
            placeholder-gray-400
            outline-none
            focus:ring-2 focus:ring-[#6C63FF]/40
          "
        />

        <button
          onClick={handleSend}
          className="
            bg-[#6C63FF]
            px-4 py-3
            rounded-xl
            text-white text-sm
            hover:bg-[#7A73FF]
            transition
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}
