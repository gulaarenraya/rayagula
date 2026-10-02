/* =========================================================
   RAYA GULA
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  function closeMenu() {

    if (!menu || !nav) {
      return;
    }

    nav.classList.remove("active");
    nav.classList.remove("open");

    menu.setAttribute(
      "aria-expanded",
      "false"
    );

    menu.innerHTML = "☰";
  }


  function openMenu() {

    if (!menu || !nav) {
      return;
    }

    nav.classList.add("active");
    nav.classList.add("open");

    menu.setAttribute(
      "aria-expanded",
      "true"
    );

    menu.innerHTML = "✕";
  }


  if (menu && nav) {

    menu.addEventListener("click", function (event) {

      event.stopPropagation();

      const isOpen =
        nav.classList.contains("active") ||
        nav.classList.contains("open");

      if (isOpen) {

        closeMenu();

      } else {

        openMenu();

      }

    });


    /* Close when clicking outside */

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


    /* Close after clicking navigation link */

    nav
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            closeMenu();

          }
        );

      });


    /* Close menu when window becomes desktop */

    window.addEventListener(
      "resize",
      function () {

        if (window.innerWidth > 900) {

          closeMenu();

        }

      }
    );

  }



  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      function (element) {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    /* Fallback for older browsers */

    revealElements.forEach(
      function (element) {

        element.classList.add(
          "visible"
        );

      }
    );

  }



  /* =======================================================
     MARKETPLACE CONFIGURATION
     ======================================================= */

  const MARKETPLACE_URLS = {

    /* Shopee resmi Raya Gula */

    shopee:
      "https://shopee.co.id/rayagula",


    /*
     * TikTok Shop belum diaktifkan.
     *
     * Jika nanti sudah memiliki akun resmi,
     * cukup masukkan URL TikTok Shop di sini.
     */

    tiktok: ""

  };



  /* =======================================================
     MARKETPLACE BUTTON HANDLER
     ======================================================= */

  const marketplaceElements =
    document.querySelectorAll(
      "[data-marketplace]"
    );


  marketplaceElements.forEach(
    function (element) {

      const key =
        element.dataset.marketplace;


      element.addEventListener(
        "click",
        function (event) {

          const url =
            MARKETPLACE_URLS[key];


          /*
           * Jika marketplace belum tersedia
           */

          if (!url) {

            event.preventDefault();


            let label =
              "Marketplace";


            if (key === "tiktok") {

              label =
                "TikTok Shop";

            }


            alert(
              `${label} Raya Gula belum tersedia. Link resmi akan ditambahkan setelah akun toko dibuat.`
            );


            return;

          }


          /*
           * Marketplace tersedia
           */

          element.href =
            url;

          element.target =
            "_blank";

          element.rel =
            "noopener noreferrer";

        }
      );

    }
  );



  /* =======================================================
     FLOATING CONTACT
     ======================================================= */

  const floatingContact =
    document.querySelector(
      ".floating-contact"
    );


  const floatingMain =
    document.querySelector(
      ".floating-main"
    );


  if (
    floatingContact &&
    floatingMain
  ) {


    /* Open / Close */

    floatingMain.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();


        const isOpen =
          floatingContact.classList.toggle(
            "open"
          );


        floatingMain.setAttribute(
          "aria-expanded",
          isOpen
            ? "true"
            : "false"
        );

      }
    );


    /* Close when clicking outside */

    document.addEventListener(
      "click",
      function (event) {

        if (
          !floatingContact.contains(
            event.target
          )
        ) {

          floatingContact.classList.remove(
            "open"
          );


          floatingMain.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );


    /* Close after selecting contact */

    floatingContact
      .querySelectorAll("a")
      .forEach(
        function (link) {

          link.addEventListener(
            "click",
            function () {

              floatingContact.classList.remove(
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



  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

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



  /* =======================================================
     EXTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach(
      function (link) {

        /*
         * Pastikan external link
         * menggunakan rel yang aman.
         */

        const currentRel =
          link.getAttribute("rel") ||
          "";


        if (
          !currentRel.includes(
            "noopener"
          )
        ) {

          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );

        }

      }
    );



  /* =======================================================
     SHOPEE DIRECT LINK
     ======================================================= */

  const shopeeLinks =
    document.querySelectorAll(
      'a[href*="shopee.co.id"]'
    );


  shopeeLinks.forEach(
    function (link) {

      /*
       * Pastikan semua link Shopee
       * menggunakan URL toko terbaru.
       */

      const href =
        link.getAttribute("href") ||
        "";


      if (
        href.includes(
          "shopee.co.id/rayagula"
        )
      ) {

        link.setAttribute(
          "href",
          "https://shopee.co.id/rayagula"
        );

        link.setAttribute(
          "target",
          "_blank"
        );

        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );

      }

    }
  );



  /* =======================================================
     CONSOLE CHECK
     ======================================================= */

  console.log(
    "Raya Gula website initialized."
  );

  console.log(
    "Shopee:",
    MARKETPLACE_URLS.shopee
  );


});
