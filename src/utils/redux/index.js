import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import {
  loadTranslations,
  syncTranslationWithStore,
  i18nReducer,
} from "react-redux-i18n";

import counterReducer from "./ColorModereducer";

import translactionObject from "translations";
import * as additionalReducers from "./reducers";

const store = configureStore({
  reducer: combineReducers({
    routing: routerReducer,
    i18n: i18nReducer,
    additional: additionalReducers.additionalI18nReducer,
    counter: counterReducer,
  }),
  middleware: () => [thunk],
});

const createdHistory = createBrowserHistory();
const history = syncHistoryWithStore(createdHistory, store);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translactionObject));
// store.dispatch(setLocale('en'));
store.dispatch(additionalReducers.i18nInitialize());

export { store, history };
