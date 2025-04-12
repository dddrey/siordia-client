import { useEffect, useRef, useState } from "react";
import { lessonsService } from "@/shared/services/lesson.service";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/shared/components/ui/loader";
import ErrorComponent from "@/shared/components/error";

interface VideoPlayerProps {
  videoId?: string;
  file?: File;
}

const VideoPlayer = ({ videoId, file }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["lesson-video", videoId],
    queryFn: () => lessonsService.getVideoUrl(videoId!),
    enabled: !!videoId,
  });

  useEffect(() => {
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setVideoSrc(localUrl);
      return () => URL.revokeObjectURL(localUrl);
    }
  }, [file]);

  useEffect(() => {
    if (data?.videoUrl) {
      setVideoSrc(data.videoUrl);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full h-[260px] bg-primary shadow-card-sm-light rounded-[12px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );

  if ((error && videoId) || !videoSrc) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="relative w-full h-[260px] rounded-[12px] overflow-hidden shadow-card-sm-light bg-black">
      <video
        ref={videoRef}
        src={videoSrc ?? ""}
        className="w-full h-full object-cover"
        controls
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
