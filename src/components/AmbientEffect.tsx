import React from "react";
import styles from "../styles/AmbientEffect.module.css";

interface AmbientEffectProps {
  color: string;
}

const AmbientEffect: React.FC<AmbientEffectProps> = ({ color }) => {
  return (
    <div
      className={styles.ambientEffect}
      style={{
        background: color,
      }}
    />
  );
};

export default AmbientEffect;
