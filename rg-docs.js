/* Render data buyer (company-data.js) ke halaman Sertifikasi dan Export; formulir inquiry. */
(function(){
  var D=window.RG_DATA||{};
  var LBL={
    request:{id:'Tersedia atas permintaan',en:'Available on request'},
    number:{id:'Nomor sertifikat',en:'Certificate number'},issuer:{id:'Lembaga penerbit',en:'Issuing body'},
    holder:{id:'Pemegang sertifikat',en:'Certificate holder'},scope:{id:'Cakupan produk',en:'Product scope'},
    validUntil:{id:'Berlaku sampai',en:'Valid until'},standard:{id:'Standar',en:'Standard'},
    download:{id:'Unduh salinan (PDF)',en:'Download copy (PDF)'},ask:{id:'Minta salinan via WhatsApp',en:'Request copy via WhatsApp'},
    bpjph:{id:'Cek di BPJPH ↗',en:'Check on BPJPH ↗'},listed:{id:'Data tercantum',en:'Details listed'},onreq:{id:'Salinan atas permintaan',en:'Copy on request'},
    legalName:{id:'Nama badan usaha',en:'Legal business name'},address:{id:'Alamat usaha / produksi',en:'Business / production address'},
    capacity:{id:'Kapasitas produksi bulanan',en:'Monthly production capacity'},markets:{id:'Pasar',en:'Markets'},privateLabel:{id:'Private label',en:'Private label'},
    productTypes:{id:'Jenis produk',en:'Product types'},composition:{id:'Komposisi',en:'Composition'},moisture:{id:'Kadar air',en:'Moisture content'},
    color:{id:'Warna dan tampilan',en:'Color & appearance'},granuleSize:{id:'Ukuran butir (gula semut)',en:'Granule size (granulated)'},
    shelfLife:{id:'Masa simpan',en:'Shelf life'},packaging:{id:'Kemasan',en:'Packaging'},moq:{id:'MOQ (pesanan minimum)',en:'MOQ (minimum order)'},
    hsCode:{id:'Kode HS',en:'HS code'},incoterms:{id:'Incoterms / pengiriman',en:'Incoterms / shipping'},leadTime:{id:'Waktu produksi',en:'Lead time'},
    payment:{id:'Pembayaran',en:'Payment terms'},certs:{id:'Sertifikasi',en:'Certifications'},coa:{id:'Certificate of Analysis (CoA)',en:'Certificate of Analysis (CoA)'}
  };
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function bi(o){return '<span class="lang-id">'+esc(o.id)+'</span><span class="lang-en">'+esc(o.en)+'</span>'}
  function val(v){
    if(v===undefined||v===null||v==='')return '<span class="rg-empty">'+bi(LBL.request)+'</span>';
    if(typeof v==='object')return bi(v);
    return esc(v);
  }
  function wa(text){return 'https://wa.me/'+(D.whatsapp||'')+'?text='+encodeURIComponent(text)}
  function css(){
    var s=document.createElement('style');
    s.textContent='.rg-empty{color:#9a8878;font-style:italic}.cert-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:22px}'
    +'.cert{display:flex;flex-direction:column}.cert .badge{align-self:flex-start;font-size:10px;letter-spacing:.08em;font-weight:700;padding:4px 9px;margin-bottom:6px;background:#f5eee2;color:#7a5a24}'
    +'.cert .badge.ok{background:#e8f1e6;color:#2f6b3a}.cert dl{margin:12px 0 16px;font-size:12.5px}.cert dt{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#9b7025;font-weight:700;margin-top:10px}'
    +'.cert dd{margin:2px 0 0;color:#4a3024;word-break:break-word}.cert .cact{margin-top:auto;display:flex;gap:8px;flex-wrap:wrap}.cert .cact .btn{padding:10px 14px;font-size:11px}'
    +'.docs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:22px}.docs .card{padding:20px}.docs .card h3{font-size:19px}'
    +'@media(max-width:900px){.cert-grid,.docs{grid-template-columns:1fr}}';
    document.head.appendChild(s);
  }
  function certs(el){
    var out='';
    (D.certificates||[]).forEach(function(c){
      var rows=[['number',c.number],['issuer',c.issuer],['holder',c.holder],['scope',c.scope],['validUntil',c.validUntil]];
      if(c.standard!==undefined)rows.splice(1,0,['standard',c.standard]);
      var has=!!c.number;
      var dl=rows.map(function(r){return '<dt>'+bi(LBL[r[0]])+'</dt><dd>'+val(r[1])+'</dd>'}).join('');
      var ask=wa('Halo Raya Gula, saya ingin meminta salinan '+c.name.id+' / I would like a copy of the '+c.name.en+'.');
      var act=c.file?'<a class="btn primary" href="'+esc(c.file)+'" target="_blank" rel="noopener">'+bi(LBL.download)+'</a>'
                    :'<a class="btn primary" href="'+ask+'" target="_blank" rel="noopener noreferrer">'+bi(LBL.ask)+'</a>';
      if(c.key==='halal')act+='<a class="btn" href="https://bpjph.halal.go.id/cari/sertifikat" target="_blank" rel="noopener noreferrer">'+bi(LBL.bpjph)+'</a>';
      out+='<article class="card cert"><span class="badge'+(has?' ok':'')+'">'+bi(has?LBL.listed:LBL.onreq)+'</span><h3>'+bi(c.name)+'</h3><dl>'+dl+'</dl><div class="cact">'+act+'</div></article>';
    });
    el.innerHTML='<div class="cert-grid">'+out+'</div>';
  }
  function table(el,keys,src){
    el.innerHTML='<table class="spec"><tbody>'+keys.map(function(k){
      var v=src[k];
      if(k==='certs'){
        v=(D.certificates||[]).map(function(c){return bi({id:c.name.id.replace('Sertifikat ','')+(c.number?' ('+c.number+')':''),en:c.name.en.replace(' Certificate','')+(c.number?' ('+c.number+')':'')})}).join(', ');
        return '<tr><th>'+bi(LBL.certs)+'</th><td>'+v+' <a href="sertifikasi.html" style="text-decoration:underline">'+bi({id:'Lihat detail',en:'View details'})+'</a></td></tr>';
      }
      return '<tr><th>'+bi(LBL[k])+'</th><td>'+val(v)+'</td></tr>';
    }).join('')+'</tbody></table>';
  }
  function tags(){
    document.querySelectorAll('[data-rg-tag]').forEach(function(e){var t=(D.products||{})[e.getAttribute('data-rg-tag')];e.innerHTML=val(t)});
  }
  function form(){
    var f=document.getElementById('exportForm');if(!f)return;
    var status=document.getElementById('rgFormStatus');
    if(D.formEndpoint){var sb=f.querySelector('button[type=submit]');if(sb)sb.innerHTML='<span class="lang-id">Kirim inquiry</span><span class="lang-en">Send inquiry</span>'}
    function lang(){return document.documentElement.lang==='id'?'id':'en'}
    function text(f){var d=new FormData(f);return ['Export & Wholesale Inquiry','','Name: '+d.get('name'),'Company: '+d.get('company'),'Business email: '+d.get('email'),'Country / destination: '+d.get('country'),'Product: '+d.get('product'),'Estimated monthly order volume: '+(d.get('volume')||'Not specified'),'Private label: '+(d.get('privateLabel')||'Not specified'),'','Requirements / message: '+d.get('message')].join('\n')}
    function say(m){if(status){status.textContent=m}}
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(D.formEndpoint){
        fetch(D.formEndpoint,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}}).then(function(r){
          if(!r.ok)throw 0;f.reset();say(lang()==='id'?'Terima kasih, inquiry Anda sudah terkirim. Tim kami akan menghubungi Anda.':'Thank you, your inquiry has been sent. Our team will contact you.');
        }).catch(function(){say(lang()==='id'?'Gagal mengirim. Silakan kirim lewat WhatsApp atau email di bawah.':'Could not send. Please use WhatsApp or email below.')});
      }else{
        window.open(wa(text(f)),'_blank','noopener');
        say(lang()==='id'?'WhatsApp dibuka dengan pesan yang sudah terisi. Tekan kirim di WhatsApp untuk menyelesaikan.':'WhatsApp opened with your message prefilled. Press send in WhatsApp to complete.');
      }
    });
    var em=document.getElementById('rgEmailBtn');
    if(em)em.addEventListener('click',function(){
      if(!f.reportValidity())return;var d=new FormData(f);
      location.href='mailto:'+(D.email||'hello@rayagula.com')+'?subject='+encodeURIComponent('Export & Wholesale Inquiry - '+d.get('company'))+'&body='+encodeURIComponent(text(f));
    });
  }
  css();
  var c=document.querySelector('[data-rg-certs]');if(c)certs(c);
  var co=document.querySelector('[data-rg-company]');if(co)table(co,['legalName','address','capacity','markets','privateLabel'],D.company||{});
  var sp=document.querySelector('[data-rg-specs]');if(sp)table(sp,['productTypes','composition','moisture','color','granuleSize','shelfLife','packaging','moq','capacity','privateLabel','hsCode','incoterms','leadTime','payment','certs','coa'],Object.assign({},D.specs,{capacity:(D.company||{}).capacity,privateLabel:(D.company||{}).privateLabel}));
  tags();form();
})();
