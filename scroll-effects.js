/* Raya Gula scroll transitions: subtle reveal + moving liquid-wave wipe.
   Keeps document flow and existing section layouts unchanged. */
(function () {
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var selectors = [
    "main > section", "body > section", ".section", ".manifesto", ".why",
    ".cta-banner", ".contact", ".origin-intro", ".origin-image", ".story-section",
    ".process-section", ".origin-quote", ".origin-cta", ".products-intro",
    ".products-grid", ".products-business", ".journal-grid", ".journal-cta"
  ];
  var sections = Array.from(document.querySelectorAll(selectors.join(",")));
  sections = sections.filter(function (el, i, arr) {
    return arr.indexOf(el) === i && !el.closest("header") &&
      !el.classList.contains("raya-hero") && !el.classList.contains("cert-bar");
  }).sort(function (a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top; });
  if (!sections.length) return;

  var style = document.createElement("style");
  style.textContent = `
    .rg-scroll-reveal { opacity: 0; transform: translateY(13px); transition: opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1); }
    .rg-scroll-reveal.rg-revealed { opacity: 1; transform: translateY(0); }
    #rg-liquid-wave { position: fixed; z-index: 9998; left: 0; right: 0; height: clamp(120px, 25vh, 250px); pointer-events: none; opacity: 0; overflow: hidden; will-change: transform, opacity; }
    #rg-liquid-wave svg { display: block; width: 100%; height: 100%; }
    #rg-liquid-wave.rg-wave-down { bottom: 0; top: auto; animation: rgWaveDown .78s cubic-bezier(.65,0,.35,1) both; }
    #rg-liquid-wave.rg-wave-up { top: 0; bottom: auto; animation: rgWaveUp .78s cubic-bezier(.65,0,.35,1) both; }
    @keyframes rgWaveDown { 0% { transform: translateY(105%); opacity: 0; } 12% { opacity: .88; } 48% { transform: translateY(0); opacity: .88; } 88% { opacity: .72; } 100% { transform: translateY(-105%); opacity: 0; } }
    @keyframes rgWaveUp { 0% { transform: translateY(-105%); opacity: 0; } 12% { opacity: .88; } 48% { transform: translateY(0); opacity: .88; } 88% { opacity: .72; } 100% { transform: translateY(105%); opacity: 0; } }
    @media (max-width: 767px) { #rg-liquid-wave { height: clamp(100px, 21vh, 180px); } }
    @media (prefers-reduced-motion: reduce) { .rg-scroll-reveal { opacity: 1; transform: none; transition: none; } #rg-liquid-wave { display: none !important; } }
  `;
  document.head.appendChild(style);

  if (!reducedMotion && "IntersectionObserver" in window) {
    sections.forEach(function (el) { el.classList.add("rg-scroll-reveal"); });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("rg-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    sections.forEach(function (el) { revealObserver.observe(el); });
  }

  if (reducedMotion || sections.length < 2) return;
  var wave = document.createElement("div");
  wave.id = "rg-liquid-wave";
  wave.setAttribute("aria-hidden", "true");
  wave.innerHTML = '<svg viewBox="0 0 1440 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rgWaveFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f4ead9"/><stop offset="58%" stop-color="#d8b77a"/><stop offset="100%" stop-color="#9a6a3c"/></linearGradient></defs><path d="M0 54 C180 120 300 8 480 62 S760 130 940 62 S1240 8 1440 58 L1440 300 L0 300 Z" fill="url(#rgWaveFill)" fill-opacity=".94"/><path d="M0 38 C180 104 300 -8 480 46 S760 114 940 46 S1240 -8 1440 42" fill="none" stroke="#fff7e9" stroke-opacity=".85" stroke-width="5"/><path d="M0 70 C180 136 300 24 480 78 S760 146 940 78 S1240 24 1440 74" fill="none" stroke="#a8742f" stroke-opacity=".55" stroke-width="3"/></svg>';
  document.body.appendChild(wave);

  var lastY = window.scrollY || 0;
  var activeIndex = -1;
  var ticking = false;
  var waveTimer = null;
  function animateWave(direction) {
    wave.classList.remove("rg-wave-down", "rg-wave-up");
    void wave.offsetWidth;
    wave.classList.add(direction > 0 ? "rg-wave-down" : "rg-wave-up");
    if (waveTimer) window.clearTimeout(waveTimer);
    waveTimer = window.setTimeout(function () {
      wave.classList.remove("rg-wave-down", "rg-wave-up");
    }, 850);
  }
  function checkSections() {
    var y = window.scrollY || 0;
    var direction = y >= lastY ? 1 : -1;
    var marker = y + Math.max(100, window.innerHeight * 0.38);
    var nextIndex = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top + y <= marker) nextIndex = i;
      else break;
    }
    if (activeIndex !== -1 && nextIndex !== activeIndex) animateWave(direction);
    activeIndex = nextIndex;
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(checkSections);
    }
  }, { passive: true });
  window.addEventListener("resize", function () { lastY = window.scrollY || 0; }, { passive: true });
  checkSections();
})();