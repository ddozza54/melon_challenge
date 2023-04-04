const audio = document.querySelector("audio");
const musicPlayer = document.getElementById("musicPlayer");

const handlePlay = async () => {
  const { id } = musicPlayer.dataset;
  await fetch(`/api/music/${id}/view`, { method: "POST" });
};

audio.addEventListener("play", handlePlay);
