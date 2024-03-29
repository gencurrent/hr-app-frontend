/**
 * Router for authenticated users
 */

import { React } from "react";
import {
  Route,
  RouterProvider,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  DashboardPage,
  ProfileSettingsPage,
  VacancyPage,
  VacancyCreatePage,
  VacancyListPage,
  VacancyApplicationListPage,
} from "page/authenticated";

import {
  AnonymousVacancyPreviewPage,
  AnonymousVacancyApplicationPage,
  AnonymousVacancyAppliedPage,
} from "page/anonymous";
import { AnonymousGlassBar, MainBar, BottomBar } from "component";

const AuthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path=""
        element={
          <>
            <MainBar maxWidth="md" />
            <Outlet />
            <BottomBar />
          </>
        }
      >
        <Route path="/" element={<DashboardPage />} />

        <Route
          path="application"
          element={
            <VacancyApplicationListPage singleVacancySusbmissions={false} />
          }
        />

        <Route path="vacancy">
          <Route path="" element={<VacancyListPage />} />
          <Route path="create" element={<VacancyCreatePage />} />
          <Route
            path=":vacancyId/application"
            element={
              <VacancyApplicationListPage singleVacancySusbmissions={true} />
            }
          />
          <Route path=":id" element={<VacancyPage />} />
        </Route>

        {/* Profile settings page */}
        <Route path="profile" element={<ProfileSettingsPage />} />
      </Route>
      {/* Vacancy testing pages */}
      <Route path="vacancy" element={<AnonymousGlassBar />}>
        <Route path=":id/preview" element={<AnonymousVacancyPreviewPage />} />
        <Route path=":id/apply" element={<AnonymousVacancyApplicationPage />} />
        <Route path=":id/applied" element={<AnonymousVacancyAppliedPage />} />
      </Route>
    </>
  )
);

function AuthenticatedRouterProvider() {
  return <RouterProvider router={AuthenticatedRouter} />;
}

export default AuthenticatedRouterProvider;
