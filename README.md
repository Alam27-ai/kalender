# Konversi Masehi ⇄ Hijriah + Weton

Kalkulator satu halaman (`index.html`), jalan di browser tanpa internet.

- Hari dan weton dihitung pasti lewat Julian Day (JD).
- Tanggal Hijriah memakai kalender hisab urfi (tabular): perkiraan, bisa beda 1–2 hari dari kalender resmi Kemenag.
- Rentang 1900–2100 M (1317–1524 H).
- Tombol "Lihat cara hitungnya" menampilkan langkah hitung.

## Bulan Saat Aku Lahir (`bulan.html`)

Halaman edukasi anak, juga jalan offline:

- Masukkan nama dan tanggal lahir, lihat bentuk bulan malam itu, tanggal Hijriah, dan weton.
- Kartu gambar 1080×1350 yang bisa dibagikan ke WhatsApp atau disimpan.
- Penggeser hari untuk melihat fase bulan mengikuti tanggal Hijriah.
- Tabel 1 Ramadan beberapa tahun ke depan (maju ±11 hari) dan kuis 4 soal.
- Fase bulan memakai bulan sinodis rata-rata (29,53 hari), meleset sekitar setengah hari.
- Isi `LINK_PAKET` di awal skrip dengan link toko atau wa.me untuk tombol Paket Ramadan Anak.

Dibuat oleh Langit Cilik.

## Paket Ramadan Anak (`paket-ramadan/`)

Jurnal Ramadan anak siap cetak, A4, 39 halaman: sampul, petunjuk orang tua, target, peta 30 hari,
lembar pengamatan bulan, 30 halaman harian (bentuk bulan perkiraan + fakta), cari kata, lencana, sertifikat.

- `node paket-ramadan/buat-pdf.js` membuat `Jurnal-Ramadan-Langit-Cilik.pdf` dan gambar `pratinjau/` untuk toko.
- `node paket-ramadan/buat-pdf.js Aisyah` membuat versi personal dengan nama anak di sampul dan sertifikat.
- Ganti tahun dengan membuka `jurnal.html?tahun=1449`.
- Font Baloo 2 dan Nunito (SIL Open Font License) ada di `paket-ramadan/font/`.
