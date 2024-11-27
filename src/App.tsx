import React, { useState, useRef } from "react";
import VideoPlayer from "./components/VideoPlayer";
import styles from "./styles/MainPage.module.css";

const MainPage: React.FC = () => {
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);


  const handleLoadSampleVideo = () => {
    setVideoPath("./src/assets/sample.mp4");
  };


  const handleLoadNewVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPath(videoUrl);
    }
  };

  return (
    <div className={styles.mainPage}>

      {!videoPath && (
        <div className={styles.buttonContainer}>
          {/* Hello World<button onClick={handleLoadSampleVideo} className={styles.button}>
            Load Sample Video
          </button>*/}
          

          <button
            className={styles.button}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Load New Video
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
        <div className={styles.videoPlayer}>
          <VideoPlayer videoPath={videoPath} videoRef={videoRef} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
