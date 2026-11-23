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

  // Structured GA4 resource click tracking (top useful links & product sections)
  const main = document.querySelector("main");
  if (main) {
    main.addEventListener("click", function (event) {
      const link = event.target.closest("a[href]");
      if (!link) return;
      const rawHref = (link.getAttribute("href") || "").trim();
      if (!rawHref || rawHref.startsWith("#")) return;

      const section = link.closest("section");
      let sectionName = "General";
      if (section) {
        const h2 = section.querySelector("h2");
        if (h2) {
          sectionName = h2.textContent.trim();
        } else if (section.id) {
          sectionName = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        }
      }

      let categoryName = "";
      const listEl = link.closest("section > ul");
      if (listEl) {
        let prev = listEl.previousElementSibling;
        while (prev && prev.tagName !== "H2") {
          if (prev.tagName === "H3") {
            categoryName = prev.textContent.trim();
            break;
          }
          prev = prev.previousElementSibling;
        }
      }

      const title = (link.textContent || "").replace(/\s+/g, " ").trim() || rawHref;
      const url = link.href || rawHref;

      gtag("event", "resource_click", {
        resource_section: sectionName.slice(0, 100),
        resource_category: (categoryName || "General").slice(0, 100),
        resource_title: title.slice(0, 100),
        resource_url: url.slice(0, 100),
      });
    });
  }
})();
