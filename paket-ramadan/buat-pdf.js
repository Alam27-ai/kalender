// Buat PDF jurnal dan gambar pratinjau untuk toko.
// Pakai: node paket-ramadan/buat-pdf.js [--en] [nama anak]
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const args = process.argv.slice(2), en = args.includes("--en"), nama = args.filter(a => a !== "--en")[0] || "";
  const dir = __dirname, q = new URLSearchParams();
  if (nama) q.set("nama", nama);
  if (en) q.set("lang", "en");
  const url = "file://" + path.join(dir, "jurnal.html") + (q.size ? "?" + q : "");
  const dasar = en ? "Ramadan-Journal" : "Jurnal-Ramadan";
  const keluar = path.join(dir, `${dasar}-${nama ? nama.replace(/\W+/g, "-") : "Langit-Cilik"}.pdf`);
  const b = await chromium.launch(), p = await b.newPage();
  await p.goto(url);
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: keluar, preferCSSPageSize: true, printBackground: true });
  console.log("PDF:", keluar, "-", await p.locator(".hal").count(), "halaman");

  if (!nama) {
    // Pratinjau: sampul, peta 30 hari, pengamatan bulan, hari ke-1, hari ke-15, lencana.
    const folder = path.join(dir, "pratinjau", en ? "en" : "");
    fs.mkdirSync(folder, { recursive: true });
    await p.setViewportSize({ width: 794, height: 1123 });
    for (const [i, n] of [[0, "1-sampul"], [3, "2-peta"], [4, "3-pengamatan"], [5, "4-hari-1"], [19, "5-hari-15"], [36, "6-lencana"]])
      await p.locator(".hal").nth(i).screenshot({ path: path.join(folder, n + ".png") });
  }
  await b.close();
})();
