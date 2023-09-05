import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLink: "",
};

export const navSLice = createSlice({
  name: "nav",
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

export const { reset, setActiveLink } = navSLice.actions;
export default navSLice.reducer;
export const selectActiveLink = (state) => state.nav.activeLink;