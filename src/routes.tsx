import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Root, RootBoundary } from "@/pages";

// Import pages
const Home = lazy(() => import("@/pages/home/Home"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export const router = createBrowserRouter([
  {
    element: <Root />,
    ErrorBoundary: RootBoundary,
    children: publicRoutes,
  },
]);
