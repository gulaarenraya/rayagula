/* =========================================================
   RAYA GULA
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    "use strict";


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menu =
      document.querySelector(".menu-toggle");

    const nav =
      document.querySelector(".nav");


    function closeMenu() {

      if (!menu || !nav) {
        return;
      }

      nav.classList.remove("open");
      nav.classList.remove("active");

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

      menu.innerHTML = "☰";
    }


    if (menu && nav) {

      menu.addEventListener(
        "click",
        function (event) {

          event.stopPropagation();

          const isOpen =
            nav.classList.contains("open") ||
            nav.classList.contains("active");


          if (isOpen) {

            closeMenu();

          } else {

            nav.classList.add("open");
            nav.classList.add("active");

            menu.setAttribute(
              "aria-expanded",
              "true"
            );

            menu.innerHTML = "✕";
          }

        }
      );


      document.addEventListener(
        "click",
        function (event) {

          if (
            !nav.contains(event.target) &&
            !menu.contains(event.target)
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

          if (window.innerWidth > 900) {
            closeMenu();
          }

        }
      );

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
      document.querySelectorAll(".reveal");


    if (
      revealElements.length &&
      "IntersectionObserver" in window
    ) {

      const observer =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(
              function (entry) {

                if (entry.isIntersecting) {

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
            threshold: 0.12,
            rootMargin:
              "0px 0px -40px 0px"
          }
        );


      revealElements.forEach(
        function (element) {

          observer.observe(element);

        }
      );

    } else {

      revealElements.forEach(
        function (element) {

          element.classList.add("visible");

        }
      );

    }


    /* =====================================================
       FLOATING RAYA GULA MENU
       ===================================================== */

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
      floatingSocial &&
      floatingMain &&
      floatingMainIcon
    ) {

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


      /* -------------------------------------------------
         GANTI ICON OTOMATIS
         ------------------------------------------------- */

      const iconTimer =
        setInterval(
          function () {

            if (menuOpen) {
              return;
            }


            floatingMainIcon.style.opacity =
              "0";


            setTimeout(
              function () {

                currentIcon =
                  (
                    currentIcon + 1
                  ) %
                  floatingIcons.length;


                floatingMainIcon.src =
                  floatingIcons[
                    currentIcon
                  ].src;


                floatingMainIcon.alt =
                  floatingIcons[
                    currentIcon
                  ].alt;


                floatingMainIcon.style.opacity =
                  "1";

              },
              200
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

          menuOpen = !menuOpen;


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


          if (menuOpen) {

            floatingMainIcon.style.opacity =
              "0";


            setTimeout(
              function () {

                floatingMainIcon.src =
                  "logo.png";

                floatingMainIcon.alt =
                  "Raya Gula";

                floatingMainIcon.style.opacity =
                  "1";

                currentIcon = 0;

              },
              200
            );

          }

        }
      );


      /* -------------------------------------------------
         KLIK DI LUAR MENU
         ------------------------------------------------- */

      document.addEventListener(
        "click",
        function (event) {

          if (
            !floatingSocial.contains(
              event.target
            )
          ) {

            menuOpen = false;

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

                menuOpen = false;

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


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

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
                link.getAttribute("href");


              if (
                !targetId ||
                targetId === "#"
              ) {
                return;
              }


              const target =
                document.querySelector(
                  targetId
                );


              if (!target) {
                return;
              }


              event.preventDefault();


              target.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }
          );

        }
      );


    /* =====================================================
       RAYA GULA — SOFT PALM SUGAR SCROLL
       ===================================================== */

    initSugarScroll();


    /* =====================================================
       DEBUG
       ===================================================== */

    console.log(
      "Raya Gula website initialized."
    );

  }
);


/* =========================================================
   SOFT PALM SUGAR SCROLL EFFECT
   ========================================================= */

