const likeBtn = document.querySelector(".likeBtn");
const repeatBtn = document.getElementById("repeat");
const lyricsIcon = document.querySelector(".lyricsIcon");
const listIcon = document.querySelector(".listIcon");
const player_lyrics = document.querySelector(".player_lyrics");
const player_playlist = document.querySelector(".player_playlist");


let isSuffle = false;
let isRepeatAll = true;



const handleViews = async (id) => {
  await fetch(`/api/music/${id}/view`, { method: "POST" });
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


const handleOneSongRepeat = () => {
  if (repeatBtn.style.color === "black") {
    audio.setAttribute("loop", true);
    repeatBtn.style.color = "chartreuse";
  } else {
    audio.removeAttribute("loop");
  }
};
// const handleOneSongRepeat = () => {
//   if (repeatBtn.style.color !== "chartreuse" && isRepeatAll === false) {
//     console.log("1곡 반복 켜짐");
//     isRepeatAll = false;
//     // audio.setAttribute("loop", true);
//     repeatBtn.style.color = "chartreuse";
//   } else if (repeatBtn.style.color === "chartreuse" && isRepeatAll === false) {
//     console.log("모두 반복 켜짐");
//     isRepeatAll = true;
//     repeatBtn.innerText = "All";
//     // audio.removeAttribute("loop");
//     repeatBtn.style.color = "chartreuse";
//   } else if (repeatBtn.style.color === "chartreuse" && isRepeatAll === true) {
//     console.log("모든 반복 꺼짐 (초기 상태)");
//     isRepeatAll = false;
//     repeatBtn.innerText = "1";
//     // audio.setAttribute("loop", false);
//     repeatBtn.style.color = "black";
//   }
// };



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


const redirectOtherSong = (SongIndex) => {
  const songId = playlistFE[SongIndex];
  location.href = `/music/${songId}`;
};

const handlePrevBtnClick = (e) => {
  console.log("prev");
  const { id } = musicPlayer.dataset;
  const currIndex = playlistFE.findIndex((v) => v == id);
  const prevIndex =
    currIndex - 1 < 0 ? currIndex - 1 + playlistFE.length : currIndex - 1;
  if (currIndex !== undefined) {
    redirectOtherSong(prevIndex);
  }
};



likeBtn.addEventListener("click", handlePlaylist);

lyricsIcon.addEventListener("click", handleLyricsClick);
listIcon.addEventListener("click", handleListIconClick);
