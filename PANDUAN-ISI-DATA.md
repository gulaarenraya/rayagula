# Panduan mengisi data sertifikat dan spesifikasi

Semua data buyer ada di satu file: `company-data.js`. Buka dengan editor teks biasa (Notepad, VS Code).
Halaman Sertifikasi dan Export (versi Indonesia dan Inggris) membacanya otomatis. Tidak perlu mengubah HTML.

## Aturan
1. Isi hanya yang sudah ada dokumennya. Yang dikosongkan ("") tampil sebagai "Tersedia atas permintaan".
2. Teks dua bahasa ditulis seperti ini: `{ id: "12 bulan", en: "12 months" }`. Angka atau kode cukup `"100 kg"`.
3. Jangan menghapus tanda kutip, koma, atau kurung. Setelah diedit, buka halaman untuk memeriksa. Jika kartu atau tabel kosong total, ada tanda baca yang terhapus.

## Sertifikat (bagian `certificates`)
Untuk Halal, Organik, dan SNI isi: `number` (nomor), `issuer` (lembaga penerbit), `holder` (pemegang sertifikat),
`scope` (produk yang tercakup), `validUntil` (berlaku sampai), `file` (PDF), dan khusus Organik/SNI `standard`.
- Upload PDF sertifikat ke folder `docs/` lalu isi `file: "/docs/sertifikat-halal.pdf"`.
  Tombol berubah dari "Minta salinan via WhatsApp" menjadi "Unduh salinan (PDF)".
- Kartu yang nomornya terisi mendapat label hijau "Data tercantum".

## Spesifikasi (bagian `specs`)
Yang masih kosong dan perlu data Anda: `moisture`, `color`, `granuleSize`, `moq`, `hsCode`, `incoterms`, `leadTime`, `payment`, `coa`.
- Kode HS: konfirmasikan dulu dengan forwarder atau bea cukai untuk produk dan negara tujuan.
- Nilai `shelfLife` (12 bulan) dan `capacity` (sekitar 5 ton per bulan) berasal dari informasi perusahaan yang sebelumnya ada di halaman Export. Perbarui bila berubah.

## Formulir inquiry
Standar: inquiry dikirim lewat WhatsApp (pesan terisi otomatis) atau email.
Agar masuk langsung tanpa membuka aplikasi, buat formulir gratis di formspree.io, lalu tempel alamatnya di `formEndpoint`.
