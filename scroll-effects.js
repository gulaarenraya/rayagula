/* Raya Gula — refined organic scroll transitions.
   Lightweight liquid wave accents that blend into the brand palette without
   changing section dimensions, content, or page layout. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var selectors = [
    "main > section", "body > section", ".section", ".manifesto", ".why",
    ".cta-banner", ".contact", ".origin-intro", ".origin-image", ".story-section",
    ".process-section", ".origin-quote", ".origin-cta", ".products-intro",
    ".products-grid", ".products-business", ".journal-grid", ".journal-cta"
  ];
  var sections = Array.from(document.querySelectorAll(selectors.join(","))).filter(function (el, i, arr) {
    return arr.indexOf(el) === i && !el.closest("header") &&
      !el.classList.contains("raya-hero") && !el.classList.contains("cert-bar");
  });
  if (!sections.length) return;

  var style = document.createElement("style");
  style.textContent = `
    .rg-scroll-reveal { opacity: 0; transform: translate3d(0, 10px, 0); transition: opacity .72s ease, transform .72s cubic-bezier(.22,.68,0,1); }
    .rg-scroll-reveal.rg-revealed { opacity: 1; transform: translate3d(0,0,0); }
    #rg-liquid-wave { position: fixed; z-index: 9998; left: -2%; width: 104%; height: clamp(84px, 17vh, 170px); pointer-events: none; opacity: 0; overflow: hidden; will-change: transform, opacity; contain: strict; }
    #rg-liquid-wave svg { display: block; width: 100%; height: 100%; filter: drop-shadow(0 -5px 12px rgba(95,60,30,.035)); }
    #rg-liquid-wave.rg-wave-down { bottom: -1px; top: auto; animation: rgWaveDown 1.05s cubic-bezier(.42,0,.18,1) both; }
    #rg-liquid-wave.rg-wave-up { top: -1px; bottom: auto; animation: rgWaveUp 1.05s cubic-bezier(.42,0,.18,1) both; }
    #rg-liquid-wave.rg-wave-up svg { transform: scaleY(-1); }
    @keyframes rgWaveDown {
      0% { transform: translate3d(0,110%,0); opacity: 0; }
      14% { opacity: .54; }
      42% { transform: translate3d(0,8%,0); opacity: .58; }
      70% { transform: translate3d(0,-5%,0); opacity: .34; }
      100% { transform: translate3d(0,-112%,0); opacity: 0; }
    }
    @keyframes rgWaveUp {
      0% { transform: translate3d(0,-110%,0); opacity: 0; }
      14% { opacity: .54; }
      42% { transform: translate3d(0,-8%,0); opacity: .58; }
      70% { transform: translate3d(0,5%,0); opacity: .34; }
      100% { transform: translate3d(0,112%,0); opacity: 0; }
    }
    @media (max-width: 767px) { #rg-liquid-wave { height: clamp(74px, 14vh, 125px); } }
    @media (prefers-reduced-motion: reduce) { .rg-scroll-reveal { opacity: 1; transform: none; transition: none; } #rg-liquid-wave { display: none !important; } }
  `;
  document.head.appendChild(style);

  if (!reduce && "IntersectionObserver" in window) {
    sections.forEach(function (el) { el.classList.add("rg-scroll-reveal"); });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("rg-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -18px 0px" });
    sections.forEach(function (el) { revealObserver.observe(el); });
  }
  if (reduce || sections.length < 2) return;

  var wave = document.createElement("div");
  wave.id = "rg-liquid-wave";
  wave.setAttribute("aria-hidden", "true");
  wave.innerHTML = '<svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rgWaveFill" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0%" stop-color="#f7f0e5" stop-opacity=".86"/><stop offset="55%" stop-color="#d7b77f" stop-opacity=".74"/><stop offset="100%" stop-color="#a87948" stop-opacity=".68"/></linearGradient><linearGradient id="rgWaveEdge" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#f7f0e5" stop-opacity=".12"/><stop offset="50%" stop-color="#fff8ed" stop-opacity=".72"/><stop offset="100%" stop-color="#d7b77f" stop-opacity=".12"/></linearGradient></defs><path d="M0 62 C150 20 260 112 420 73 S690 22 850 68 S1130 112 1280 66 S1380 40 1440 56 L1440 220 L0 220 Z" fill="url(#rgWaveFill)"/><path d="M0 62 C150 20 260 112 420 73 S690 22 850 68 S1130 112 1280 66 S1380 40 1440 56" fill="none" stroke="url(#rgWaveEdge)" stroke-width="4"/><path d="M0 81 C170 42 260 130 440 91 S700 44 870 86 S1140 129 1300 84 S1390 62 1440 74 L1440 220 L0 220 Z" fill="#c9a04a" fill-opacity=".10"/></svg>';
  document.body.appendChild(wave);

  var lastY = window.scrollY || 0;
  var activeIndex = 0;
  var ticking = false;
  var waveTimer = 0;
  function getIndex(y) {
    var marker = y + Math.min(window.innerHeight * .52, 430);
    var index = 0;
    for (var i = 0; i < sections.length; i++) {
      var top = sections[i].getBoundingClientRect().top + y;
      if (top <= marker) index = i;
      else break;
    }
    return index;
  }
  function play(direction) {
    wave.classList.remove("rg-wave-down", "rg-wave-up");
    void wave.offsetWidth;
    wave.classList.add(direction > 0 ? "rg-wave-down" : "rg-wave-up");
    window.clearTimeout(waveTimer);
    waveTimer = window.setTimeout(function () {
      wave.classList.remove("rg-wave-down", "rg-wave-up");
    }, 1100);
  }
  function update() {
    var y = window.scrollY || 0;
    var direction = y >= lastY ? 1 : -1;
    var next = getIndex(y);
    if (next !== activeIndex && Math.abs(y - lastY) > 2) play(direction);
    activeIndex = next;
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", function () {
    activeIndex = getIndex(window.scrollY || 0);
    lastY = window.scrollY || 0;
  }, { passive: true });
  activeIndex = getIndex(lastY);
})();