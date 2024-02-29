/**
 * Router for unauthenticated users
 */

import { React } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  AnonymousLandingPage,
  AuthenticationPage,
  AuthenticationSignInPage,
  AuthenticationSignUpPage,
  AnonymousVacancyApplicationPage,
  AnonymousVacancyPreviewPage,
  AnonymousVacancyAppliedPage,
} from "page";

const AnonymousRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AnonymousLandingPage />} />
      <Route path="/auth" element={<AuthenticationPage />}>
        <Route
          path="signin"
          element={<AuthenticationSignInPage method={"Sign In"} />}
        />
        <Route
          path="signup"
          element={<AuthenticationSignUpPage method={"Sign up"} />}
        />
      </Route>
      <Route path="vacancy">
        <Route path=":id/preview" element={<AnonymousVacancyPreviewPage />} />
        <Route path=":id/apply" element={<AnonymousVacancyApplicationPage />} />
        <Route
          path=":id/applied"
          element={<AnonymousVacancyAppliedPage />}
        />
      </Route>
    </>
  )
);

function AnonymousRouterProvider() {
  return <RouterProvider router={AnonymousRouter} />;
}

export default AnonymousRouterProvider;
