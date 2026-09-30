const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


// MARKETPLACE CONFIG
// Saat akun resmi Raya Gula sudah dibuat, cukup isi 2 URL berikut.
// Contoh:
// shopee: "https://shopee.co.id/rayagula"
// tiktok: "https://www.tiktok.com/@rayagula/shop"
const MARKETPLACE_URLS = {
  shopee: "",
  tiktok: ""
};

document.querySelectorAll("[data-marketplace]").forEach(el=>{
  el.addEventListener("click",(e)=>{
    const key = el.dataset.marketplace;
    const url = MARKETPLACE_URLS[key];
    if(!url){
      e.preventDefault();
      const label = key === "shopee" ? "Shopee" : "TikTok Shop";
      alert(`${label} Raya Gula segera hadir. Link resmi akan ditambahkan setelah akun toko dibuat.`);
      return;
    }
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener";
  });
});
