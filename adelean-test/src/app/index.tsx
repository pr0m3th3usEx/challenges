import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "./Home";
import { Product } from "./Product";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);

export default router;
