import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLink: "",
};

export const headerSLice = createSlice({
  name: "header",
  initialState,
  reducers: {
    reset: (state) => {
      state.activeLink = "";
    },
    // set the active link
    setActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },
});

export const { reset, setActiveLink } = headerSLice.actions;
export default headerSLice.reducer;
export const selectActiveLink = (state) => state.header.activeLink