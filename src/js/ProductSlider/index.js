// eslint-disable-next-line import/no-named-as-default
import Splide from "@splidejs/splide";
window.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    pagination: false,
    mediaQuery: "min",
    breakpoints: {
      520: {
        destroy: true,
      },
    },
  }).mount();
});
