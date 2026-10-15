/* ==========================================================================
   RAYA GULA — DATA UNTUK BUYER
   Edit HANYA file ini. Halaman Sertifikasi dan Export (ID + EN) membacanya otomatis.
   - Kolom yang dikosongkan ("") akan tampil sebagai "Tersedia atas permintaan".
   - Teks dua bahasa ditulis { id: "...", en: "..." }.
   - Jangan mengisi data yang belum pasti. Isi hanya yang sudah ada dokumennya.
   ========================================================================== */
window.RG_DATA = {
  whatsapp: "6281211213090",
  email: "hello@rayagula.com",

  /* Opsional: alamat formulir (misalnya dari Formspree: "https://formspree.io/f/xxxxxxx").
     Kosong = formulir mengirim lewat WhatsApp (pesan sudah terisi otomatis). */
  formEndpoint: "",

  company: {
    legalName: "PT Raya Gula Indonesia",
    address: "Jl. Raya Pasar Ciminyak No. 13, RT 003/RW 001, Ciminyak, Kec. Muncang, Kabupaten Lebak, Banten 42364, Indonesia",
    capacity: { id: "Sekitar 5 ton per bulan (pembagian per produk dikonfirmasi saat pemesanan)", en: "Approximately 5 tonnes per month (allocation by product confirmed at order)" },
    markets: { id: "Indonesia dan pasar ekspor", en: "Indonesia and export markets" },
    privateLabel: { id: "Tersedia (desain kemasan dan syarat dibahas saat inquiry)", en: "Available (artwork and conditions discussed at inquiry)" }
  },

  /* ---- SERTIFIKAT: isi dari dokumen sertifikat asli ---- */
  certificates: [
    {
      key: "halal",
      name: { id: "Sertifikat Halal", en: "Halal Certificate" },
      number: "",        // contoh: "ID00110xxxxxxxxxxxx"
      issuer: "",        // contoh: "BPJPH Kementerian Agama RI"
      holder: "",        // nama pemegang sertifikat
      scope: "",         // produk yang tercakup, contoh: "Gula aren semut, cair, cetak"
      validUntil: "",    // contoh: "31 Desember 2028"
      file: ""           // contoh: "/docs/sertifikat-halal.pdf" (unggah PDF ke folder docs)
    },
    {
      key: "organic",
      name: { id: "Sertifikat Organik", en: "Organic Certificate" },
      number: "", issuer: "", holder: "", scope: "", validUntil: "", file: "",
      standard: ""       // contoh: "Organik Indonesia (SNI 6729)", "USDA NOP", "EU Organic"
    },
    {
      key: "sni",
      name: { id: "Sertifikat SNI", en: "SNI Certificate" },
      number: "", issuer: "", holder: "", scope: "", validUntil: "", file: "",
      standard: ""       // nomor SNI produk, contoh: "SNI 3743:2021"
    }
  ],

  /* ---- Keterangan singkat di kartu produk (halaman Export) ---- */
  products: {
    semut: { id: "Retail 500 g; kemasan curah atas permintaan", en: "500 g retail; bulk on request" },
    cair:  { id: "Kemasan botol atau jerigen; ukuran atas permintaan", en: "Bottle or jerrycan; sizes on request" },
    cetak: { id: "Ukuran dan berat atas permintaan", en: "Size and weight on request" }
  },

  /* ---- SPESIFIKASI PRODUK ---- */
  specs: {
    productTypes: { id: "Gula aren semut (butiran), cair, dan cetak", en: "Granulated, liquid, and moulded palm sugar" },
    composition: { id: "100% gula aren dari nira aren, tanpa bahan tambahan", en: "100% palm sugar from palm sap, no additives" },
    moisture: "",        // contoh: "maks. 3% (gula semut)"
    color: "",           // contoh: "Cokelat keemasan"
    granuleSize: "",     // contoh: "Lolos ayakan 20 mesh"
    shelfLife: { id: "12 bulan (sesuai informasi perusahaan; kondisi penyimpanan berlaku)", en: "12 months (per company information; storage conditions apply)" },
    packaging: { id: "Pouch, botol, jerigen, dan karung (ukuran per produk atas permintaan)", en: "Pouch, bottle, jerrycan, and sack (sizes per product on request)" },
    moq: "",             // contoh: "100 kg per pesanan"
    hsCode: "",          // isi setelah dikonfirmasi forwarder / bea cukai
    incoterms: "",       // contoh: "FOB Tanjung Priok / CIF"
    leadTime: "",        // contoh: "14-21 hari kerja setelah pembayaran"
    payment: "",         // contoh: "T/T 30% di muka, 70% sebelum pengiriman"
    coa: ""              // contoh: { id: "Tersedia untuk setiap batch", en: "Available per batch" }
  }
};
