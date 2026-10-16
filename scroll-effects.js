/* Raya Gula gentle scroll reveal — preserves existing layout and respects reduced motion. */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var selectors = [
    "main > section",
    "body > section",
    ".section",
    ".journal-section",
    ".products-section",
    ".about-section",
    ".process-section",
    ".belief-section",
    ".why-raya-section"
  ];
  var items = Array.from(document.querySelectorAll(selectors.join(",")));
  items = items.filter(function (el, i, arr) {
    return arr.indexOf(el) === i && !el.closest("header") && !el.classList.contains("raya-hero");
  });
  if (!items.length || !("IntersectionObserver" in window)) return;
  items.forEach(function (el) {
    el.classList.add("rg-scroll-reveal");
  });
  var style = document.createElement("style");
  style.textContent = `
    .rg-scroll-reveal { opacity: 0; transform: translateY(14px); transition: opacity .65s ease, transform .65s cubic-bezier(.2,.7,.2,1); }
    .rg-scroll-reveal.rg-revealed { opacity: 1; transform: translateY(0); }
    @media (prefers-reduced-motion: reduce) { .rg-scroll-reveal { opacity: 1; transform: none; transition: none; } }
  `;
  document.head.appendChild(style);
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("rg-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
  items.forEach(function (el) { observer.observe(el); });
})();