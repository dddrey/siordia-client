interface VideoPlayerProps {
  src: string;
}


const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <video
      className="w-[94%] h-[260px] bg-primary shadow-card-sm-light rounded-[12px] mx-auto object-cover"
      controls
      playsInline
    >
      <source src={src} type="video/mp4" />
      Ваш браузер не поддерживает видео тег.
    </video>
  );
};

export default VideoPlayer;
