import { async } from "regenerator-runtime";

const songList = document.querySelector(".songList");

const onClickLikeBtn = async (e) => {
  if (e.target.className === "likeBtn") {
    const songId = e.target.id.replace("likeBtn_", "");
    await fetch(`/api/music/${songId}/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songId }),
    });
    e.target.style.backgroundColor = "deeppink";
  }
};

songList.addEventListener("click", onClickLikeBtn);
