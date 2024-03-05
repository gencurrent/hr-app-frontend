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
} from "page/anonymous";

import { AnonymousGlassBar } from "component";

const AnonymousRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AnonymousLandingPage />} />
      <Route
        path="auth/signin"
        element={
          <AuthenticationPage>
            <AuthenticationSignInPage method={"Sign In"} />
          </AuthenticationPage>
        }
      />
      <Route
        path="auth/signup"
        element={
          <AuthenticationPage>
            <AuthenticationSignUpPage method={"Sign up"} />
          </AuthenticationPage>
        }
      />
      <Route
        path="vacancy/:id/preview"
        element={
          <AnonymousGlassBar>
            <AnonymousVacancyPreviewPage />
          </AnonymousGlassBar>
        }
      />
      <Route
        path="vacancy/:id/apply"
        element={
          <AnonymousGlassBar>
            <AnonymousVacancyApplicationPage />
          </AnonymousGlassBar>
        }
      />
      <Route
        path="vacancy/:id/applied"
        element={
          <AnonymousGlassBar>
            <AnonymousVacancyAppliedPage />
          </AnonymousGlassBar>
        }
      />
    </>
  )
);

function AnonymousRouterProvider() {
  return <RouterProvider router={AnonymousRouter} />;
}

export default AnonymousRouterProvider;
