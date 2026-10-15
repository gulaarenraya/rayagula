
# Versi 3 — Sertifikasi, spesifikasi, formulir
- Baru: company-data.js (satu file data buyer) dan rg-docs.js (menampilkan data ke halaman). Lihat PANDUAN-ISI-DATA.md.
- sertifikasi.html dan en/sertifikasi.html dibuat ulang: tiga kartu sertifikat (Halal, Organik, SNI) dengan nomor, lembaga, cakupan, masa berlaku, tombol unduh/minta salinan, cara verifikasi (BPJPH), daftar dokumen untuk buyer. Dua bahasa (ID/EN).
- export.html dan en/export.html: tabel perusahaan dan spesifikasi kini dari data; teks "to be confirmed" diganti "Tersedia atas permintaan".
- Formulir inquiry: kirim lewat WhatsApp (pesan terisi otomatis) atau email, bukan hanya mailto. Opsi formEndpoint untuk Formspree.
- Perbaikan: tag favicon rusak di en/export.html; bahasa awal halaman root = Indonesia, /en = Inggris; footer dua bahasa.


# Versi 2 (berdasarkan rayagula-main (2).zip)
- Dasar: file yang Anda unggah terakhir. Pengaturan bagian "Tentang" (crop gambar) di style.css tetap dipertahankan.
- Hero slide 2: tampil utuh di semua ukuran (360-1920 px), tidak tertutup header, tidak terpotong.
- Hero slide 1 di HP: gambar khusus HP (hero-raya-gula-01-mobile.webp) + teks gelap di area kosong atas, tidak lagi menimpa produk.
- Hero slide 1 di tablet (768-900 px): lebar teks dibatasi supaya tidak menyentuh produk.
- Tautan "Tentang Raya Gula" di slide 1 sekarang terbaca (sebelumnya putih di atas latar terang).
- Tombol panah hero dipindah ke bawah, mengapit titik indikator, tidak lagi menutupi botol.
- Tepi kiri konten antar bagian disejajarkan (Tentang, Proses, Produk, Journal, CTA, Kontak) pada lebar konten 1240 px.

# Perubahan (perbaikan website Raya Gula)

HERO
- Slide 2 tampil utuh: hero sekarang diberi jarak sebesar tinggi header (header fixed menutupi bagian atas gambar, termasuk tutup botol).
- Hero tidak lagi kolaps (tinggi 0) di tablet 768-900 px. Rasio hero: 1920:900 (laptop/tablet), 4:5 (HP).
- Gambar mobile slide 2 dan 3 dipakai sampai lebar 767 px (sebelumnya 900 px, tidak cocok dengan rasio hero).
- Hanya slide 1 memakai <h1>; slide 2 dan 3 memakai <h2> (index.html dan en/index.html).

BUG
- 11 artikel di en/articles: jalur logo, foto proses, dan gambar hero diperbaiki (/logo.png, /images/...).
- en/index.html: gambar mobile hero slide 2 dan 3 memakai jalur dari root.
- script.js: ikon tombol melayang memakai jalur dari root (sebelumnya rusak di halaman /en).
- en/the-origin.html: jalur gambar banner diperbaiki.
- Label "THE ORIGIN" tidak lagi membuat halaman bisa digeser ke samping di HP.

SEO
- Canonical ditambahkan di 6 halaman, hreflang di 11 halaman (pasangan ID <-> EN).

PERFORMA
- Gambar PNG/JPG berat diubah ke WebP (21 MB -> 4 MB). Total situs 24 MB -> 7 MB.
- Pratinjau link (og:image) memakai file JPG kecil bernama *-og.jpg.
- Atribut width/height dan lazy-load ditambahkan pada gambar di luar hero; fetchpriority="high" pada gambar hero slide 1.

PEMBERSIHAN
- Dihapus: file duplikat di articles/ (nama dengan spasi dan tanpa ekstensi), images/products/temp, README.md, about-origin.png (tidak dipakai), dan file gambar asli yang sudah diganti WebP.
- README.txt diperbarui.
