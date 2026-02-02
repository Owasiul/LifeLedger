import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import AuthLayout from "../Layout/Auth/AuthLayout";
import Login from "../Components/AuthRoutes/Login";
import Register from "../Components/AuthRoutes/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
      },
    ],
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
