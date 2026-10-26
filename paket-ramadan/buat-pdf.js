// Buat PDF jurnal dan gambar pratinjau untuk toko.
// Pakai: node paket-ramadan/buat-pdf.js [nama anak]
const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const nama = process.argv[2] || "";
  const dir = __dirname, url = "file://" + path.join(dir, "jurnal.html") + (nama ? `?nama=${encodeURIComponent(nama)}` : "");
  const keluar = path.join(dir, nama ? `Jurnal-Ramadan-${nama.replace(/\W+/g, "-")}.pdf` : "Jurnal-Ramadan-Langit-Cilik.pdf");
  const b = await chromium.launch(), p = await b.newPage();
  await p.goto(url);
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: keluar, preferCSSPageSize: true, printBackground: true });
  console.log("PDF:", keluar, "-", await p.locator(".hal").count(), "halaman");

  if (!nama) {
    // Pratinjau: sampul, peta 30 hari, pengamatan bulan, hari ke-1, hari ke-15, lencana.
    await p.setViewportSize({ width: 794, height: 1123 });
    for (const [i, n] of [[0, "1-sampul"], [3, "2-peta"], [4, "3-pengamatan"], [5, "4-hari-1"], [19, "5-hari-15"], [36, "6-lencana"]])
      await p.locator(".hal").nth(i).screenshot({ path: path.join(dir, "pratinjau", n + ".png") });
  }
  await b.close();
})();
