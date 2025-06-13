import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import styles from "../styles/VideoPlayer.module.css";
import AmbientEffect from "./AmbientEffect";

interface VideoPlayerProps {
  videoPath: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, videoRef }) => {
  const [currentColor, setCurrentColor] = useState<string>("rgba(0,0,0,0)");
  const [targetColor, setTargetColor] = useState<string>("rgba(0,0,0,0)");

  const extractDominantColor = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (videoRef.current && ctx) {
      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(videoRef.current, 0, 0, 1, 1);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      const newColor = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0.8)`;
      setTargetColor(newColor);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      extractDominantColor();
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      const currentChroma = chroma(currentColor);
      const targetChroma = chroma(targetColor);
      const targetColorAdjusted = targetChroma
        .set("hsl.s", 1)
        .set("hsl.l", 0.6);

      const nextColor = chroma
        .mix(currentChroma, targetColorAdjusted, 0.1, "rgb")
        .css();

      setCurrentColor(nextColor);

      if (chroma.distance(currentChroma, targetColorAdjusted) < 0.2) {
        clearInterval(transitionInterval);
      }
    }, 10);

    return () => clearInterval(transitionInterval);
  }, [targetColor]);

  return (
    <div className={styles.videoPlayer}>
      <AmbientEffect color={currentColor} />
      <video
        ref={videoRef}
        src={videoPath}
        controls
        className={styles.videoElement}
        autoPlay
      />
    </div>
  );
};

export default VideoPlayer;
