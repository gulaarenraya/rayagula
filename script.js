/* =========================================================
   RAYA GULA
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menu =
      document.querySelector(
        ".menu-toggle"
      );

    const nav =
      document.querySelector(
        ".nav"
      );


    function closeMenu() {

      if (!menu || !nav) {
        return;
      }


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


    if (menu && nav) {

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

        }
      );

    }



    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );


    if (
      revealElements.length &&
      "IntersectionObserver" in window
    ) {

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
            threshold: 0.12,

            rootMargin:
              "0px 0px -40px 0px"
          }
        );


      revealElements.forEach(
        function (element) {

          observer.observe(
            element
          );

        }
      );

    } else {

      revealElements.forEach(
        function (element) {

          element.classList.add(
            "visible"
          );

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


      /* -------------------------------------------------
         ICON UTAMA
         ------------------------------------------------- */

      const floatingIcons = [

        {
          src: "logo.png",

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
                link.getAttribute(
                  "href"
                );


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
                behavior:
                  "smooth",

                block:
                  "start"
              });

            }
          );

        }
      );


    /* =====================================================
       DEBUG
       ===================================================== */

    console.log(
      "Raya Gula website initialized."
    );


  }
);
/* =========================================================
   RAYA GULA — SOFT SUGAR SCROLL EFFECT
   ========================================================= */

(function () {

  "use strict";

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;


  /* -------------------------------------------------------
     CREATE PARTICLE LAYER
     ------------------------------------------------------- */

  const sugarLayer = document.createElement("div");

  sugarLayer.className = "rg-sugar-layer";

  sugarLayer.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.appendChild(sugarLayer);


  /* -------------------------------------------------------
     SETTINGS
     ------------------------------------------------------- */

  const isMobile = window.innerWidth <= 768;

  const maxParticles = isMobile ? 18 : 32;

  let lastScrollY = window.scrollY;

  let scrollDirection = "down";

  let lastParticleTime = 0;

  let scrollActive = false;

  let scrollTimeout;


  /* -------------------------------------------------------
     CREATE SUGAR PARTICLE
     ------------------------------------------------------- */

  function createSugarParticle() {

    if (sugarLayer.children.length >= maxParticles) {
      return;
    }

    const particle =
      document.createElement("span");

    particle.className =
      "rg-sugar-particle";


    /* Size */

    const size =
      Math.random() * 4 + 2;


    /* Position */

    const startX =
      Math.random() * window.innerWidth;


    /* Slight horizontal movement */

    const drift =
      (Math.random() - 0.5) * 100;

    const driftEnd =
      (Math.random() - 0.5) * 180;


    /* Animation duration */

    const duration =
      Math.random() * 2.2 + 2.8;


    /* Opacity */

    const opacity =
      Math.random() * 0.35 + 0.35;


    particle.style.setProperty(
      "--size",
      `${size}px`
    );

    particle.style.setProperty(
      "--start-x",
      `${startX}px`
    );

    particle.style.setProperty(
      "--drift",
      `${drift}px`
    );

    particle.style.setProperty(
      "--drift-end",
      `${driftEnd}px`
    );

    particle.style.setProperty(
      "--duration",
      `${duration}s`
    );

    particle.style.setProperty(
      "--opacity",
      opacity
    );


    /* Slight variation */

    particle.style.borderRadius =
      `${40 + Math.random() * 20}% ` +
      `${45 + Math.random() * 15}% ` +
      `${40 + Math.random() * 20}% ` +
      `${45 + Math.random() * 15}%`;


    sugarLayer.appendChild(particle);


    /* Remove after animation */

    particle.addEventListener(
      "animationend",
      function () {
        particle.remove();
      },
      { once: true }
    );

  }


  /* -------------------------------------------------------
     SCROLL DETECTION
     ------------------------------------------------------- */

  function handleScroll() {

    const currentY =
      window.scrollY;


    if (currentY > lastScrollY) {

      scrollDirection = "down";

    } else {

      scrollDirection = "up";

    }


    lastScrollY = currentY;


    /* Only create falling sugar
       when scrolling downward */

    if (scrollDirection !== "down") {
      return;
    }


    scrollActive = true;


    clearTimeout(scrollTimeout);


    scrollTimeout =
      setTimeout(function () {

        scrollActive = false;

      }, 140);


    const now =
      performance.now();


    /* Throttle particle creation */

    if (now - lastParticleTime < 95) {
      return;
    }


    lastParticleTime = now;


    /*
       Create 1–2 particles.
       This keeps the effect elegant
       instead of looking like snow.
    */

    createSugarParticle();


    if (Math.random() > 0.72) {
      createSugarParticle();
    }

  }


  /* -------------------------------------------------------
     PASSIVE SCROLL LISTENER
     ------------------------------------------------------- */

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );


})();
