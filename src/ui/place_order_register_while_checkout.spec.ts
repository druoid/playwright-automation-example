import { test } from "@playwright/test";

import { HomePage } from "../../pages/homePage";
import { CartPage } from "../../pages/cartPage";
import { LoginPage } from "../../pages/loginPage";
import { SignUpPage } from "../../pages/signUpPage";
import { AccountCreatedPage } from "../../pages/accountCreatedPage";
import { CheckoutPage } from "../../pages/checkoutPage";
import { PaymentPage } from "../../pages/paymentPage";
import { DeleteAccountPage } from "../../pages/deleteAccountPage";

import { products } from "../../utils/testData";
import { generateUser } from "../../utils/fakeUser";

test("Place order and register while checkout", async ({ page }) => {
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

  // Add product to cart
  await homePage.addProductToCart();

  // View cart
  await cartPage.viewCartFromModal();
  await cartPage.verifyCartPage();

  // Proceed to checkout
  await cartPage.proceedToCheckout();
  await cartPage.clickOnLoginFromCheckoutModal();

  // Register and create account
  const { firstName, lastName } = await loginPage.registerUser(user);
  user.name = firstName;
  user.lastName = lastName;

  await signUpPage.fillInAccountDetails(user.name, user.lastName);
  await signUpPage.clickCreateAccount();

  // Verify account creation
  await accountCreatedPage.verifyAccountCreated();

  // Verify user is logged in
  await homePage.verifyLoggedInUser(user.name, user.lastName);

  // View cart and proceed again
  await cartPage.viewCartFromNav();
  await cartPage.proceedToCheckout();

  // Address and order review
  await checkoutPage.verifyDeliveryAddress(user.name, user.lastName);

  await checkoutPage.verifyBillingAddress(user.name, user.lastName);
  await checkoutPage.reviewOrder(products.blueTop);
  await checkoutPage.enterDescriptionAndPlaceOrder();

  // Payment
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
