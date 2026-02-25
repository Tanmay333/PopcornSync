import { useState } from "react";

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="w-[320px] h-full bg-[#111] rounded-2xl flex flex-col border border-white/10">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 text-white font-semibold">
        Live Chat
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto text-sm text-gray-200">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Start the conversation 🍿</p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className="max-w-[80%] bg-[#1C1C22] px-3 py-2 rounded-xl"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Input */}
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
