import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import styles from "./styles/MainPage.module.css";

const SAMPLE_VIDEO = "/sample.mp4";

const MainPage: React.FC = () => {
  const [videoPath, setVideoPath] = useState<string | null>(null);

  const handleLoadNewVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPath(videoUrl);
    }
  };

  const handleChooseAnother = () => {
    if (videoPath?.startsWith("blob:")) URL.revokeObjectURL(videoPath);
    setVideoPath(null);
  };

  return (
    <div className={styles.mainPage}>
      {!videoPath && (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => setVideoPath(SAMPLE_VIDEO)}>
            Play Sample Video
          </button>

          <button
            className={styles.button}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Upload Video
          </button>

          <input
            id="fileInput"
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleLoadNewVideo}
          />
        </div>
      )}

      {videoPath && (
        <>
          <button className={styles.backButton} onClick={handleChooseAnother}>
            ← Choose another video
          </button>
          <VideoPlayer videoPath={videoPath} loop={videoPath === SAMPLE_VIDEO} />
        </>
      )}
    </div>
  );
};

export default MainPage;
