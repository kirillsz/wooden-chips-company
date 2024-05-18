let tabletBP = 769;
const videoElement = document.getElementById("entry__video");

const mQuery = window.matchMedia(`(max-width:${tabletBP}px)`);

function handleResize(e) {
  if (!e.matches) {
    videoElement.src = "videos/company-video.mp4";
  }
  if (e.matches) {
    videoElement.src = "videos/company-video-tablet.mp4";
  }
}
mQuery.addEventListener("change", handleResize);
// Initial check
handleResize(mQuery);
