const audio = document.querySelector("audio");
const musicPlayer = document.getElementById("musicPlayer");
const playBtn = document.getElementById("play");
const playBtnIcon = document.getElementById("playBtnIcon");
const muteBtn = document.getElementById("muteBtn");
const muteBtnIcon = document.getElementById("muteBtnIcon");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const likeBtn = document.getElementById("likeBtn");
const editBtn = document.getElementById("#editBtn");

let volumeValue = 0.5;
audio.volume = volumeValue;

const handleViews = async () => {
  const { id } = musicPlayer.dataset;
  await fetch(`/api/music/${id}/view`, { method: "POST" });
};

// //플레이리스트에 등록
// export const handlePlaylist = async (req, res) => {
//   const userId = req.session._id;
//   await fetch(`/api/user/${userId}/playlist`, { method: "POST" });
// };

const handlePlayClick = (e) => {
  audio.paused ? audio.play() : audio.pause();
  if (audio.paused) {
    playBtn;
    playBtnIcon.classList.remove("fa-pause-circle");
    playBtnIcon.classList.add("fa-play-circle");
  } else {
    playBtnIcon.classList.remove("fa-play-circle");
    playBtnIcon.classList.add("fa-pause-circle");
  }
};

const handleMuteClick = () => {
  if (audio.muted) {
    audio.muted = false;
    muteBtnIcon.classList.remove("fa-volume-mute");
    muteBtnIcon.classList.add("fa-volume-up");
  } else {
    audio.muted = true;
    muteBtnIcon.classList.remove("fa-volume-up");
    muteBtnIcon.classList.add("fa-volume-mute");
  }
  volumeRange.value = audio.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (audio.muted) {
    audio.muted = false;
  }
  volumeValue = value;
  audio.volume = value;
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(audio.duration));
  timeline.max = Math.floor(audio.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(audio.currentTime));
  timeline.value = Math.floor(audio.currentTime);
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const handleTimeLine = (e) => {
  const {
    target: { value },
  } = e;
  audio.currentTime = value;
};

audio.addEventListener("ended", handleViews);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("change", handleVolumeChange);
audio.addEventListener("loadedmetadata", handleLoadedMetadata);
audio.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("change", handleTimeLine);
likeBtn.addEventListener("click", handlePlaylist);
