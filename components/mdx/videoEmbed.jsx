export default function VideoEmbed({ className = "", ...props }) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      className={`my-6 w-full rounded-lg ${className}`}
      {...props}
    />
  );
}
