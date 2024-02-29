/**
 * Router for authenticated users
 */

import { React } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  DashboardPage
} from "page/authenticated";

const AuthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DashboardPage/>} />
    </>
  )
);

function AuthenticatedRouterProvider() {
  return <RouterProvider router={AuthenticatedRouter} />;
}

export default AuthenticatedRouterProvider;
