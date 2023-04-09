const audio = document.querySelector("audio");
const musicPlayer = document.getElementById("musicPlayer");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

audio.volume = 0.5;

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
    volumeRange = 0.5;
  } else {
    audio.muted = true;
    volumeRange = 0;
  }
  muteBtn.innerText = audio.muted ? "Unmuted" : "Muted";
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  audio.volume = value;
};

audio.addEventListener("play", handleViews);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("change", handleVolumeChange);
