const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');


// MOBILE NAVIGATION
if (menu && nav) {

  menu.addEventListener('click', () => {

    const open = nav.classList.toggle('open');

    menu.setAttribute('aria-expanded', open);

    // ubah icon hamburger
    menu.innerHTML = open ? '✕' : '☰';

  });


  // klik area luar menu → tutup
  document.addEventListener('click', (event) => {

    if (
      !nav.contains(event.target) &&
      !menu.contains(event.target)
    ) {

      nav.classList.remove('open');

      menu.setAttribute(
        'aria-expanded',
        false
      );

      menu.innerHTML = '☰';

    }

  });


  // klik link menu → tutup otomatis
  document
    .querySelectorAll('.nav a')
    .forEach(link => {

      link.addEventListener('click', () => {

        nav.classList.remove('open');

        menu.setAttribute(
          'aria-expanded',
          false
        );

        menu.innerHTML = '☰';

      });

    });

}



// SCROLL REVEAL ANIMATION

const observer = new IntersectionObserver(
(entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add('visible');

    }

  });

},
{
  threshold:0.12
});


document
.querySelectorAll('.reveal')
.forEach(el=>observer.observe(el));




// MARKETPLACE CONFIG

// Isi link resmi toko jika sudah tersedia

const MARKETPLACE_URLS = {

  shopee: "",

  tiktok: ""

};



document
.querySelectorAll("[data-marketplace]")
.forEach(el=>{


  el.addEventListener("click",(e)=>{


    const key = el.dataset.marketplace;

    const url = MARKETPLACE_URLS[key];


    if(!url){

      e.preventDefault();


      const label =
        key === "shopee"
        ? "Shopee"
        : "TikTok Shop";


      alert(
        `${label} Raya Gula segera hadir. Link resmi akan ditambahkan setelah akun toko dibuat.`
      );


      return;

    }


    el.href = url;

    el.target = "_blank";

    el.rel = "noopener";


  });


});
