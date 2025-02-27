import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../api/baseURL";


const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };



export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await baseUrl.post("/user/login", credentials);

      const token = res.data.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      localStorage.setItem("role", res.data.data.user.role);
      localStorage.setItem("name", res.data.data.user.name);

      
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors ||
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred."
      );
    }
  }
);


export const registerUser = createAsyncThunk(
  "user/register",
  async (adminData, thunkAPI) => {
    try {
      const res = await baseUrl.post("/user/store", adminData, config);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);




export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const res = await baseUrl.get("/user/profile", config);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);