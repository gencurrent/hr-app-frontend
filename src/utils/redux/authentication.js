/**
 * Authentication reducers
 */

import { createSlice } from "@reduxjs/toolkit";

// const initialState = { email, firstName, lastName };
const initialState = {};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    isAuthenticated(state) {
      let token = localStorage.getItem("token");
      let tokenExpiresIn = localStorage.getItem("tokenExpiresIn");
      tokenExpiresIn = tokenExpiresIn ? parseInt(tokenExpiresIn) : undefined;
      let refresh = localStorage.getItem("refresh");
      state.isAuthenticated = Boolean(token && tokenExpiresIn && refresh);
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
