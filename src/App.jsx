import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import DashBoard from "./pages/DashBoard";
import Databases from "./components/Databases";
import { DashBoardProvider } from "./store/DashBoardContext";
import Account from "./pages/Account";
import Collections from "./components/Collections";
import Documents from "./components/Documents";
import DocumentDashBoard from "./pages/DocumentDashboard";
import Schema from "./pages/Schema";
import DatabaseRoot from "./pages/DatabaseRoot";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        index: true,
        element: <Databases />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: ":database",
        element: <DatabaseRoot />,
        children: [
          {
            index: true,
            element: <Collections />,
          },
          {
            path: ":collection",
            element: <DocumentDashBoard />,
            children: [
              { index: true, element: <Documents /> },
              { path: "schema", element: <Schema /> },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DashBoardProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </DashBoardProvider>
  </QueryClientProvider>
);

export default App;
