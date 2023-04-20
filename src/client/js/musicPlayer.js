import { async } from "regenerator-runtime";

const audio = document.querySelector("audio");
const playerPage = document.getElementById("playerPage");
const musicPlayer = document.getElementById("musicPlayer");
const playBtn = document.getElementById("play");
const playBtnIcon = document.getElementById("playBtnIcon");
const muteBtn = document.getElementById("muteBtn");
const muteBtnIcon = document.getElementById("muteBtnIcon");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const likeBtn = document.querySelector(".likeBtn");
const editBtn = document.getElementById("editBtn");
const repeatBtn = document.getElementById("repeat");

let volumeValue = 0.5;
audio.volume = volumeValue;

const handleViews = async () => {
  const { id } = musicPlayer.dataset;
  await fetch(`/api/music/${id}/view`, { method: "POST" });
};

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

const handlePlaylist = async () => {
  const songId = musicPlayer.dataset.id;
  await fetch(`/api/music/${songId}/playlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songId }),
  });

  if (likeBtn.innerText === "👍") {
    likeBtn.innerText = "✔️";
    likeBtn.classList.add("inPlaylistBtn");
    likeBtn.classList.remove("notInPlaylistBtn");
  } else {
    likeBtn.innerText = "👍";
    likeBtn.classList.add("notInPlaylistBtn");
    likeBtn.classList.remove("inPlaylistBtn");
  }
};

const handleOneSongRepeat = () => {
  if (repeatBtn.style.color === "black") {
    audio.setAttribute("loop", true);
    repeatBtn.style.color = "chartreuse";
  } else {
    audio.removeAttribute("loop");
    repeatBtn.style.color = "black";
  }
};

const sendCurrentTime = async () => {
  const songId = musicPlayer.dataset.id;
  let currentTime = audio.currentTime;
  let currentVolume = audio.volume;
  await fetch(`/api/music/${songId}/nowPlaying`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentTime, currentVolume }),
  });
};

audio.addEventListener("ended", handleViews);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("change", handleVolumeChange);
audio.addEventListener("loadedmetadata", handleLoadedMetadata);
audio.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("change", handleTimeLine);
likeBtn.addEventListener("click", handlePlaylist);
repeatBtn.addEventListener("click", handleOneSongRepeat);

window.addEventListener("pagehide", sendCurrentTime);
