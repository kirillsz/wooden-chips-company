window.addEventListener("load", function () {
  const [...anchorElements] = document.querySelectorAll(".scroll-into-view");
  function scrollIntoView(e) {
    const scrollIntoElement = document.getElementById(
      `${e.target.dataset.scrolltoid}`
    );
    if (scrollIntoElement) {
      scrollIntoElement.scrollIntoView();
    }
  }
  anchorElements.forEach((element) =>
    element.addEventListener("click", (event) => scrollIntoView(event))
  );
});
