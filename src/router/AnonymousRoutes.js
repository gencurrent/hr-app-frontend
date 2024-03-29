/**
 * Router for unauthenticated users
 */

import { React } from "react";
import {
  Outlet,
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

import { AnonymousGlassBar, BottomBar } from "component";

const AnonymousRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path=""
        element={
          <>
            <Outlet />
            <BottomBar />
          </>
        }
      >
        <Route path="/" element={<AnonymousLandingPage />} />
        <Route
          path="auth/signin"
          element={
            <AnonymousGlassBar>
              <AuthenticationPage>
                <AuthenticationSignInPage method={"Sign In"} />
              </AuthenticationPage>
            </AnonymousGlassBar>
          }
        />
        <Route
          path="auth/signup"
          element={
            <AnonymousGlassBar>
              <AuthenticationPage>
                <AuthenticationSignUpPage method={"Sign up"} />
              </AuthenticationPage>
            </AnonymousGlassBar>
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
      </Route>
    </>
  )
);

function AnonymousRouterProvider() {
  return <RouterProvider router={AnonymousRouter} />;
}

export default AnonymousRouterProvider;
