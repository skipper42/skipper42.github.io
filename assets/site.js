/* Google Analytics 4 (G-CM32EKQ7KM) + progressive-enhancement mobile menu toggle */
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-CM32EKQ7KM");

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;

  let openScrollY = 0;
  let openedAt = 0;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      openScrollY = window.scrollY;
      openedAt = Date.now();
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (nav.classList.contains("is-open") && !nav.contains(event.target)) {
      setOpen(false);
    }
  });

  window.addEventListener(
    "scroll",
    function () {
      if (!nav.classList.contains("is-open")) return;
      if (Date.now() - openedAt < 350) {
        openScrollY = window.scrollY;
        return;
      }
      if (Math.abs(window.scrollY - openScrollY) > 40) {
        setOpen(false);
      }
    },
    { passive: true }
  );
})();
