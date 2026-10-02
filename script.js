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
