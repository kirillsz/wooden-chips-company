let tabletBP = 769;
const videoContainer = document.getElementById("entry__video");

const mQuery = window.matchMedia(`(max-width:${tabletBP}px)`);

function handleResize(e) {
  if (!e.matches) {
    videoContainer.innerHTML = `<video
    class="entry-background entry-background--video"
    autoplay
    muted
    loop
    playsinline
  >
  <source src="/videos/company-video.webm" type="video/webm">
  <source src="/videos/company-video.mp4" type="video/mp4">
  </video>`;
  }
  if (e.matches) {
    videoContainer.innerHTML = `<video
    class="entry-background entry-background--video"
    autoplay
    muted
    loop
    playsinline
  >
  <source src="/videos/company-video-tablet.webm" type="video/webm">
  <source src="/videos/company-video-tablet.mp4" type="video/mp4">
  </video>`;
  }
}
mQuery.addEventListener("change", handleResize);
// Initial check
handleResize(mQuery);
