import { lessonsService } from "@/shared/services/lesson.service";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../error";
import Loader from "../../ui/loader";
import { useEffect } from "react";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["lesson-video", videoId],
    queryFn: () => lessonsService.getVideoUrl(videoId),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (error || !data) return <ErrorComponent error={error} />;

  return (
    <video
      className="w-[94%] h-[260px] bg-primary shadow-card-sm-light rounded-[12px] mx-auto object-cover"
      controls
      playsInline
      src={data.videoUrl}
    ></video>
  );
};

export default VideoPlayer;
