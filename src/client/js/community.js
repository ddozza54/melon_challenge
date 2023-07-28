import { async } from "regenerator-runtime";

const comments = document.getElementById("comments");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  await fetch("/api/community/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  window.location.reload();
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}
