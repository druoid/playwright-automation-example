import { test, expect, request } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("should create a user, verify login, and return 200 with success message", async () => {
  const createAccountApiUrl = "/api/createAccount";
  const loginApiUrl = "/api/verifyLogin";

  const user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: "Password123!",
    title: faker.person.prefix(),
    birth_date: faker.date.birthdate().getDate(),
    birth_month: faker.date.birthdate().getMonth() + 1,
    birth_year: faker.date.birthdate().getFullYear(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.location.country(),
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };

  const apiContext = await request.newContext({
    baseURL: "https://www.automationexercise.com", // replace with your actual base URL
  });

  // Create the user
  const createResponse = await apiContext.post(createAccountApiUrl, {
    form: user,
  });

  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.text();
  expect(createBody).toContain("User created!");

  // Verify login
  const loginResponse = await apiContext.post(loginApiUrl, {
    form: {
      email: user.email,
      password: user.password,
    },
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.text();
  expect(loginBody).toContain("User exists!");
});
