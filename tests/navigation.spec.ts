import { test, expect } from "@playwright/test";

test.describe("Pengujian Navigasi Lumora Creation", () => {
  // Fungsi ini akan berjalan sebelum setiap test (mengurangi pengulangan kode)
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("cek navigasi dasar lumora creation", async ({ page }) => {
    test.setTimeout(30000); // Timeout 30 detik untuk test ini

    await page.waitForTimeout(1000); // Tunggu loading halaman
    await expect(page).toHaveTitle(/Lumora/);

    await page.waitForTimeout(500);
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-beranda.png" });
  });

  test("cek klik navbar link produk", async ({ page }) => {
    test.setTimeout(30000); // Timeout 30 detik untuk test ini

    await page.waitForTimeout(1000); // Tunggu halaman siap

    // Mencari dan klik link "Produk"
    console.log("🔍 Mencari link Produk di navbar...");
    await page.waitForTimeout(500);
    await page.locator('nav >> a[href="#product"]').first().click();

    console.log("⏳ Menunggu scroll ke section Produk...");
    await page.waitForTimeout(2000); // Tunggu lebih lama untuk observe scroll

    // Playwright otomatis menunggu scroll selesai, langsung cek URL
    await expect(page).toHaveURL(/#product/);
    console.log("✅ Berhasil ke section Produk!");

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-produk.png" });
  });

  test("cek klik navbar link tentang", async ({ page }) => {
    test.setTimeout(30000); // Timeout 30 detik untuk test ini

    await page.waitForTimeout(1000); // Tunggu halaman siap

    // Mencari dan klik link "Tentang"
    console.log("🔍 Mencari link Tentang di navbar...");
    await page.waitForTimeout(500);
    await page.locator('nav >> a[href="#about"]').first().click();

    console.log("⏳ Menunggu scroll ke section Tentang...");
    await page.waitForTimeout(2000); // Tunggu lebih lama untuk observe scroll

    await expect(page).toHaveURL(/#about/);
    console.log("✅ Berhasil ke section Tentang!");

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-tentang.png" });
  });

  test("cek klik navbar link perbandingan", async ({ page }) => {
    test.setTimeout(30000); // Timeout 30 detik untuk test ini

    await page.waitForTimeout(1000); // Tunggu halaman siap

    // Mencari dan klik link "Perbandingan"
    console.log("🔍 Mencari link Perbandingan di navbar...");
    await page.waitForTimeout(500);
    await page.locator('nav >> a[href="#differentation"]').first().click();

    console.log("⏳ Menunggu scroll ke section Perbandingan...");
    await page.waitForTimeout(2000); // Tunggu lebih lama untuk observe scroll

    await expect(page).toHaveURL(/#differentation/);
    console.log("✅ Berhasil ke section Perbandingan!");

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-perbandingan.png" });
  });

  test("cek klik navbar link manfaat", async ({ page }) => {
    test.setTimeout(30000); // Timeout 30 detik untuk test ini

    await page.waitForTimeout(1000); // Tunggu halaman siap

    // Mencari dan klik link "Manfaat"
    console.log("🔍 Mencari link Manfaat di navbar...");
    await page.waitForTimeout(500);
    await page.locator('nav >> a[href="#impact"]').first().click();

    console.log("⏳ Menunggu scroll ke section Manfaat...");
    await page.waitForTimeout(2000); // Tunggu lebih lama untuk observe scroll

    await expect(page).toHaveURL(/#impact/);
    console.log("✅ Berhasil ke section Manfaat!");

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-manfaat.png" });
  });

  test("cek klik logo kembali ke beranda", async ({ page }) => {
    test.setTimeout(30000); // Timeout 30 detik untuk test ini

    await page.waitForTimeout(1000); // Tunggu halaman siap

    // Klik produk dulu untuk pindah posisi
    console.log("🔍 Mencari link Produk untuk pindah posisi...");
    await page.waitForTimeout(500);
    await page.locator('nav >> a[href="#product"]').first().click();

    console.log("⏳ Menunggu scroll ke section Produk...");
    await page.waitForTimeout(2000); // Tunggu lebih lama untuk observe scroll

    // Klik logo (biasanya link ke /)
    console.log("🔍 Mencari logo untuk kembali ke beranda...");
    await page.waitForTimeout(500);
    await page.locator('nav >> a[href="/"]').first().click();

    console.log("⏳ Menunggu navigasi kembali ke beranda...");
    await page.waitForTimeout(2000); // Tunggu lebih lama untuk observe navigasi

    // Pastikan kembali ke URL utama
    await expect(page).toHaveURL("http://localhost:3000/");
    console.log("✅ Berhasil kembali ke beranda!");

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-logo-home.png" });
  });
});
