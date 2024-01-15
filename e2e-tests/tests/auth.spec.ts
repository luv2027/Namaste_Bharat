import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

//This is the test for the sign in page
test('should not allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", {name: "Sign in"}).click();

  await expect(page.getByRole("heading", {name:"Sign in"})).toBeVisible();

  //find email and write the email
  await page.locator("[name = email]").fill("1@1.com")

  await page.locator("[name = password]").fill("password123");

  //not click login button
  await page.getByRole("button", {name: "Login"}).click();

  //we want toster to popup for loging in 

  await expect(page.getByText("Sign in Success!")).toBeVisible();

  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();

});

//This is the test for the sign up page
test("should allow user to register", async({page}) => {

  //for random email everytime for the test
  const testEmail = `test_register_${Math.floor(Math.random() *90000) + 10000}@test.com`
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign In"}).click();
 
  await expect(page.getByRole("heading", {name:"Sign in"})).toBeVisible();

  await page.getByRole("link", {name: "Create an account here"}).click();

  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();

  await page.locator("[name = firstName]").fill("test_firstName");
  await page.locator("[name = lastName]").fill("test_lastName");
  await page.locator("[name = email]").fill(testEmail);
  await page.locator("[name = password]").fill("password123");
  await page.locator("[name = confirmPassword]").fill("password123");

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();

})