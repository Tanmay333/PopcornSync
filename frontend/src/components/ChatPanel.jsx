import { useState } from "react";

export default function chatpanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="w-[300px] h-[500px] bg-[#111] text-white rounded-xl flex flex-col">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-[#1f1f1f] px-3 py-2 rounded-lg text-sm"
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 bg-[#222] px-3 py-2 rounded-lg text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-[#6C63FF] px-4 py-2 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
