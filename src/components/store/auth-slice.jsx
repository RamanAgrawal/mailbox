import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  idToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state, actions) {
      state.isAuthenticated = true;
      state.idToken = actions.payload.idToken;
      localStorage.setItem("idToken", actions.payload.idToken);
      localStorage.setItem("email", actions.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.idToken = null;
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
    },
  },
});

export default authSlice.reducer;

export const authActions = authSlice.actions;
