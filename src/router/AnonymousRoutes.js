/**
 * Router for unauthenticated users
 */

import { React } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Template } from "component";
import { AnonymousLandingPage } from "page";

const AnonymousRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Template>
        <AnonymousLandingPage />
      </Template>
    ),
  },
]);

function AnonymousRouterProvider() {
  return <RouterProvider router={AnonymousRouter} />;
}

export default AnonymousRouterProvider;
