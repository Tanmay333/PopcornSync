export default function ChatPanel() {
  return (
    <div className="w-[360px] bg-[#12121A] border-l border-[#1f1f2a] flex flex-col">
      <div className="p-4 border-b border-[#1f1f2a] text-white font-medium">
        Chat
      </div>

      <div className="flex-1 p-4 space-y-2 text-sm text-gray-400">
        <p>Aman joined the room</p>
        <div className="bg-[#1E1E2A] text-white p-2 rounded-xl w-fit">
          Bhai scene 🔥
        </div>
      </div>

      <div className="p-3 border-t border-[#1f1f2a]">
        <input
          placeholder="Type your message..."
          className="w-full bg-[#1A1A24] text-white px-4 py-2 rounded-xl outline-none text-sm"
        />
      </div>
    </div>
  );
}
