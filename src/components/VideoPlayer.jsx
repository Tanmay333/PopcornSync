import sampleVideo from "../assets/sample.mp4";

export default function VideoPlayer() {
  return (
    <div className="w-[920px] max-w-full">
      <video
        src={sampleVideo}
        controls
        className="w-full rounded-2xl bg-black"
      />
    </div>
  );
}
