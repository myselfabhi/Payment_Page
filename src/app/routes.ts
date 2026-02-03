import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/app/components/login-page";
import { CheckoutPage } from "@/app/components/checkout-page";
import { PaymentPage } from "@/app/components/payment-page";
import { ContactDetailsPage } from "@/app/components/contact-details-page";
import { PaymentModePage } from "@/app/components/payment-mode-page";
import { PaymentSuccessPage } from "@/app/components/payment-success-page";

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