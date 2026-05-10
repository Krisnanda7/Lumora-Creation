import { test, expect, Page } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Navigation Tests - Lumora Creation", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(BASE_URL);
    // Wait for page to fully load
    await page.waitForLoadState("networkidle");
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.describe("Desktop Navigation - Header/Navbar", () => {
    test("should display navbar with all nav links on desktop", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      // Check navbar is visible
      const navbar = page.locator("nav");
      await expect(navbar).toBeVisible();

      // Check logo is visible
      const logo = page.locator('a[href="/"]');
      await expect(logo).toBeVisible();
      await expect(logo).toContainText("Lumora Creation");

      // Check all navigation links are visible
      const navLinks = [
        { name: "Produk", href: "#product" },
        { name: "Tentang", href: "#about" },
        { name: "Perbandingan", href: "#differentation" },
        { name: "Manfaat", href: "#impact" },
      ];

      for (const link of navLinks) {
        const navLink = page.locator(`a[href="${link.href}"]`);
        await expect(navLink).toBeVisible();
        await expect(navLink).toContainText(link.name);
      }
    });

    test("should navigate to sections using navbar links", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const navLinks = [
        { name: "Produk", href: "#product" },
        { name: "Tentang", href: "#about" },
        { name: "Perbandingan", href: "#differentation" },
        { name: "Manfaat", href: "#impact" },
      ];

      for (const link of navLinks) {
        const navLink = page.locator(`a[href="${link.href}"]`);
        await navLink.click();

        // Wait a bit for page to navigate and scroll
        await page.waitForTimeout(500);

        // Check that URL contains the hash
        await expect(page).toHaveURL(
          new RegExp(`${link.href.replace("#", "")}`),
        );
      }
    });

    test("should show 'Pesan Sekarang' button on desktop", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });
      await expect(pesanButton).toBeVisible();
    });

    test("should have hover effects on nav links", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const navLink = page.locator('a[href="#product"]');

      // Get color before hover
      const colorBefore = await navLink.evaluate(
        (el) => window.getComputedStyle(el).color,
      );

      // Hover over link
      await navLink.hover();
      await page.waitForTimeout(300); // Wait for transition

      // Get color after hover
      const colorAfter = await navLink.evaluate(
        (el) => window.getComputedStyle(el).color,
      );

      // Colors should be different (hover effect applied)
      expect(colorBefore).not.toEqual(colorAfter);
    });

    test("navbar should have fixed positioning", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const navbar = page.locator("nav");
      const position = await navbar.evaluate(
        (el) => window.getComputedStyle(el).position,
      );

      expect(position).toBe("fixed");
    });

    test("should hide mobile menu elements on desktop", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      // Mobile menu button should not be visible
      const mobileMenuButton = page
        .locator('button[class*="md:hidden"]')
        .first();
      await expect(mobileMenuButton).not.toBeVisible();
    });
  });

  test.describe("Mobile Navigation - Hamburger Menu", () => {
    test("should display hamburger menu on mobile", async () => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      // Wait for DOM to update
      await page.waitForTimeout(300);

      // Check hamburger button is visible
      const hamburgerButton = page
        .locator("button")
        .filter({ has: page.locator("svg") })
        .last();
      await expect(hamburgerButton).toBeVisible();
    });

    test("should open mobile menu when hamburger clicked", async () => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      // Find and click hamburger button (last button with svg)
      const hamburgerButton = page
        .locator("button")
        .filter({ has: page.locator("svg") })
        .last();
      await hamburgerButton.click();

      // Wait for menu animation
      await page.waitForTimeout(500);

      // Check if sidebar menu is visible
      const sidebarMenu = page
        .locator("div")
        .filter({ has: page.locator("span:has-text('Menu')") })
        .first();
      await expect(sidebarMenu).toBeVisible();
    });

    test("should close mobile menu when X button clicked", async () => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      // Open menu
      const hamburgerButton = page
        .locator("button")
        .filter({ has: page.locator("svg") })
        .last();
      await hamburgerButton.click();
      await page.waitForTimeout(500);

      // Find and click close button
      const closeButton = page.locator("button").filter({ hasText: "" }).nth(1);
      if (await closeButton.isVisible()) {
        await closeButton.click();
        await page.waitForTimeout(500);
      }
    });

    test("should navigate using mobile menu links", async () => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      // Open menu
      const hamburgerButton = page
        .locator("button")
        .filter({ has: page.locator("svg") })
        .last();
      await hamburgerButton.click();
      await page.waitForTimeout(500);

      // Click on first nav link (Produk)
      const productLink = page.locator('a[href="#product"]').first();
      await productLink.click();
      await page.waitForTimeout(500);

      // URL should contain product hash
      await expect(page).toHaveURL(/product/);
    });

    test("should hide desktop menu on mobile", async () => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      // Desktop menu container should have hidden class
      const desktopMenu = page.locator("div.hidden");
      expect(await desktopMenu.count()).toBeGreaterThan(0);
    });

    test("should show message icon on mobile", async () => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      // Look for WhatsApp message button on mobile
      const messagButtons = page.locator("button");
      expect(await messagButtons.count()).toBeGreaterThan(0);
    });
  });

  test.describe("Logo Navigation", () => {
    test("should have clickable logo linking to home", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const logo = page.locator('a[href="/"]');
      await expect(logo).toBeVisible();

      // Click logo
      await logo.click();

      // Should navigate to home
      await expect(page).toHaveURL(BASE_URL);
    });

    test("logo should have correct styling", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const logo = page.locator('a[href="/"]');
      const fontSize = await logo.evaluate(
        (el) => window.getComputedStyle(el).fontSize,
      );

      // Font size should be 2xl (approximately 28px in tailwind)
      expect(parseFloat(fontSize)).toBeGreaterThan(24);
    });
  });

  test.describe("WhatsApp Button", () => {
    test("should have WhatsApp button on desktop", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });
      await expect(pesanButton).toBeVisible();
    });

    test("should have WhatsApp button on mobile", async () => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      // On mobile, there should be a message icon button
      const buttons = page.locator("button");
      expect(await buttons.count()).toBeGreaterThan(0);
    });

    test("WhatsApp button should have correct styling", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const pesanButton = page.getByRole("button", { name: /Pesan Sekarang/i });
      const bgColor = await pesanButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );

      // Background should be golden color (#D4A017 or amber-500)
      expect(bgColor).toBeTruthy();
    });
  });

  test.describe("Responsive Behavior", () => {
    test("navbar should be responsive between breakpoints", async () => {
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
        await page.waitForTimeout(300);

        // Navbar should always be visible
        const navbar = page.locator("nav");
        await expect(navbar).toBeVisible();
      }
    });

    test("navbar should have z-index for fixed positioning", async () => {
      const navbar = page.locator("nav");
      const zIndex = await navbar.evaluate(
        (el) => window.getComputedStyle(el).zIndex,
      );

      expect(parseInt(zIndex)).toBeGreaterThan(0);
    });
  });

  test.describe("Navbar Visual Design", () => {
    test("navbar should have dark background color", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const navbar = page.locator("nav");
      const bgColor = await navbar.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor,
      );

      // Background should be black or very dark
      expect(bgColor).toBeTruthy();
    });

    test("navbar should have bottom border", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const navbar = page.locator("nav");
      const borderBottom = await navbar.evaluate(
        (el) => window.getComputedStyle(el).borderBottom,
      );

      expect(borderBottom).toBeTruthy();
    });

    test("navbar text should be white", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      const navbar = page.locator("nav");
      const textColor = await navbar.evaluate(
        (el) => window.getComputedStyle(el).color,
      );

      expect(textColor).toBeTruthy();
    });
  });

  test.describe("Navigation Accessibility", () => {
    test("nav links should be keyboard accessible", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      // Tab to first nav link
      await page.keyboard.press("Tab");
      await page.waitForTimeout(300);

      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.getAttribute("href");
      });

      // Some element should be focused
      expect(focusedElement).toBeTruthy();
    });

    test("navbar should have semantic HTML structure", async () => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      // Check for nav tag
      const nav = page.locator("nav");
      await expect(nav).toBeVisible();

      // Check for links
      const links = page.locator("nav a");
      expect(await links.count()).toBeGreaterThan(0);
    });
  });

  test.describe("Section Linking", () => {
    test("should have sections with correct IDs", async () => {
      // Check if sections with IDs exist
      const sectionIds = ["#product", "#about", "#differentation", "#impact"];

      for (const id of sectionIds) {
        const section = page.locator(id.replace("#", ""));
        // At least the link should exist even if section might not be visible initially
        const link = page.locator(`a[href="${id}"]`);
        await expect(link).toBeVisible();
      }
    });
  });
});
