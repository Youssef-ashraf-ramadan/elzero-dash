import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getProfile } from "../actions/authAction";

const initialState = {
  admin: null,
  profile: {},
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.admin = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload
          : { message: "An unexpected error occurred." };
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload
          : { message: "An unexpected error occurred." };
      })

      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLoading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload
          : { message: "An unexpected error occurred." };
      });
  },
});

export default authSlice.reducer;
