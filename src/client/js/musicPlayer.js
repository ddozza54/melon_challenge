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
const lyricsIcon = document.querySelector(".lyricsIcon");
const listIcon = document.querySelector(".listIcon");
const player_lyrics = document.querySelector(".player_lyrics");
const player_playlist = document.querySelector(".player_playlist");
const songlist_ul = document.querySelector(".songlist_ul");
const btn_prev = document.getElementById("prevSong");
const btn_next = document.getElementById("nextSong");
const songList = document.querySelector(".songList");
const songList_songs = songList.getElementsByClassName("song");
const a_url = songList.getElementsByClassName("a_url");
const imgdiv = document.querySelector(".imgdiv");
const mainImg = imgdiv.querySelector("img");
const mainImg_url = mainImg.getAttribute("src").slice(9).toString();

let playlist_client = [];
let playlistForIndex = [];

let volumeValue = 0.5;
audio.volume = volumeValue;

const getPlaylist = () => {
  for (let i = 0; i < songList_songs.length; i++) {
    const url = a_url[i].getAttribute("href");
    const src = songList_songs[i].getAttribute("src");
    // playlist_client.push(url.toString());
    // playlistForIndex.push(src.slice(9));
  }
};

getPlaylist();
console.log(playlist_client);

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
  if (!playlist_client.includes(songId)) {
    playlist_client.push(songId);
    console.log("add", playlist_client);
  } else {
    playlist_client.filter((v) => v !== songId);
    console.log("remove", playlist_client);
  }
};

// const paintPlaylist = (songId) => {
//   const li = document.createElement("li");
//   li.classList.add("song");
//   const img = document.createElement("img");
//   img.setAttribute("src", `'/'+song.imgpath`);
//   const titleDiv = document.createElement("div");
//   titleDiv.classList.add("title");
//   const songTitle = document.createElement("h4");
//   const songArtist = document.createElement("span");
//   const playAnchor = document.createElement("a");
//   playAnchor.setAttribute("href", `/music/${songId}`);
//   const icon = document.createElement("i");
//   icon.classList.add("fas");
//   icon.classList.add("fa-play-circle");
//   playAnchor.appendChild(icon);
//   titleDiv.appendChild(songTitle);
//   titleDiv.appendChild(songArtist);
//   li.appendChild(img);
//   li.appendChild(titleDiv);
//   li.appendChild(playAnchor);
//   songlist_ul.appendChild(li);
// };

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
  let currnetIndex = 0;
  console.log(playlistForIndex[3] == mainImg_url);
  for (let i = 0; i < playlistForIndex.length; i++) {
    if (playlistForIndex[i].slice(7) == includes(mainImg_url)) {
      currnetIndex = i;
      let preIndex = i - 1 < 0 ? i - 1 + player_playlist.length : i - 1;
      console.log(currnetIndex);
    }
  }
};

const handleNextBtnClick = (e) => {};

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

// window.addEventListener("pagehide", sendCurrentTime);
