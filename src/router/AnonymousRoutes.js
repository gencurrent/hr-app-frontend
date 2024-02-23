/**
 * Router for unauthenticated users
 */

import { React } from "react";
// import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Template } from "component";
import { AnonymousLandingPage } from "page";

const AnonymousRouter = createBrowserRouter([
  { path: "/", element: <AnonymousLandingPage/> },
]);

function AnonymousRouterProvider() {
  return (
    <>
      <Template>
        <RouterProvider router={AnonymousRouter} />
      </Template>
    </>
  );
}

export default AnonymousRouterProvider;
