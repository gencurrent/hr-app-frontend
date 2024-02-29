/**
 * Counter example;
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      let value = parseInt(localStorage.getItem("Counter"));
      value++;
      state.value = value;
      console.log(state);
      console.log(state.value);
      localStorage.setItem("Counter", value);
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
