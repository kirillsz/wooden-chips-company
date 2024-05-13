// eslint-disable-next-line import/no-named-as-default
import Splide from "@splidejs/splide";
window.addEventListener("DOMContentLoaded", function () {
  var elms = document.getElementsByClassName("splide");

  for (var i = 0; i < elms.length; i++) {
    new Splide(elms[i], {
      type: "loop",
      pagination: false,
      mediaQuery: "min",
      breakpoints: {
        520: {
          destroy: true,
        },
      },
    }).mount();
  }
});
