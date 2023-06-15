import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../LoginSignIn/Login/Login";
import NewUser from "../LoginSignIn/SignUp/NewUser";
import Dashboard from "../Main/Dashboard";
import Main from "../Main/Main";
import AllClases from "../pages/AllClasses/AllClases";
import Admine from "../pages/Dashboard/Admine";
import AllUser from "../pages/Dashboard/AllUser";
import Home from "../pages/Home/Home";
import Instructorss from "../pages/Instructors/Instructorss";
import PriveteRoutes from "./PriveteRoutes";
import Addclass from "../pages/Dashboard/Instructor/Addclass";
import Myclass from "../pages/Dashboard/Instructor/Myclass";
import UpdateClass from "../pages/Dashboard/Instructor/UpdateClass";
import ManageClass from "../pages/Dashboard/Admin/ManageClass";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Payment from "../pages/shared/Payment/Payment";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import PriveteInstructor from "./PriveteInstructor";
import PriveteAdmine from "./PriveteAdmine";
import Enrolled from "../pages/Dashboard/Users/Enrolled";
import PaymentHistory from "../pages/Dashboard/Users/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <NewUser />,
      },
      {
        path: "instructor",
        element: <Instructorss />,
      },

      {
        path: "classes",
        element: <AllClases />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PriveteRoutes>
        <Dashboard />
      </PriveteRoutes>
    ),
    children: [
      {
        path: "users",
        element: <AllUser />,
      },
      {
        path: "addclass",
        element: (
          <PriveteInstructor>
            <Addclass />
          </PriveteInstructor>
        ),
      },
      {
        path: "myclass",
        element: (
          <PriveteInstructor>
            <Myclass />
          </PriveteInstructor>
        ),
      },
      {
        path: "enrolled",
        element: <Enrolled />,
      },
      {
        path: "payhistory",
        element: <PaymentHistory />,
      },
      {
        path: "updateClass/:id",
        element: <UpdateClass />,
        loader: ({ params }) =>
          fetch(`https://assignment-12-server-gamma.vercel.app/topclass/${params.id}`),
      },
      {
        path: "admin",
        element: (
          <PriveteAdmine>
            <Admine />
          </PriveteAdmine>
        ),
      },
      {
        path: "manageclass",
        element: (
          <PriveteAdmine>
            <ManageClass />
          </PriveteAdmine>
        ),
        loader: () => fetch("https://assignment-12-server-gamma.vercel.app/topclass"),
      },
      {
        path: "manageuser",
        element: (
          <PriveteAdmine>
            <ManageUsers />
          </PriveteAdmine>
        ),
        loader: () => fetch("https://assignment-12-server-gamma.vercel.app/alluser"),
      },
      {
        path: "payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(`https://assignment-12-server-gamma.vercel.app/selectCourse/${params.id}`),
      },
    ],
  },
]);

export default router;
