import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { authApolloClient, pureApolloClient } from "utils/apollo";
import { store } from "utils/redux";
import { AnonymousRouterProvider } from "router";

function App() {
  return (
    // <Provider store={store}>
      <AnonymousRouterProvider/>

    // </Provider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
