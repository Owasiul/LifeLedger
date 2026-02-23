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
import Profile from "../Pages/Dashboard/Dashboard_Components/Profile";
import Overview from "../Pages/Dashboard/Dashboard_Components/Overview";
import AdminRoute from "../Context/AdminRoute";
import AdminOverview from "../Pages/Dashboard/Dashboard_Admin/AdminOverview";
import UserManagement from "../Pages/Dashboard/Dashboard_Admin/UserManagement";
import LessonsManagement from "../Pages/Dashboard/Dashboard_Admin/LessonsManagement";
import Loading from "../Components/Loading/Loading";
import Error from "../Components/Error/Error";
import ReportsManagement from "../Pages/Dashboard/Dashboard_Admin/ReportsManagement";
import SavedLesson from "../Pages/Dashboard/Dashboard_Components/SavedLesson";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    hydrateFallbackElement: <Loading> </Loading>,
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
    errorElement: <Error></Error>,
    hydrateFallbackElement: <Loading> </Loading>,
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
    errorElement: <Error></Error>,
    hydrateFallbackElement: <Loading> </Loading>,
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
  // user / admin dashboard
  {
    path: "/dashboard",
    errorElement: <Error></Error>,
    hydrateFallbackElement: <Loading> </Loading>,
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "/dashboard/overview",
        Component: Overview,
      },
      {
        path: "/dashboard/add-lessons",
        Component: AddLesson,
      },
      {
        path: "/dashboard/my-lessons",
        Component: UserLessons,
      },
      {
        path: "/dashboard/my-favorites",
        Component: SavedLesson,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      // Admin Dashboard
      {
        path: "/dashboard/admin-overview",
        element: (
          <AdminRoute>
            <AdminOverview></AdminOverview>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/lessons-management",
        element: (
          <AdminRoute>
            <LessonsManagement></LessonsManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reports-management",
        element: (
          <AdminRoute>
            <ReportsManagement></ReportsManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
