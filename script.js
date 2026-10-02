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
     REDUCED MOTION
     ------------------------------------------------------- */

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {
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


  document.body.appendChild(
    sugarLayer
  );


  /* -------------------------------------------------------
     SETTINGS
     ------------------------------------------------------- */

  const isMobile =
    window.innerWidth <= 768;


  const maxParticles =
    isMobile ? 12 : 24;


  const particleInterval =
    isMobile ? 150 : 115;


  let lastScrollY =
    window.scrollY;


  let lastParticleTime = 0;


  /* -------------------------------------------------------
     CREATE SUGAR PARTICLE
     ------------------------------------------------------- */

  function createSugarParticle() {

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
      Math.random() * 3.5 + 2;


    /* ---------------------------------------------------
       RANDOM START POSITION
       --------------------------------------------------- */

    const startX =
      Math.random() *
      window.innerWidth;


    /* ---------------------------------------------------
       NATURAL SIDEWAYS MOVEMENT
       --------------------------------------------------- */

    const drift =
      (Math.random() - 0.5) * 70;


    const driftEnd =
      (Math.random() - 0.5) * 130;


    /* ---------------------------------------------------
       FALL SPEED
       --------------------------------------------------- */

    const duration =
      Math.random() * 1.8 + 2.7;


    /* ---------------------------------------------------
       SOFT OPACITY
       --------------------------------------------------- */

    const opacity =
      Math.random() * 0.28 + 0.28;


    /* ---------------------------------------------------
       CSS VARIABLES
       --------------------------------------------------- */

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


    /* ---------------------------------------------------
       ORGANIC SHAPE
       --------------------------------------------------- */

    const r1 =
      40 + Math.random() * 20;

    const r2 =
      40 + Math.random() * 20;

    const r3 =
      40 + Math.random() * 20;

    const r4 =
      40 + Math.random() * 20;


    particle.style.borderRadius =
      `${r1}% ${r2}% ${r3}% ${r4}%`;


    /* ---------------------------------------------------
       RANDOM ROTATION
       --------------------------------------------------- */

    particle.style.setProperty(
      "--rotation",
      `${Math.random() * 360}deg`
    );


    sugarLayer.appendChild(
      particle
    );


    /* ---------------------------------------------------
       REMOVE AFTER ANIMATION
       --------------------------------------------------- */

    particle.addEventListener(
      "animationend",
      function () {

        particle.remove();

      },
      {
        once: true
      }
    );

  }


  /* -------------------------------------------------------
     SCROLL HANDLER
     ------------------------------------------------------- */

  function handleSugarScroll() {

    const currentY =
      window.scrollY;


    /* -----------------------------------------------
       ONLY WHEN SCROLLING DOWN
       ----------------------------------------------- */

    if (
      currentY <= lastScrollY
    ) {

      lastScrollY =
        currentY;

      return;
    }


    lastScrollY =
      currentY;


    /* -----------------------------------------------
       THROTTLE
       ----------------------------------------------- */

    const now =
      performance.now();


    if (
      now - lastParticleTime <
      particleInterval
    ) {

      return;
    }


    lastParticleTime =
      now;


    /* -----------------------------------------------
       CREATE 1 PARTICLE
       ----------------------------------------------- */

    createSugarParticle();


    /* -----------------------------------------------
       OCCASIONALLY CREATE A SECOND
       ----------------------------------------------- */

    if (
      !isMobile &&
      Math.random() > 0.78
    ) {

      createSugarParticle();

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
     RESIZE SAFETY
     ------------------------------------------------------- */

  window.addEventListener(
    "resize",
    function () {

      lastScrollY =
        window.scrollY;

    },
    {
      passive: true
    }
  );


  console.log(
    "Raya Gula sugar scroll effect initialized."
  );

}
