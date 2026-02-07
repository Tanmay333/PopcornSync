export default function RoomHeader() {
  return (
    <div className="h-16 bg-[#12121A] flex items-center justify-between px-6 border-b border-[#1f1f2a]">
      <div>
        <p className="text-white font-medium">PopcornSync Room</p>
        <p className="text-xs text-gray-400">Inception (2010)</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#6C63FF]" />
        <div className="w-8 h-8 rounded-full bg-gray-600" />
        <div className="w-8 h-8 rounded-full bg-gray-700" />
      </div>
    </div>
  );
}
