/* =========================================================
   RAYA GULA
   MAIN JAVASCRIPT — STABLE / FAIL-SAFE VERSION
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     START WHEN DOM IS READY
     ========================================================= */

  function initRayaGula() {
    try {
      initMobileNavigation();
    } catch (error) {
      console.error("Raya Gula: mobile navigation error", error);
    }

    try {
      initScrollReveal();
    } catch (error) {
      console.error("Raya Gula: scroll reveal error", error);
      showAllRevealElements();
    }

    try {
      initFloatingSocial();
    } catch (error) {
      console.error("Raya Gula: floating menu error", error);
    }

    try {
      initExternalLinkSecurity();
    } catch (error) {
      console.error("Raya Gula: external link security error", error);
    }

    try {
      initSmoothScroll();
    } catch (error) {
      console.error("Raya Gula: smooth scroll error", error);
    }

    try {
      initSugarScroll();
    } catch (error) {
      console.error("Raya Gula: sugar scroll error", error);
    }

    console.log("Raya Gula website initialized — stable version.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRayaGula, {
      once: true
    });
  } else {
    initRayaGula();
  }


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  function initMobileNavigation() {
    const menu = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (!menu || !nav) {
      return;
    }

    function closeMenu() {
      nav.classList.remove("open");
      nav.classList.remove("active");

      menu.setAttribute("aria-expanded", "false");
      menu.innerHTML = "☰";
    }

    menu.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen =
        nav.classList.contains("open") ||
        nav.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        nav.classList.add("open");
        nav.classList.add("active");

        menu.setAttribute("aria-expanded", "true");
        menu.innerHTML = "✕";
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !nav.contains(event.target) &&
        !menu.contains(event.target)
      ) {
        closeMenu();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth > 900) {
          closeMenu();
        }
      },
      { passive: true }
    );
  }


  /* =========================================================
     SCROLL REVEAL — FAIL SAFE

     Penting:
     - Elemen tidak boleh hilang permanen.
     - Jika IntersectionObserver gagal, semua .reveal
       langsung dibuat visible.
     - Elemen yang terlalu lama tidak ter-trigger juga
       akan dibuat visible oleh fallback timer.
     ========================================================= */

  function showAllRevealElements() {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("visible");
    });
  }

  function initScrollReveal() {
    const revealElements =
      document.querySelectorAll(".reveal");

    if (!revealElements.length) {
      return;
    }

    /* Fallback safety:
       Jika observer tidak bekerja karena browser/cache/error,
       jangan biarkan konten tetap opacity:0. */
    const fallbackTimer = setTimeout(function () {
      revealElements.forEach(function (element) {
        element.classList.add("visible");
      });
    }, 3500);

    if (
      typeof window.IntersectionObserver !== "function"
    ) {
      clearTimeout(fallbackTimer);
      showAllRevealElements();
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });

    /* Elemen yang sudah terlihat saat halaman dibuka
       langsung ditampilkan agar hero/about tidak terlambat. */
    requestAnimationFrame(function () {
      revealElements.forEach(function (element) {
        const rect = element.getBoundingClientRect();

        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        ) {
          element.classList.add("visible");
        }
      });
    });
  }


  /* =========================================================
     FLOATING RAYA GULA MENU
     ========================================================= */

  function initFloatingSocial() {
    const floatingSocial =
      document.getElementById("floatingSocial");

    const floatingMain =
      document.getElementById("floatingMain");

    const floatingMainIcon =
      document.getElementById("floatingMainIcon");

    if (
      !floatingSocial ||
      !floatingMain ||
      !floatingMainIcon
    ) {
      console.warn(
        "Raya Gula: floating menu markup tidak ditemukan."
      );
      return;
    }

    const floatingIcons = [
      {
        src: "logo.png",
        alt: "Raya Gula"
      },
      {
        src: "icon-whatsapp.png",
        alt: "WhatsApp Raya Gula"
      },
      {
        src: "icon-instagram.png",
        alt: "Instagram Raya Gula"
      },
      {
        src: "icon-shopee.png",
        alt: "Shopee Raya Gula"
      }
    ];

    let currentIcon = 0;
    let menuOpen = false;
    let iconTimer = null;
    let iconSwapTimer = null;

    function setMainIcon(index) {
      const icon = floatingIcons[index];

      if (!icon) {
        return;
      }

      if (iconSwapTimer) {
        clearTimeout(iconSwapTimer);
      }

      floatingMainIcon.style.opacity = "0";

      iconSwapTimer = setTimeout(function () {
        floatingMainIcon.src = icon.src;
        floatingMainIcon.alt = icon.alt;
        floatingMainIcon.style.opacity = "1";
      }, 140);
    }

    function openMenu() {
      menuOpen = true;
      floatingSocial.classList.add("open");
      floatingMain.setAttribute("aria-expanded", "true");

      currentIcon = 0;
      setMainIcon(0);
    }

    function closeMenu() {
      menuOpen = false;
      floatingSocial.classList.remove("open");
      floatingMain.setAttribute("aria-expanded", "false");
    }

    function toggleMenu(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    /*
       Pastikan kondisi awal selalu terlihat dan tertutup.
       CSS mengatur posisi visual; JavaScript hanya mengatur state.
    */
    floatingSocial.classList.remove("open");
    floatingMain.setAttribute("aria-expanded", "false");
    setMainIcon(0);

    /* Main button */
    floatingMain.addEventListener("click", toggleMenu);

    /* Keyboard accessibility */
    floatingMain.addEventListener("keydown", function (event) {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        toggleMenu(event);
      }
    });

    /* Close when clicking outside */
    document.addEventListener("click", function (event) {
      if (!floatingSocial.contains(event.target)) {
        closeMenu();
      }
    });

    /* Close after selecting a social destination */
    floatingSocial
      .querySelectorAll(".floating-item")
      .forEach(function (link) {
        link.addEventListener("click", function () {
          closeMenu();
        });
      });

    /* Automatic logo / social icon rotation while closed */
    iconTimer = setInterval(function () {
      if (menuOpen) {
        return;
      }

      currentIcon =
        (currentIcon + 1) % floatingIcons.length;

      setMainIcon(currentIcon);
    }, 2800);

    /* Keep timer reference alive for debugging / cleanup safety. */
    floatingSocial.dataset.initialized = "true";
    floatingSocial.dataset.iconTimer = "active";
  }


  /* =========================================================
     EXTERNAL LINK SECURITY
     ========================================================= */

  function initExternalLinkSecurity() {
    document
      .querySelectorAll('a[target="_blank"]')
      .forEach(function (link) {
        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );
      });
  }


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  function initSmoothScroll() {
    document
      .querySelectorAll('a[href^="#"]')
      .forEach(function (link) {
        link.addEventListener("click", function (event) {
          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          let target = null;

          try {
            target =
              document.querySelector(targetId);
          } catch (error) {
            return;
          }

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
  }


  /* =========================================================
     RAYA GULA — SOFT PALM SUGAR SCROLL

     Butiran gula hanya dibuat saat user scroll ke bawah.
     ========================================================= */

  function initSugarScroll() {
    if (
      !document.body ||
      typeof window.addEventListener !== "function"
    ) {
      return;
    }

    /* Respect reduced-motion preference */
    if (
      window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const sugarLayer =
      document.createElement("div");

    sugarLayer.className =
      "rg-sugar-layer";

    sugarLayer.setAttribute(
      "aria-hidden",
      "true"
    );

    /* Inline safety styling */
    Object.assign(sugarLayer.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: "9980"
    });

    document.body.appendChild(sugarLayer);

    let isMobile =
      window.innerWidth <= 768;

    let lastScrollY =
      window.scrollY;

    let lastParticleTime = 0;

    function getMaxParticles() {
      return isMobile ? 14 : 28;
    }

    function getParticleInterval() {
      return isMobile ? 130 : 95;
    }

    function createSugarParticle() {
      if (
        sugarLayer.children.length >=
        getMaxParticles()
      ) {
        return;
      }

      const particle =
        document.createElement("span");

      particle.className =
        "rg-sugar-particle";

      const size =
        Math.random() * 4 + 2;

      const startX =
        Math.random() *
        window.innerWidth;

      const drift =
        (Math.random() - 0.5) * 100;

      const driftEnd =
        (Math.random() - 0.5) * 170;

      const duration =
        Math.random() * 1800 + 2800;

      const opacity =
        Math.random() * 0.32 + 0.42;

      Object.assign(particle.style, {
        position: "absolute",
        left: startX + "px",
        top: "-12px",
        width: size + "px",
        height: size + "px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 30% 25%, #f8e7c5 0%, #d1a263 42%, #8c5b2d 100%)",
        boxShadow:
          "0 1px 3px rgba(70,42,18,.22)",
        opacity: "0",
        pointerEvents: "none",
        willChange: "transform, opacity"
      });

      const r1 =
        40 + Math.random() * 20;

      const r2 =
        45 + Math.random() * 15;

      const r3 =
        40 + Math.random() * 20;

      const r4 =
        45 + Math.random() * 15;

      particle.style.borderRadius =
        `${r1}% ${r2}% ${r3}% ${r4}%`;

      sugarLayer.appendChild(particle);

      if (
        typeof particle.animate === "function"
      ) {
        const animation =
          particle.animate(
            [
              {
                transform:
                  "translate3d(0,-15px,0) rotate(0deg)",
                opacity: 0
              },
              {
                transform:
                  "translate3d(" +
                  (drift * 0.15) +
                  "px,15vh,0) rotate(90deg)",
                opacity: opacity
              },
              {
                transform:
                  "translate3d(" +
                  drift +
                  "px,52vh,0) rotate(220deg)",
                opacity: opacity
              },
              {
                transform:
                  "translate3d(" +
                  driftEnd +
                  "px,110vh,0) rotate(420deg)",
                opacity: 0
              }
            ],
            {
              duration: duration,
              easing:
                "cubic-bezier(.22,.61,.36,1)",
              fill: "forwards"
            }
          );

        animation.onfinish = function () {
          particle.remove();
        };

        animation.oncancel = function () {
          particle.remove();
        };
      } else {
        /* Browser fallback */
        particle.style.transition =
          "opacity .3s ease";

        requestAnimationFrame(function () {
          particle.style.opacity =
            opacity;
        });

        setTimeout(function () {
          particle.style.opacity = "0";

          setTimeout(function () {
            particle.remove();
          }, 500);
        }, duration);
      }
    }

    function handleSugarScroll() {
      const currentY =
        window.scrollY;

      /* Only generate while scrolling down */
      if (currentY <= lastScrollY) {
        lastScrollY = currentY;
        return;
      }

      lastScrollY = currentY;

      const now =
        performance.now();

      if (
        now - lastParticleTime <
        getParticleInterval()
      ) {
        return;
      }

      lastParticleTime = now;

      createSugarParticle();

      /* Occasionally create a second particle */
      if (Math.random() > 0.68) {
        setTimeout(function () {
          createSugarParticle();
        }, 40);
      }
    }

    window.addEventListener(
      "scroll",
      handleSugarScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      function () {
        isMobile =
          window.innerWidth <= 768;

        lastScrollY =
          window.scrollY;
      },
      { passive: true }
    );

    console.log(
      "Raya Gula sugar scroll effect initialized."
    );
  }

})();

/* =====================================================
   PRODUCT SLIDER — RAYA GULA
   ===================================================== */
(function () {
  "use strict";

  const products = [
    {
      image: "product-semut.png",
      alt: "Gula Aren Semut Raya Gula 500 gram",
      titleId: "Gula Aren<br>Semut",
      titleEn: "Granulated Palm<br>Sugar",
      leadId: "Manis alami dalam bentuk kristal.",
      leadEn: "Naturally sweet in fine crystals.",
      descriptionId: "Gula aren yang diolah menjadi butiran kristal dengan karakter rasa khas nira aren. Praktis digunakan untuk kopi, teh, baking, dessert, dan berbagai kebutuhan kuliner.",
      descriptionEn: "Palm sugar carefully processed into fine crystals with the distinctive character of Indonesian palm nectar. Ideal for coffee, tea, baking, desserts, and everyday culinary use.",
      specs: [["500 g", "Netto", "Net weight"], ["100%", "Gula Aren", "Palm Sugar"], ["ID", "Indonesia", "Indonesia"]]
    },
    {
      image: "product-cair.png",
      alt: "Gula Aren Cair Raya Gula 1 Liter",
      titleId: "Gula Aren<br>Cair",
      titleEn: "Liquid Palm<br>Sugar",
      leadId: "Praktis dengan rasa manis khas nira aren.",
      leadEn: "Convenient with the natural sweetness of palm nectar.",
      descriptionId: "Gula aren dalam bentuk cair yang praktis digunakan untuk minuman, kopi, dessert, saus, dan berbagai kebutuhan kuliner. Mudah dituang dan menyatu dengan berbagai sajian.",
      descriptionEn: "Liquid palm sugar made for easy use in drinks, coffee, desserts, sauces, and everyday culinary applications. Smooth to pour and easy to blend into recipes.",
      specs: [["1 L", "Netto", "Net weight"], ["100%", "Gula Aren", "Palm Sugar"], ["ID", "Indonesia", "Indonesia"]]
    },
    {
      image: "product-cetak.png",
      alt: "Gula Aren Cetak Raya Gula 1 Kg",
      titleId: "Gula Aren<br>Cetak",
      titleEn: "Traditional Palm<br>Sugar",
      leadId: "Tradisional dengan karakter rasa autentik.",
      leadEn: "Traditional with an authentic palm sugar character.",
      descriptionId: "Gula aren cetak dengan karakter rasa dan aroma khas nira aren Indonesia. Cocok untuk kebutuhan rumah tangga, kuliner tradisional, baking, hingga kebutuhan bisnis.",
      descriptionEn: "Traditional palm sugar with the distinctive flavor and aroma of Indonesian palm nectar. Suitable for home use, traditional cuisine, baking, and business applications.",
      specs: [["1 Kg", "Netto", "Net weight"], ["100%", "Gula Aren", "Palm Sugar"], ["ID", "Indonesia", "Indonesia"]]
    }
  ];

  function initProductSlider() {
    const slider = document.querySelector("[data-product-slider]");
    if (!slider) return;

    const image = slider.querySelector("[data-product-image]");
    const number = slider.querySelector("[data-product-number]");
    const title = slider.querySelector("[data-product-title]");
    const lead = slider.querySelector("[data-product-lead]");
    const description = slider.querySelector("[data-product-description]");
    const specs = slider.querySelector("[data-product-specs]");
    const progress = slider.querySelector("[data-product-progress]");
    const prev = slider.querySelector("[data-product-prev]");
    const next = slider.querySelector("[data-product-next]");

    if (!image || !number || !title || !lead || !description || !specs || !progress || !prev || !next) {
      console.warn("Raya Gula: product slider elements are incomplete.");
      return;
    }

    let currentIndex = 0;
    let language = document.documentElement.lang === "en" ? "en" : "id";

    function render(index, animate = true) {
      const product = products[index];
      const isEnglish = language === "en";

      if (animate) image.classList.remove("is-active");

      const apply = () => {
        image.src = product.image;
        image.alt = product.alt;
        title.innerHTML = isEnglish ? product.titleEn : product.titleId;
        lead.textContent = isEnglish ? product.leadEn : product.leadId;
        description.textContent = isEnglish ? product.descriptionEn : product.descriptionId;
        number.textContent = `${String(index + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}`;
        progress.textContent = number.textContent;

        specs.innerHTML = product.specs.map(spec => `
          <div>
            <b>${spec[0]}</b>
            <small>${isEnglish ? spec[2] : spec[1]}</small>
          </div>
        `).join("");

        if (animate) requestAnimationFrame(() => image.classList.add("is-active"));
        else image.classList.add("is-active");
      };

      if (animate) window.setTimeout(apply, 160);
      else apply();
    }

    function goTo(index) {
      currentIndex = (index + products.length) % products.length;
      render(currentIndex);
    }

    prev.addEventListener("click", () => goTo(currentIndex - 1));
    next.addEventListener("click", () => goTo(currentIndex + 1));

    slider.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") goTo(currentIndex - 1);
      if (event.key === "ArrowRight") goTo(currentIndex + 1);
    });

    window.addEventListener("raya:language", event => {
      language = event.detail === "en" ? "en" : "id";
      render(currentIndex, false);
    });

    render(currentIndex, false);
  }

  /* =====================================================
     BILINGUAL ENGINE — DATA ATTRIBUTES + LANG SPANS ONLY
     Prevents "BerandaHome" and conflicting translation passes.
     ===================================================== */
  function initLanguage() {
    const buttons = document.querySelectorAll(".lang-btn");
    const langSpansId = document.querySelectorAll(".lang-id");
    const langSpansEn = document.querySelectorAll(".lang-en");

    function setLanguage(lang) {
      const activeLang = lang === "en" ? "en" : "id";
      document.documentElement.lang = activeLang;
      document.body.dataset.lang = activeLang;
      document.body.classList.toggle("language-en", activeLang === "en");

      langSpansId.forEach(el => { el.hidden = activeLang === "en"; });
      langSpansEn.forEach(el => { el.hidden = activeLang !== "en"; });

      document.querySelectorAll("[data-id][data-en]").forEach(el => {
        el.textContent = activeLang === "en" ? el.dataset.en : el.dataset.id;
      });

      buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === activeLang));
      localStorage.setItem("raya-language", activeLang);
      window.dispatchEvent(new CustomEvent("raya:language", { detail: activeLang }));
    }

    buttons.forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
    setLanguage(localStorage.getItem("raya-language") || "id");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initProductSlider();
    initLanguage();
  });
})();
