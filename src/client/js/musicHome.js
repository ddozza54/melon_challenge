import { async } from "regenerator-runtime";

const songList = document.querySelector(".songList");

const onClickLikeBtn = async (e) => {
  if (e.target.className === "likeBtn") {
    const likeBtn = e.target;
    const songId = likeBtn.id.replace("likeBtn_", "");
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
  }
};

songList.addEventListener("click", onClickLikeBtn);
