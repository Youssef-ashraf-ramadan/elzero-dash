import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../api/baseURL";

const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

// Get all admins
export const getAllAdmins = createAsyncThunk(
  "all/admins",
  async (_, thunkAPI) => {
    try {
      const res = await baseUrl.get("/user?role=admin", config);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);

// Get admin by ID
export const getAdminById = createAsyncThunk(
  "admin/getById",
  async (id, thunkAPI) => {
    try {
      const res = await baseUrl.get(`/user/${id}`, config);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);


// Update admin (name, password,email) 
export const updateAdmin = createAsyncThunk("admin/updateAdmin", async (adminData, { rejectWithValue }) => {
  try {
    const response = await baseUrl.put(`/user/${adminData.id}`, adminData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return response.data;
  } catch (error) {
    console.error("Update Admin Error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});


// Delete admin
export const deleteAdmin = createAsyncThunk(
  "admin/delete",
  async (id, thunkAPI) => {
    try {
      await baseUrl.delete(`/user/${id}`, config);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);