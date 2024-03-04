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

import { DashboardPage, VacancyCreatePage, VacancyListPage } from "page/authenticated";

const AuthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DashboardPage />} />
      <Route path="vacancy/create" element={<VacancyCreatePage />} />
      <Route path="vacancy" element={<VacancyListPage />} />
    </>
  )
);

function AuthenticatedRouterProvider() {
  return <RouterProvider router={AuthenticatedRouter} />;
}

export default AuthenticatedRouterProvider;
