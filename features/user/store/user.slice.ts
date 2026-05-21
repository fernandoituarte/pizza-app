import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  sessionExpired: boolean;
}

const initialState: UserState = {
  sessionExpired: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
});
export const {  } = userSlice.actions;
export default userSlice.reducer;
