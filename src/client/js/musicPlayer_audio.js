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

const btn_prev = document.getElementById("prevSong");
const btn_next = document.getElementById("nextSong");
const suffleBtn = document.getElementById("suffle");


let volumeValue = 0.5;
audio.volume = volumeValue;
let playlistFE = JSON.parse(musicPlayer.dataset.playlist);
console.log("init playlistFE", playlistFE);


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

  const handleSuffle = () => {
    const randomIndex = Math.floor(Math.random() * playlistFE.length);
    console.log(randomIndex);
    if (suffleBtn.style.color !== "chartreuse") {
      isSuffle = true;
      suffleBtn.style.color = "chartreuse";
      redirectOtherSong(randomIndex);
    } else {
      isSuffle = false;
      suffleBtn.style.color = "black";
    }
  };



const audioFinished = async () => {
  const { id } = musicPlayer.dataset;
  handleViews(id);
  // await fetch(`/api/music/${id}/audioFinished`, {
  //   method: "POST",
  // });
};

const handleNextBtnClick = (e) => {
    console.log("next");
    const { id } = musicPlayer.dataset;
    const currIndex = playlistFE.findIndex((v) => v == id);
    const nextIndex =
      currIndex + 1 >= playlistFE.length
        ? currIndex + 1 - playlistFE.length
        : currIndex + 1;
    if (nextIndex !== undefined) {
      redirectOtherSong(nextIndex);
    }
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
repeatBtn.addEventListener("click", handleOneSongRepeat);
suffleBtn.addEventListener("click", handleSuffle);