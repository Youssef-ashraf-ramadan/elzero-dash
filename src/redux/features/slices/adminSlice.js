import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdmin,
  getAdminById,
  getAllAdmins,
  updateAdmin,
} from "../actions/adminAction";

const initialState = {
  admins: [],
  admin: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // Get All Admins
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Admin by ID
      .addCase(getAdminById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isLoading = false;
      })
      .addCase(getAdminById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add Admin
      // .addCase(addAdmin.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(addAdmin.fulfilled, (state, action) => {
      //   state.admins.push(action.payload);
      //   state.isLoading = false;
      // })
      // .addCase(addAdmin.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

      // Update Admin
      .addCase(updateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        console.log("Updated Admin Data:", action.payload);
        state.admin = action.payload;
        state.isLoading = false;
      })

      .addCase(updateAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Admin
      .addCase(deleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter(
          (admin) => admin.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
