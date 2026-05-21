import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  sessionExpired: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  sessionExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionExpired: (state) => {
      state.sessionExpired = true;
    },
    resetSession: (state) => {
      state.sessionExpired = false;
    },
  },
});
export const { sessionExpired, resetSession } = authSlice.actions;
export default authSlice.reducer;
