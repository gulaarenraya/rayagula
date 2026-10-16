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
    el.classList.add("rg-wave-divider");
  });
  var style = document.createElement("style");
  style.textContent = `
    .rg-scroll-reveal { opacity: 0; transform: translateY(14px); transition: opacity .65s ease, transform .65s cubic-bezier(.2,.7,.2,1); }
    /* Thin, low-contrast wave accent: decorative only, never changes section dimensions. */
    .rg-wave-divider { position: relative; }
    .rg-wave-divider::after { content: ""; position: absolute; z-index: 1; pointer-events: none; left: 0; right: 0; bottom: -1px; height: 12px; opacity: .26; background-repeat: repeat-x; background-position: center bottom; background-size: 160px 12px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='12' viewBox='0 0 160 12'%3E%3Cpath d='M0 5 C20 0 40 0 60 5 S100 10 120 5 S140 0 160 5' fill='none' stroke='%23c9a04a' stroke-width='1.5'/%3E%3C/svg%3E"); }
    @media (max-width: 767px) { .rg-wave-divider::after { height: 9px; background-size: 120px 9px; } }
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