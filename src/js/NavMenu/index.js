window.addEventListener("DOMContentLoaded", function () {
  const [...internalAnchors] =
    document.getElementsByClassName("anchor-internal");
  const navMenu = document.querySelector(".qw-nav");
  const navMenuList = document.querySelector(".qw-nav__list");
  const navMenuToggleButton = document.querySelector(".qw-nav__toggle");

  function handleMenuShow() {
    navMenu.dataset.hidden = "false";
    navMenuList.classList.remove("hide");
  }
  function handleMenuHide() {
    navMenu.dataset.hidden = "true";
    navMenuList.classList.add("hide");
  }
  function handleMenuToggle() {
    if (navMenuList.classList.contains("hide")) {
      handleMenuShow();
    } else {
      handleMenuHide();
    }
  }
  internalAnchors.forEach((anchor) =>
    anchor.addEventListener("click", handleMenuHide)
  );
  navMenuToggleButton.addEventListener("click", handleMenuToggle);
  document
    .querySelector(".qw-content")
    .addEventListener("pointerdown", handleMenuHide);
});
