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

    likeBtn.innerText === "👍"
      ? (likeBtn.innerText = "✔️")
      : (likeBtn.innerText = "👍");
    likeBtn.style.backgroundColor === "deeppink"
      ? (likeBtn.style.backgroundColor = "greenyellow")
      : (likeBtn.style.backgroundColor = "deeppink");
  }
};

songList.addEventListener("click", onClickLikeBtn);
