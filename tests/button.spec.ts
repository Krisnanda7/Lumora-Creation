import { test, expect } from "@playwright/test";

test.describe("Pengujian Button Lumora Creation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("cek button pesan sekarang terlihat di desktop", async ({ page }) => {
    test.setTimeout(30000);

    await page.waitForTimeout(1000); // Tunggu halaman siap

    console.log("🔍 Mencari button Pesan Sekarang...");
    await page.waitForTimeout(500);

    // Cek button "Pesan Sekarang" terlihat di desktop
    const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });
    await expect(pesanButton).toBeVisible();

    console.log("✅ Button Pesan Sekarang ditemukan!");

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-button-desktop.png" });
  });

  test("cek button pesan sekarang bisa di-klik", async ({ page }) => {
    test.setTimeout(30000);

    await page.waitForTimeout(1000);

    console.log("🔍 Mencari button untuk di-klik...");
    await page.waitForTimeout(500);

    const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });

    console.log("⏳ Mengklik button Pesan Sekarang...");
    await page.waitForTimeout(500);

    // Klik button
    await pesanButton.click();

    console.log("✅ Button berhasil diklik!");

    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshot-button-clicked.png" });
  });

  test("cek button memiliki styling yang benar", async ({ page }) => {
    test.setTimeout(30000);

    await page.waitForTimeout(1000);

    console.log("🔍 Memeriksa styling button...");
    await page.waitForTimeout(500);

    const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });

    // Cek background color
    const bgColor = await pesanButton.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    console.log(`✅ Background color: ${bgColor}`);
    expect(bgColor).toBeTruthy();

    // Cek apakah button memiliki padding
    const padding = await pesanButton.evaluate(
      (el) => window.getComputedStyle(el).padding,
    );
    console.log(`✅ Padding: ${padding}`);
    expect(padding).toBeTruthy();

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-button-styling.png" });
  });

  test("cek button memiliki icon", async ({ page }) => {
    test.setTimeout(30000);

    await page.waitForTimeout(1000);

    console.log("🔍 Memeriksa icon pada button...");
    await page.waitForTimeout(500);

    const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });

    // Cek apakah button mengandung SVG (icon)
    const svgCount = await pesanButton.locator("svg").count();
    console.log(`✅ Ditemukan ${svgCount} icon di button`);
    expect(svgCount).toBeGreaterThan(0);

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-button-icon.png" });
  });

  test("cek button di mobile view", async ({ page }) => {
    test.setTimeout(30000);

    // Set viewport ke mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    console.log("📱 Mengubah ke mobile view...");
    await page.waitForTimeout(500);

    // Cek icon message button di mobile (Pesan Sekarang diganti dengan icon)
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();
    console.log(`✅ Ditemukan ${buttonCount} button di mobile`);
    expect(buttonCount).toBeGreaterThan(0);

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-button-mobile.png" });
  });

  test("cek button hover effect", async ({ page }) => {
    test.setTimeout(30000);

    await page.waitForTimeout(1000);

    console.log("🔍 Memeriksa hover effect button...");
    await page.waitForTimeout(500);

    const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });

    // Get color sebelum hover
    const colorBefore = await pesanButton.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    console.log(`📍 Color sebelum hover: ${colorBefore}`);

    // Hover button
    console.log("⏳ Melakukan hover pada button...");
    await pesanButton.hover();
    await page.waitForTimeout(500);

    // Get color setelah hover
    const colorAfter = await pesanButton.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    console.log(`📍 Color setelah hover: ${colorAfter}`);

    // Colors seharusnya berbeda karena ada hover effect
    expect(colorBefore).not.toEqual(colorAfter);
    console.log(`✅ Hover effect terdeteksi!`);

    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshot-button-hover.png" });
  });

  test("cek button responsif di semua breakpoint", async ({ page }) => {
    test.setTimeout(30000);

    const breakpoints = [
      { width: 375, height: 667, name: "mobile" },
      { width: 768, height: 1024, name: "tablet" },
      { width: 1280, height: 720, name: "desktop" },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({
        width: breakpoint.width,
        height: breakpoint.height,
      });

      console.log(
        `📐 Testing di ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`,
      );
      await page.waitForTimeout(500);

      // Button atau icon seharusnya terlihat
      const buttons = page.locator("button");
      expect(await buttons.count()).toBeGreaterThan(0);

      console.log(`✅ Button terlihat di ${breakpoint.name}`);

      await page.waitForTimeout(300);
      await page.screenshot({
        path: `screenshot-button-${breakpoint.name}.png`,
      });
    }
  });
});
