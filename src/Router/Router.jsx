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
import Lessons from "../Pages/Lessons/Lessons";
import LessonsDetails from "../Pages/Lessons/LessonsDetails";
import PrivateRoute from "../Context/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddLesson from "../Pages/Dashboard/Dashboard_Components/AddLesson";
import UserLessons from "../Pages/Dashboard/Dashboard_Components/UserLessons";

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
      {
        path: "/all-lessons",
        Component: Lessons,
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
  {
    path: "/all-lessons/:id",
    element: (
      <PrivateRoute>
        <LessonsDetails></LessonsDetails>,
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/add-lessons",
        Component: AddLesson,
      },
      {
        path: "/dashboard/my-lessons",
        Component: UserLessons,
      },
    ],
  },
]);
