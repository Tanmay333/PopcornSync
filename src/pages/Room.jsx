import React, { useState } from "react";

const Room = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const extractVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractVideoId(youtubeUrl);
    if (id) {
      setVideoId(id);
    } else {
      alert("Please enter a valid YouTube URL");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 PopcornSync Room</h1>

      {/* Admin Input */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 max-w-xl">
        <label className="block text-sm text-gray-300">
          Paste YouTube Link:
        </label>
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=abc123"
          className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-500 px-6 py-2 rounded font-semibold"
        >
          ▶️ Play Video
        </button>
      </form>

      {/* YouTube Player */}
      {videoId && (
        <div className="aspect-video max-w-4xl mx-auto shadow-xl rounded overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3`}
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Room;
