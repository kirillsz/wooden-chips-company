function sliderHandler() {
  const viewportWidth = 720;
  const [...recSlides] = document.querySelectorAll(`.recommendation__card`);
  const recDots = document.querySelectorAll(".slider__wrapper .slider__dot");
  let [currentselectedDot] = recDots;
  let isObserving = false;
  const observerOptions = {
    threshold: 0.85,
  };
  /* Functions */
  const toggleActiveDot = (index) => {
    let toggledDot = [...recDots].find((dot) => dot.dataset.index === index);

    if (toggledDot !== currentselectedDot) {
      currentselectedDot.classList.remove("active");
      currentselectedDot = toggledDot;
      currentselectedDot.classList.add("active");
    } else {
      currentselectedDot.classList.add("active");
    }
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        toggleActiveDot(entry.target.dataset.index);
      }
    });
  };
  function observerConnect(object) {
    object.map((slide) => observer.observe(slide));
    isObserving = true;
  }

  function observerDisconnect() {
    observer.disconnect();
    isObserving = false;
  }
  /* Inits */
  const observer = new IntersectionObserver(callback, observerOptions);

  const mQuery = window.matchMedia(`(max-width:${viewportWidth}px)`);

  function handleResize(e) {
    if (!e.matches) {
      observerDisconnect();
    }
    if (e.matches && !isObserving) {
      observerConnect(recSlides);
    }
  }
  mQuery.addEventListener("change", handleResize);
  // Initial check
  handleResize(mQuery);
}
window.addEventListener("DOMContentLoaded", sliderHandler);
