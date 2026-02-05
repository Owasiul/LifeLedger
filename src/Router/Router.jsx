import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import AuthLayout from "../Layout/Auth/AuthLayout";
import Login from "../Components/AuthRoutes/Login";
import Register from "../Components/AuthRoutes/Register";
import Home from "../Pages/Home/Home";
import Payment from "../Pages/Payment/Payment";

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
    ],
  },
  {
    path: "/pricing",
    Component: Payment,
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
