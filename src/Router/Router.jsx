import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import AuthLayout from "../Layout/Auth/AuthLayout";
import Login from "../Components/AuthRoutes/Login";
import Register from "../Components/AuthRoutes/Register";
import Home from "../Pages/Home/Home";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess/PaymentSuccess";
import Pricing from "../Pages/Payment/Pricing";
import Payment from "../Pages/Payment/Payment";
import PaymentCancel from "../Pages/Payment/PaymentCancel/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("/whylearn.json").then((res) => res.json()),
      },
      {
        path: "/pricing",
        Component: Pricing,
      },
    ],
  },
  {
    path: "/payments",
    Component: Payment,
    children: [
      {
        path: "/payments/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/payments/payment-cancel",
        Component: PaymentCancel,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);
