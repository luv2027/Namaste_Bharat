import {test, expect} from "@playwright/test";
import { UI_URL } from "./auth.spec";
import path from "path";


test.beforeEach(async({page} ) => {
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
});

test("should allow user to add a hotel", async({page}) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name = "name"]').fill("Test Hotel");

  await page.locator('[name = "city"]').fill("Test city");
  
  await page.locator('[name = "country"]').fill("Test country");
  
  await page.locator('[name = "description"]').fill("Test desciption");
  
  await page.locator('[name = "pricePerNight"]').fill("100");
  
  await page.selectOption('select[name = "starRating"]', "3");
  
  await page.getByText("Luxury").click();
  
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  
  await page.locator('[name = "adultCount"]').fill("2");
  await page.locator('[name = "childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpeg"), 
    path.join(__dirname, "files", "2.jpeg"),
    path.join(__dirname, "files", "3.jpeg"),
  ]);

  await page.getByRole("button", {name: "Save"}).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();
})

test("should display hotels", async({page}) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Dublin Getaways")).toBeVisible();

  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();

  await expect(page.getByText("Dublin, Ireland")).toBeVisible();

  await expect(page.getByText("All Inclusive")).toBeVisible();

  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
})

test("should edit hotel", async({page}) => {
  await page.goto(`${UI_URL}my-hotels`);

  // await page.getByRole("button", {name: "View Detail"}).click();

  // await page.waitForSelector('[name = "name"]', {state: "attached"})
  // await expect(page.locator('[name = "name"]')).toHaveValue('Dublin Getaways');

  // await page.locator('[name = "name"]').fill("Dublin Getaways UPDATED");

  // await page.getByRole("button", {name: "Save"}).click();

  // await expect(page.getByText("Hotel Saved!")).toBeVisible();

});