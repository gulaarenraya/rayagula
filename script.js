\/* =========================================================
   RAYA GULA
   MAIN JAVASCRIPT — STABLE / FAIL-SAFE VERSION
   ========================================================= */

(function () {

  "use strict";


  /* =====================================================
     MAIN INITIALIZATION
     ===================================================== */

  function initRayaGula() {

    try {
      initMobileNavigation();
    } catch (error) {
      console.error(
        "Raya Gula: mobile navigation error",
        error
      );
    }


    try {
      initScrollReveal();
    } catch (error) {

      console.error(
        "Raya Gula: scroll reveal error",
        error
      );

      showAllRevealElements();

    }


    try {
      initFloatingSocial();
    } catch (error) {

      console.error(
        "Raya Gula: floating menu error",
        error
      );

    }


    try {
      initExternalLinkSecurity();
    } catch (error) {

      console.error(
        "Raya Gula: external link security error",
        error
      );

    }


    try {
      initSmoothScroll();
    } catch (error) {

      console.error(
        "Raya Gula: smooth scroll error",
        error
      );

    }


    try {
      initSugarScroll();
    } catch (error) {

      console.error(
        "Raya Gula: sugar scroll error",
        error
      );

    }


    console.log(
      "Raya Gula website initialized — stable version."
    );

  }


  /* =====================================================
     START WHEN DOM IS READY
     ===================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initRayaGula,
      {
        once: true
      }
    );

  } else {

    initRayaGula();

  }


  /* =====================================================
     MOBILE NAVIGATION
     ===================================================== */

  function initMobileNavigation() {

    const menu =
      document.querySelector(
        ".menu-toggle"
      );

    const nav =
      document.querySelector(
        ".nav"
      );


    if (
      !menu ||
      !nav
    ) {

      return;

    }


    function closeMenu() {

      nav.classList.remove(
        "open"
      );

      nav.classList.remove(
        "active"
      );


      menu.setAttribute(
        "aria-expanded",
        "false"
      );


      menu.innerHTML =
        "☰";

    }


    menu.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();


        const isOpen =
          nav.classList.contains(
            "open"
          ) ||
          nav.classList.contains(
            "active"
          );


        if (isOpen) {

          closeMenu();

        } else {

          nav.classList.add(
            "open"
          );

          nav.classList.add(
            "active"
          );


          menu.setAttribute(
            "aria-expanded",
            "true"
          );


          menu.innerHTML =
            "✕";

        }

      }
    );


    document.addEventListener(
      "click",
      function (event) {

        if (
          !nav.contains(
            event.target
          ) &&
          !menu.contains(
            event.target
          )
        ) {

          closeMenu();

        }

      }
    );


    nav
      .querySelectorAll("a")
      .forEach(
        function (link) {

          link.addEventListener(
            "click",
            function () {

              closeMenu();

            }
          );

        }
      );


    window.addEventListener(
      "resize",
      function () {

        if (
          window.innerWidth >
          900
        ) {

          closeMenu();

        }

      },
      {
        passive: true
      }
    );

  }


  /* =====================================================
     SHOW ALL REVEAL ELEMENTS
     
     FAIL-SAFE
     ===================================================== */

  function showAllRevealElements() {

    document
      .querySelectorAll(
        ".reveal"
      )
      .forEach(
        function (element) {

          element.classList.add(
            "visible"
          );

        }
      );

  }


  /* =====================================================
     SCROLL REVEAL — FAIL SAFE
     ===================================================== */

  function initScrollReveal() {

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );


    if (
      !revealElements.length
    ) {

      return;

    }


    /*
     * SAFETY FALLBACK
     *
     * Jika observer tidak bekerja,
     * semua elemen akan muncul maksimal
     * setelah 3,5 detik.
     */

    const fallbackTimer =
      setTimeout(
        function () {

          showAllRevealElements();

        },
        3500
      );


    /*
     * Browser tidak mendukung
     * IntersectionObserver.
     */

    if (
      typeof window.IntersectionObserver !==
      "function"
    ) {

      clearTimeout(
        fallbackTimer
      );

      showAllRevealElements();

      return;

    }


    const observer =
      new IntersectionObserver(

        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {

          threshold:
            0.08,

          rootMargin:
            "0px 0px -20px 0px"

        }

      );


    revealElements.forEach(
      function (element) {

        observer.observe(
          element
        );

      }
    );


    /*
     * Elemen yang sudah terlihat
     * ketika halaman pertama dibuka
     * langsung dibuat visible.
     */

    requestAnimationFrame(
      function () {

        revealElements.forEach(
          function (element) {

            const rect =
              element.getBoundingClientRect();


            if (
              rect.top <
              window.innerHeight &&
              rect.bottom >
              0
            ) {

              element.classList.add(
                "visible"
              );

            }

          }
        );

      }
    );

  }


  /* =====================================================
     FLOATING RAYA GULA MENU
     ===================================================== */

  function initFloatingSocial() {

    const floatingSocial =
      document.getElementById(
        "floatingSocial"
      );

    const floatingMain =
      document.getElementById(
        "floatingMain"
      );

    const floatingMainIcon =
      document.getElementById(
        "floatingMainIcon"
      );


    if (
      !floatingSocial ||
      !floatingMain ||
      !floatingMainIcon
    ) {

      return;

    }


    const floatingIcons = [

      {
        src:
          "logo.png",

        alt:
          "Raya Gula"

      },

      {
        src:
          "icon-whatsapp.png",

        alt:
          "WhatsApp Raya Gula"

      },

      {
        src:
          "icon-instagram.png",

        alt:
          "Instagram Raya Gula"

      },

      {
        src:
          "icon-shopee.png",

        alt:
          "Shopee Raya Gula"

      }

    ];


    let currentIcon =
      0;

    let menuOpen =
      false;


    /* -------------------------------------------------
       SET MAIN ICON
       ------------------------------------------------- */

    function setMainIcon(
      index
    ) {

      const icon =
        floatingIcons[
          index
        ];


      if (!icon) {

        return;

      }


      floatingMainIcon.style.opacity =
        "0";


      setTimeout(
        function () {

          floatingMainIcon.src =
            icon.src;


          floatingMainIcon.alt =
            icon.alt;


          floatingMainIcon.style.opacity =
            "1";

        },
        180
      );

    }


    /* -------------------------------------------------
       AUTO ICON ROTATION
       ------------------------------------------------- */

    setInterval(
      function () {

        if (
          menuOpen
        ) {

          return;

        }


        currentIcon =
          (
            currentIcon + 1
          ) %
          floatingIcons.length;


        setMainIcon(
          currentIcon
        );

      },
      2800
    );


    /* -------------------------------------------------
       MAIN BUTTON
       ------------------------------------------------- */

    floatingMain.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();


        menuOpen =
          !menuOpen;


        floatingSocial.classList.toggle(
          "open",
          menuOpen
        );


        floatingMain.setAttribute(
          "aria-expanded",
          menuOpen
            ? "true"
            : "false"
        );


        if (
          menuOpen
        ) {

          currentIcon =
            0;


          setMainIcon(
            0
          );

        }

      }
    );


    /* -------------------------------------------------
       CLICK OUTSIDE
       ------------------------------------------------- */

    document.addEventListener(
      "click",
      function (event) {

        if (
          !floatingSocial.contains(
            event.target
          )
        ) {

          menuOpen =
            false;


          floatingSocial.classList.remove(
            "open"
          );


          floatingMain.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );


    /* -------------------------------------------------
       SOCIAL LINKS
       ------------------------------------------------- */

    floatingSocial
      .querySelectorAll(
        ".floating-item"
      )
      .forEach(
        function (link) {

          link.addEventListener(
            "click",
            function () {

              menuOpen =
                false;


              floatingSocial.classList.remove(
                "open"
              );


              floatingMain.setAttribute(
                "aria-expanded",
                "false"
              );

            }
          );

        }
      );

  }


  /* =====================================================
     EXTERNAL LINK SECURITY
     ===================================================== */

  function initExternalLinkSecurity() {

    document
      .querySelectorAll(
        'a[target="_blank"]'
      )
      .forEach(
        function (link) {

          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );

        }
      );

  }


  /* =====================================================
     SMOOTH SCROLL
     ===================================================== */

  function initSmoothScroll() {

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(
        function (link) {

          link.addEventListener(
            "click",
            function (event) {

              const targetId =
                link.getAttribute(
                  "href"
                );


              if (
                !targetId ||
                targetId === "#"
              ) {

                return;

              }


              let target =
                null;


              try {

                target =
                  document.querySelector(
                    targetId
                  );

              } catch (error) {

                return;

              }


              if (
                !target
              ) {

                return;

              }


              event.preventDefault();


              target.scrollIntoView({

                behavior:
                  "smooth",

                block:
                  "start"

              });

            }
          );

        }
      );

  }


  /* =====================================================
     SOFT PALM SUGAR SCROLL
     ===================================================== */

  function initSugarScroll() {

    if (
      !document.body ||
      typeof window.addEventListener !==
      "function"
    ) {

      return;

    }


    /*
     * Respect reduced motion.
     */

    if (
      window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      return;

    }


    /* -------------------------------------------------
       CREATE PARTICLE LAYER
       ------------------------------------------------- */

    const sugarLayer =
      document.createElement(
        "div"
      );


    sugarLayer.className =
      "rg-sugar-layer";


    sugarLayer.setAttribute(
      "aria-hidden",
      "true"
    );


    Object.assign(
      sugarLayer.style,
      {

        position:
          "fixed",

        left:
          "0",

        top:
          "0",

        width:
          "100vw",

        height:
          "100vh",

        overflow:
          "hidden",

        pointerEvents:
          "none",

        zIndex:
          "9980"

      }
    );


    document.body.appendChild(
      sugarLayer
    );


    /* -------------------------------------------------
       DEVICE
       ------------------------------------------------- */

    let isMobile =
      window.innerWidth <=
      768;


    function getMaxParticles() {

      return isMobile
        ? 14
        : 28;

    }


    function getParticleInterval() {

      return isMobile
        ? 130
        : 95;

    }


    /* -------------------------------------------------
       SCROLL VARIABLES
       ------------------------------------------------- */

    let lastScrollY =
      window.scrollY;


    let lastParticleTime =
      0;


    /* -------------------------------------------------
       CREATE PARTICLE
       ------------------------------------------------- */

    function createSugarParticle() {

      if (
        sugarLayer.children.length >=
        getMaxParticles()
      ) {

        return;

      }


      const particle =
        document.createElement(
          "span"
        );


      particle.className =
        "rg-sugar-particle";


      const size =
        Math.random() * 4 + 2;


      const startX =
        Math.random() *
        window.innerWidth;


      const drift =
        (
          Math.random() -
          0.5
        ) *
        100;


      const driftEnd =
        (
          Math.random() -
          0.5
        ) *
        170;


      const duration =
        Math.random() *
        1800 +
        2800;


      const opacity =
        Math.random() *
        0.32 +
        0.42;


      /* ------------------------------------------------
         PARTICLE STYLE
         ------------------------------------------------ */

      Object.assign(
        particle.style,
        {

          position:
            "absolute",

          left:
            startX + "px",

          top:
            "-12px",

          width:
            size + "px",

          height:
            size + "px",

          borderRadius:
            "50%",

          background:
            "radial-gradient(" +
            "circle at 30% 25%, " +
            "#f8e7c5 0%, " +
            "#d1a263 42%, " +
            "#8c5b2d 100%" +
            ")",

          boxShadow:
            "0 1px 3px rgba(70,42,18,.22)",

          opacity:
            "0",

          pointerEvents:
            "none",

          willChange:
            "transform, opacity"

        }
      );


      /* ------------------------------------------------
         ORGANIC SHAPE
         ------------------------------------------------ */

      const r1 =
        40 +
        Math.random() *
        20;


      const r2 =
        45 +
        Math.random() *
        15;


      const r3 =
        40 +
        Math.random() *
        20;


      const r4 =
        45 +
        Math.random() *
        15;


      particle.style.borderRadius =
        `${r1}% ${r2}% ${r3}% ${r4}%`;


      sugarLayer.appendChild(
        particle
      );


      /* ------------------------------------------------
         WEB ANIMATION API
         ------------------------------------------------ */

      if (
        typeof particle.animate ===
        "function"
      ) {

        const animation =
          particle.animate(

            [

              {
                transform:
                  "translate3d(0,-15px,0) rotate(0deg)",

                opacity:
                  0

              },

              {

                transform:
                  "translate3d(" +
                  (
                    drift * 0.15
                  ) +
                  "px,15vh,0) rotate(90deg)",

                opacity:
                  opacity

              },

              {

                transform:
                  "translate3d(" +
                  drift +
                  "px,52vh,0) rotate(220deg)",

                opacity:
                  opacity

              },

              {

                transform:
                  "translate3d(" +
                  driftEnd +
                  "px,110vh,0) rotate(420deg)",

                opacity:
                  0

              }

            ],

            {

              duration:
                duration,

              easing:
                "cubic-bezier(.22,.61,.36,1)",

              fill:
                "forwards"

            }

          );


        animation.onfinish =
          function () {

            particle.remove();

          };


        animation.oncancel =
          function () {

            particle.remove();

          };

      } else {

        /* ----------------------------------------------
           BROWSER FALLBACK
           ---------------------------------------------- */

        particle.style.transition =
          "opacity .3s ease";


        requestAnimationFrame(
          function () {

            particle.style.opacity =
              opacity;

          }
        );


        setTimeout(
          function () {

            particle.style.opacity =
              "0";


            setTimeout(
              function () {

                particle.remove();

              },
              500
            );

          },
          duration
        );

      }

    }


    /* -------------------------------------------------
       SCROLL HANDLER
       ------------------------------------------------- */

    function handleSugarScroll() {

      const currentY =
        window.scrollY;


      /*
       * Hanya ketika scrolling ke bawah.
       */

      if (
        currentY <=
        lastScrollY
      ) {

        lastScrollY =
          currentY;

        return;

      }


      lastScrollY =
        currentY;


      const now =
        performance.now();


      if (
        now -
        lastParticleTime <
        getParticleInterval()
      ) {

        return;

      }


      lastParticleTime =
        now;


      createSugarParticle();


      /*
       * Sesekali buat particle kedua.
       */

      if (
        Math.random() >
        0.68
      ) {

        setTimeout(
          function () {

            createSugarParticle();

          },
          40
        );

      }

    }


    /* -------------------------------------------------
       SCROLL EVENT
       ------------------------------------------------- */

    window.addEventListener(
      "scroll",
      handleSugarScroll,
      {
        passive:
          true
      }
    );


    /* -------------------------------------------------
       RESIZE
       ------------------------------------------------- */

    window.addEventListener(
      "resize",
      function () {

        isMobile =
          window.innerWidth <=
          768;


        lastScrollY =
          window.scrollY;

      },
      {
        passive:
          true
      }
    );


    console.log(
      "Raya Gula sugar scroll effect initialized."
    );

  }


})();