function initSugarScroll() {

  "use strict";


  /* -------------------------------------------------------
     CHECK BROWSER SUPPORT
     ------------------------------------------------------- */

  if (
    !document.body ||
    !window.addEventListener
  ) {
    return;
  }


  /* -------------------------------------------------------
     CREATE PARTICLE CONTAINER
     ------------------------------------------------------- */

  const sugarLayer =
    document.createElement("div");


  sugarLayer.className =
    "rg-sugar-layer";


  sugarLayer.setAttribute(
    "aria-hidden",
    "true"
  );


  /*
   * Inline safety styling.
   * Jadi efek tetap bekerja walaupun
   * CSS particle belum terbaca.
   */

  sugarLayer.style.position = "fixed";
  sugarLayer.style.left = "0";
  sugarLayer.style.top = "0";
  sugarLayer.style.width = "100vw";
  sugarLayer.style.height = "100vh";
  sugarLayer.style.overflow = "hidden";
  sugarLayer.style.pointerEvents = "none";
  sugarLayer.style.zIndex = "9980";


  document.body.appendChild(
    sugarLayer
  );


  /* -------------------------------------------------------
     DEVICE SETTINGS
     ------------------------------------------------------- */

  let isMobile =
    window.innerWidth <= 768;


  function getMaxParticles() {

    return isMobile ? 14 : 28;

  }


  function getParticleInterval() {

    return isMobile ? 130 : 95;

  }


  /* -------------------------------------------------------
     SCROLL VARIABLES
     ------------------------------------------------------- */

  let lastScrollY =
    window.scrollY;


  let lastParticleTime = 0;


  /* -------------------------------------------------------
     CREATE ONE SUGAR PARTICLE
     ------------------------------------------------------- */

  function createSugarParticle() {

    const maxParticles =
      getMaxParticles();


    if (
      sugarLayer.children.length >=
      maxParticles
    ) {

      return;

    }


    const particle =
      document.createElement("span");


    particle.className =
      "rg-sugar-particle";


    /* ---------------------------------------------------
       RANDOM SIZE
       --------------------------------------------------- */

    const size =
      Math.random() * 4 + 2;


    /* ---------------------------------------------------
       RANDOM HORIZONTAL POSITION
       --------------------------------------------------- */

    const startX =
      Math.random() *
      window.innerWidth;


    /* ---------------------------------------------------
       NATURAL SIDE MOVEMENT
       --------------------------------------------------- */

    const drift =
      (Math.random() - 0.5) * 100;


    const driftEnd =
      (Math.random() - 0.5) * 170;


    /* ---------------------------------------------------
       FALL DURATION
       --------------------------------------------------- */

    const duration =
      Math.random() * 1800 + 2800;


    /* ---------------------------------------------------
       OPACITY
       --------------------------------------------------- */

    const opacity =
      Math.random() * 0.32 + 0.42;


    /* ---------------------------------------------------
       PARTICLE POSITION
       --------------------------------------------------- */

    particle.style.position =
      "absolute";


    particle.style.left =
      startX + "px";


    particle.style.top =
      "-12px";


    particle.style.width =
      size + "px";


    particle.style.height =
      size + "px";


    particle.style.borderRadius =
      "50%";


    /* ---------------------------------------------------
       PALM SUGAR COLOR
       --------------------------------------------------- */

    particle.style.background =
      "radial-gradient(" +
      "circle at 30% 25%, " +
      "#f8e7c5 0%, " +
      "#d1a263 42%, " +
      "#8c5b2d 100%" +
      ")";


    particle.style.boxShadow =
      "0 1px 3px rgba(70,42,18,.22)";


    particle.style.opacity =
      "0";


    particle.style.pointerEvents =
      "none";


    particle.style.willChange =
      "transform, opacity";


    /* ---------------------------------------------------
       ORGANIC SHAPE
       --------------------------------------------------- */

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


    /* ---------------------------------------------------
       APPEND TO SCREEN
       --------------------------------------------------- */

    sugarLayer.appendChild(
      particle
    );


    /* ---------------------------------------------------
       WEB ANIMATION
       --------------------------------------------------- */

    if (
      typeof particle.animate ===
      "function"
    ) {

      const animation =
        particle.animate(

          [

            /* START */

            {
              transform:
                "translate3d(0,-15px,0) rotate(0deg)",
              opacity: 0
            },


            /* APPEAR */

            {
              transform:
                "translate3d(" +
                (drift * 0.15) +
                "px,15vh,0) rotate(90deg)",
              opacity: opacity
            },


            /* MIDDLE */

            {
              transform:
                "translate3d(" +
                drift +
                "px,52vh,0) rotate(220deg)",
              opacity: opacity
            },


            /* END */

            {
              transform:
                "translate3d(" +
                driftEnd +
                "px,110vh,0) rotate(420deg)",
              opacity: 0
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


    } else {

      /*
       * Fallback untuk browser lama
       */

      particle.style.transition =
        "opacity 0.3s ease";

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


  /* -------------------------------------------------------
     SCROLL HANDLER
     ------------------------------------------------------- */

  function handleSugarScroll() {

    const currentY =
      window.scrollY;


    /*
     * Hanya aktif ketika halaman
     * bergerak ke bawah.
     */

    if (
      currentY <= lastScrollY
    ) {

      lastScrollY =
        currentY;

      return;

    }


    lastScrollY =
      currentY;


    /* ---------------------------------------------------
       THROTTLE
       --------------------------------------------------- */

    const now =
      performance.now();


    if (
      now - lastParticleTime <
      getParticleInterval()
    ) {

      return;

    }


    lastParticleTime =
      now;


    /* ---------------------------------------------------
       CREATE PARTICLES
       --------------------------------------------------- */

    createSugarParticle();


    /*
     * Sesekali buat butiran kedua
     * agar jatuhnya lebih natural.
     */

    if (
      Math.random() > 0.68
    ) {

      setTimeout(
        function () {

          createSugarParticle();

        },
        40
      );

    }

  }


  /* -------------------------------------------------------
     LISTEN TO SCROLL
     ------------------------------------------------------- */

  window.addEventListener(
    "scroll",
    handleSugarScroll,
    {
      passive: true
    }
  );


  /* -------------------------------------------------------
     RESIZE
     ------------------------------------------------------- */

  window.addEventListener(
    "resize",
    function () {

      isMobile =
        window.innerWidth <= 768;


      lastScrollY =
        window.scrollY;

    },
    {
      passive: true
    }
  );


  /* -------------------------------------------------------
     DEBUG
     ------------------------------------------------------- */

  console.log(
    "Raya Gula sugar scroll effect initialized."
  );

}
