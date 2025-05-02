import { test } from "@playwright/test";

import { HomePage } from "../../pages/homePage";
import { CartPage } from "../../pages/cartPage";
import { LoginPage } from "../../pages/loginPage";
import { SignUpPage } from "../../pages/signUpPage";
import { AccountCreatedPage } from "../../pages/accountCreatedPage";
import { CheckoutPage } from "../../pages/checkoutPage";
import { PaymentPage } from "../../pages/paymentPage";
import { DeleteAccountPage } from "../../pages/deleteAccountPage";

import { products } from "../../support/testData";
import { generateUser } from "../../support/fakeUser";

test("Place order and register before checkout", async ({ page }) => {
  const user = generateUser();

  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const signUpPage = new SignUpPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);
  const deleteAccountPage = new DeleteAccountPage(page);

  // Visit home
  await homePage.visit();
  await homePage.verifyHomePageActive();

  // Click 'Signup / Login' button
  await homePage.loginFromHomePage();

  // Register and create account
  const { firstName, lastName } = await loginPage.registerUser(user);
  user.name = firstName;
  user.lastName = lastName;

  await signUpPage.fillInAccountDetails(user.name, user.lastName);
  await signUpPage.clickCreateAccount();

  // Verify 'ACCOUNT CREATED!' and click 'Continue'
  await accountCreatedPage.verifyAccountCreated();

  // Verify user is logged in
  await homePage.verifyLoggedInUser(user.name, user.lastName);

  // Add product to cart
  await homePage.addProductToCart();

  // Click 'Cart' button
  await cartPage.viewCartFromModal();
  await cartPage.verifyCartPage();

  // Proceed to Checkout
  await cartPage.proceedToCheckout();

  // Verify Address and Review Order
  await checkoutPage.verifyDeliveryAddress(user.name, user.lastName);
  await checkoutPage.verifyBillingAddress(user.name, user.lastName);
  await checkoutPage.reviewOrder(products.blueTop);
  await checkoutPage.enterDescriptionAndPlaceOrder();

  // Enter payment and confirm
  await paymentPage.enterPaymentDetailsAndPayAndConfirm(
    user.name,
    user.lastName,
    user,
  );
  await paymentPage.verifyOrderSuccess();

  // Delete account
  await deleteAccountPage.deleteAccount();
  await deleteAccountPage.clickContinueButton();
});
