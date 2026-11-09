import React, { useEffect, useRef } from "react";
import styles from "../styles/AmbientEffect.module.css";

const SAMPLE_WIDTH = 64;
const SAMPLE_HEIGHT = 36;
const FRAME_INTERVAL_MS = 33;
const SMOOTHING_MS = 350;

interface AmbientEffectProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

// Paints a tiny copy of the current frame behind the player. CSS scales and
// blurs it, so every part of the glow takes its color from the matching part
// of the video.
const AmbientEffect: React.FC<AmbientEffectProps> = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const ctx = canvasRef.current?.getContext("2d", { alpha: false });
    if (!video || !ctx) return;

    ctx.imageSmoothingQuality = "high";

    let frameId: number;
    let lastDraw = 0;

    const draw = (now: number) => {
      frameId = requestAnimationFrame(draw);

      const elapsed = now - lastDraw;
      if (elapsed < FRAME_INTERVAL_MS || video.readyState < video.HAVE_CURRENT_DATA) return;
      lastDraw = now;

      // Partially painting over the previous frame fades colors between frames.
      ctx.globalAlpha = 1 - Math.exp(-elapsed / SMOOTHING_MS);
      ctx.drawImage(video, 0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
    };

    frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.ambientEffect}
      width={SAMPLE_WIDTH}
      height={SAMPLE_HEIGHT}
      aria-hidden="true"
    />
  );
};

export default AmbientEffect;
