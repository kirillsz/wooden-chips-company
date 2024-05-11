window.addEventListener("load", function () {
  const loader = document.querySelector(".qw-loader");
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});
