const miniPlayer = document.getElementById("miniPlayer");
const miniPlayer_data = document.getElementById("miniPlayer_data");
const audio = document.querySelector("audio");
const timeRange = document.querySelector(".miniPlayer_input");

const handleTimeChange = () => {
  const {
    target: { value },
  } = e;
  audio.currentTime = value;
};

const handleInit = () => {
  console.log("handleInit");
  const { currentVolume } = miniPlayer.dataset;
  audio.volume = currentVolume;
};

timeRange.addEventListener("change", handleTimeChange);
// audio.addEventListener("play", handlePlaying);

// audio.addEventListener("loadedmetadata", handleLoadedMetadata);
// 오디오 로드 후 발생 이벤트. 

window.addEventListener("load", handleInit);
