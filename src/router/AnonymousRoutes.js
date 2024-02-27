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
import { Template } from "component";
import {
  AnonymousLandingPage,
  AuthenticationPage,
  AuthenticationSignInPage,
} from "page";

const AnonymousRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path="/" element={<AnonymousLandingPage />} />
      <Route path="/auth" element={<AuthenticationPage />}>
        <Route path="signin" element={<AuthenticationSignInPage />} />
      </Route>
    </>
    // <>
    // <Route path="/" element={<AnonymousLandingPage />}>
    //   <Route path="auth">
    //     <Route
    //       path="signin"
    //       element={
    //         <AuthenticationPage>
    //           <AuthenticationSignInPage />
    //         </AuthenticationPage>
    //       }
    //     />
    //   </Route>
    // </Route>
    // </>
    // Works
    // <>
    //   <Route
    //     path="/auth/signin"
    //     element={
    //       <AuthenticationPage>
    //         <AuthenticationSignInPage />
    //       </AuthenticationPage>
    //     }
    //   />
    //   <Route path="/" element={<AnonymousLandingPage />}></Route>
    // </>
  )
);

function AnonymousRouterProvider() {
  return <RouterProvider router={AnonymousRouter} />;
}

export default AnonymousRouterProvider;
