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
  DashboardPage,
  VacancyPage,
  VacancyCreatePage,
  VacancyListPage,
  VacancySubmissionListPage,
} from "page/authenticated";

import {
  AnonymousVacancyPreviewPage,
  AnonymousVacancyApplicationPage,
  AnonymousVacancyAppliedPage,
} from "page/anonymous";

const AuthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DashboardPage />} />

      <Route
        path="submission"
        element={
          <VacancySubmissionListPage singleVacancySusbmissions={false} />
        }
      />

      <Route path="vacancy">
        <Route path="" element={<VacancyListPage />} />
        <Route path="create" element={<VacancyCreatePage />} />
        <Route
          path=":vacancyId/submission"
          element={
            <VacancySubmissionListPage singleVacancySusbmissions={true} />
          }
        />
        <Route path=":id" element={<VacancyPage />} />
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
