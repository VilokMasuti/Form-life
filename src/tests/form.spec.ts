import { expect, test } from "@playwright/test";

test("user can complete Step 1 and go to Step 2", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.fill('input[name="fullName"]', "Vilok");
  await page.fill('input[name="email"]', "vilok@test.com");
  await page.fill('input[name="phone"]', "9876543210");

  await page.click('button:has-text("Continue")');

  await expect(page.getByText("Experience")).toBeVisible();
});


test("form persists to localStorage after clicking Continue", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.fill('input[name="fullName"]', "Vilok");
  await page.fill('input[name="email"]', "vilok@test.com");
  await page.fill('input[name="phone"]', "9876543210");

  await page.click('button:has-text("Continue")');

  
  const saved = await page.evaluate(() => {
    const raw = localStorage.getItem("job_application_form");
    return raw ? JSON.parse(raw) : null;
  });

  expect(saved).not.toBeNull();
  expect(saved.data.personalInfo.fullName).toBe("Vilok");
  expect(saved.data.personalInfo.email).toBe("vilok@test.com");
});

