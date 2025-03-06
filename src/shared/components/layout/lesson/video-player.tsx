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
      <source
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        type="video/mp4"
      />
      Ваш браузер не поддерживает видео тег.
    </video>
  );
};

export default VideoPlayer;
