import "../scss/styles.scss";

const bgImage = document.getElementById("backImg");
const bgUrl = [
  "https://p4.wallpaperbetter.com/wallpaper/738/71/649/flowers-mountains-distance-nature-wallpaper-preview.jpg",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb7qKe4%2FbtsaTflyXML%2FlFxtYROMWcvtlHu1y4PXpk%2Fimg.jpg",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuxHfU%2Fbtsaw6cQTI5%2FBIP2swcZjkXZTSrT54aXw1%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbzSyKV%2FbtsaTemDtCj%2FT83YZ2WfZHfiyNAPwMXNYK%2Fimg.png",
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FP7KUh%2Fbtsar5k3t0h%2FPWKlJ1qYzoDDMAJdWSWUJK%2Fimg.png",
  "https://tour.yd21.go.kr/_prog/download/index.php?func_gbn_cd=tourist&site_dvs_cd=tour&atch=atch_img&mng_no=28",
];

function chanegeBgImg() {
  const randomNum = Math.floor(Math.random() * bgUrl.length);
  const imageUrl = bgUrl[randomNum];
  bgImage.src = `${imageUrl}`;
}

setInterval(chanegeBgImg, 10000);
