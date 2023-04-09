const audio = document.querySelector("audio");
const musicPlayer = document.getElementById("musicPlayer");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");

let volumeValue = 0.5;
audio.volume = volumeValue;

const handleViews = async () => {
  const { id } = musicPlayer.dataset;
  await fetch(`/api/music/${id}/view`, { method: "POST" });
};

const handlePlayClick = (e) => {
  audio.paused ? audio.play() : audio.pause();
  playBtn.innerText = audio.paused ? "Play" : "Pause";
};

const handleMuteClick = () => {
  if (audio.muted) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
  muteBtn.innerText = audio.muted ? "Unmuted" : "Muted";
  volumeRange.value = audio.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (audio.muted) {
    audio.muted = false;
    muteBtn.innerText = "Muted";
  }
  volumeValue = value;
  audio.volume = value;
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(audio.duration));
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(audio.currentTime));
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

audio.addEventListener("play", handleViews);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("change", handleVolumeChange);
audio.addEventListener("loadedmetadata", handleLoadedMetadata);
audio.addEventListener("timeupdate", handleTimeUpdate);
