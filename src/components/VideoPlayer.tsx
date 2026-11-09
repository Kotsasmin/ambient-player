import React, { useRef, useState } from "react";
import styles from "../styles/VideoPlayer.module.css";
import AmbientEffect from "./AmbientEffect";

interface VideoPlayerProps {
  videoPath: string;
  loop: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, loop }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (videoWidth && videoHeight) setAspectRatio(videoWidth / videoHeight);
  };

  return (
    <div
      className={styles.videoPlayer}
      style={{ "--video-aspect": aspectRatio } as React.CSSProperties}
    >
      <AmbientEffect videoRef={videoRef} />
      <video
        ref={videoRef}
        src={videoPath}
        controls
        className={styles.videoElement}
        autoPlay
        loop={loop}
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export default VideoPlayer;
