import { async } from "regenerator-runtime";

const audio = document.getElementById("mainAudio");
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
const repeatBtn = document.getElementById("repeat");
const lyricsIcon = document.querySelector(".lyricsIcon");
const listIcon = document.querySelector(".listIcon");
const player_lyrics = document.querySelector(".player_lyrics");
const player_playlist = document.querySelector(".player_playlist");
const btn_prev = document.getElementById("prevSong");
const btn_next = document.getElementById("nextSong");
const removeBtn = document.querySelector(".removeBtn_playlist");

let volumeValue = 0.5;
audio.volume = volumeValue;

let playlistFE = JSON.parse(musicPlayer.dataset.playlist);
console.log("init playlistFE", playlistFE);

const handleViews = async (id) => {
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

  console.log(playlistFE.includes(songId));
  if (!playlistFE.includes(songId)) {
    playlistFE.push(songId);
  } else {
    playlistFE = playlistFE.filter((v) => v !== songId);
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

// const sendCurrentTime = async () => {
//   const songId = musicPlayer.dataset.id;
//   let currentTime = audio.currentTime;
//   let currentVolume = audio.volume;
//   await fetch(`/api/music/${songId}/nowPlaying`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ currentTime, currentVolume }),
//   });
// };

const handleLyricsClick = () => {
  player_lyrics.classList.remove("hidden");
  player_playlist.classList.add("hidden");
};

const handleListIconClick = () => {
  player_playlist.classList.remove("hidden");
  player_lyrics.classList.add("hidden");
};

const audioFinished = async () => {
  const { id } = musicPlayer.dataset;
  handleViews(id);
  // await fetch(`/api/music/${id}/audioFinished`, {
  //   method: "POST",
  // });
};

const handlePrevBtnClick = (e) => {
  console.log("prev");
  const { id } = musicPlayer.dataset;
  const currIndex = playlistFE.findIndex((v) => v == id);
  const prevIndex =
    currIndex - 1 < 0 ? currIndex - 1 + playlistFE.length : currIndex - 1;
  const prevSongId = playlistFE[prevIndex];
  console.log(prevSongId);
  location.href = `/music/${prevSongId}`;
};

const handleNextBtnClick = (e) => {
  console.log("next");
  const { id } = musicPlayer.dataset;
  const currIndex = playlistFE.findIndex((v) => v == id);
  const nextIndex =
    currIndex + 1 >= playlistFE.length
      ? currIndex + 1 - playlistFE.length
      : currIndex + 1;
  const nextSongId = playlistFE[nextIndex];
  console.log(nextSongId);
  location.href = `/music/${nextSongId}`;
};

audio.addEventListener("ended", audioFinished);
playBtn.addEventListener("click", handlePlayClick);
btn_prev.addEventListener("click", handlePrevBtnClick);
btn_next.addEventListener("click", handleNextBtnClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("change", handleVolumeChange);
audio.addEventListener("loadedmetadata", handleLoadedMetadata);
audio.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("change", handleTimeLine);
likeBtn.addEventListener("click", handlePlaylist);
repeatBtn.addEventListener("click", handleOneSongRepeat);
lyricsIcon.addEventListener("click", handleLyricsClick);
listIcon.addEventListener("click", handleListIconClick);
