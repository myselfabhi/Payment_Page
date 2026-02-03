import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/app/pages/login-page";
import { CheckoutPage } from "@/app/pages/checkout-page";
import { PaymentPage } from "@/app/pages/payment-page";
import { ContactDetailsPage } from "@/app/pages/contact-details-page";
import { PaymentModePage } from "@/app/pages/payment-mode-page";
import { PaymentSuccessPage } from "@/app/pages/payment-success-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/checkout",
    Component: CheckoutPage,
  },
  {
    path: "/payment-summary",
    Component: PaymentPage,
  },
  {
    path: "/contact-details",
    Component: ContactDetailsPage,
  },
  {
    path: "/payment-mode",
    Component: PaymentModePage,
  },
  {
    path: "/payment-success",
    Component: PaymentSuccessPage,
  },
]);