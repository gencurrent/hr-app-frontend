import "./App.css";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import { authApolloClient, pureApolloClient } from "utils/apollo";
import { store } from "utils/redux";
import { AnonymousRouterProvider } from "router";
import { LocalStorageThemeProvider } from "component";

function App() {
  const isUserAuthenticated =
    localStorage.getItem("refresh", false) &&
    localStorage.getItem("token", false);

  const apolloClient = isUserAuthenticated
    ? authApolloClient
    : pureApolloClient;
  // TODO: Use AuthenticatedRouterProvider in when it's done
  const RouterProvider = isUserAuthenticated
    ? AnonymousRouterProvider
    : AnonymousRouterProvider;

  return (
    <Provider store={store}>
      <LocalStorageThemeProvider>
        <ApolloProvider client={apolloClient}>
          <RouterProvider />
        </ApolloProvider>
      </LocalStorageThemeProvider>
    </Provider>
  );
}

export default App;
