document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbarNav");
  if (!navbar) {
    return; // Exit if the navbar isn't found
  }

  // Create a single Bootstrap Collapse instance to control the navbar efficiently.
  const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
  const navLinks = navbar.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // Handle smooth scrolling for in-page anchor links.
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }

      // If the mobile navbar is open, hide it after a link is clicked.
      if (navbar.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // Also hide the mobile navbar if the user starts scrolling.
  document.addEventListener("scroll", function () {
    if (navbar.classList.contains("show")) {
      bsCollapse.hide();
    }
  });
});
