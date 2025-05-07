import { test, expect, request } from "@playwright/test";
import { generateUser } from "../../utils/fakeUser";

test("should create a user, verify login, and return 200 with success message", async ({
  page,
}) => {
  const createAccountApiUrl = "/api/createAccount";
  const loginApiUrl = "/api/verifyLogin";

  const user = generateUser();
  const password = process.env.PASSWORD || "Password123!";

  // Map the generated user to match the API's expected format
  const apiUser = {
    name: user.name,
    email: user.email,
    password: password,
    title: "Mr", // Default title since it's not in fakeUser
    birth_date: user.dateofBirth.day,
    birth_month: user.dateofBirth.month,
    birth_year: user.dateofBirth.year,
    firstname: user.name,
    lastname: user.lastName,
    company: user.company,
    address1: user.address,
    address2: "", // Not provided in fakeUser
    country: "United States", // Default country since it's not in fakeUser
    zipcode: user.zipcode,
    state: user.state,
    city: user.city,
    mobile_number: user.mobile,
  };

  // Create a new request context
  const apiContext = await request.newContext({
    baseURL: process.env.BASE_URL || "http://automationexercise.com",
  });

  // Set up request interception
  await page.route(createAccountApiUrl, async (route) => {
    // Verify the request payload
    const requestData = await route.request().postData();
    expect(requestData).toContain(user.email);

    // Mock the response
    await route.fulfill({
      status: 200,
      body: "User created!",
    });
  });

  await page.route(loginApiUrl, async (route) => {
    // Verify the request payload
    const requestData = await route.request().postData();
    expect(requestData).toContain(user.email);
    expect(requestData).toContain(password);

    // Mock the response
    await route.fulfill({
      status: 200,
      body: "User exists!",
    });
  });

  // Create the user
  const createResponse = await apiContext.post(createAccountApiUrl, {
    form: apiUser,
  });

  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.text();
  expect(createBody).toContain("User created!");

  // Verify login
  const loginResponse = await apiContext.post(loginApiUrl, {
    form: {
      email: user.email,
      password: password,
    },
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.text();
  expect(loginBody).toContain("User exists!");

  // Clean up
  await apiContext.dispose();
});
