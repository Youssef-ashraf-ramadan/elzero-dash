import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../api/baseURL";

const token = localStorage.getItem("token");
const config = { headers: { Authorization: `Bearer ${token}` } };

// Get all Supplier
export const getAllSuppliers = createAsyncThunk(
  "all/supplier",
  async (_, thunkAPI) => {
    try {
      const res = await baseUrl.get("/user?role=supplier", config);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);

// Get Supplier by ID
export const getSupplierById = createAsyncThunk(
  "Supplier/getById",
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


// Update Supplier (name, password,email) 
export const updateSupplier = createAsyncThunk("Supplier/updateSupplier", async (SupplierData, { rejectWithValue }) => {
  try {
    const response = await baseUrl.put(`/user/${SupplierData.id}`, SupplierData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return response.data;
  } catch (error) {
    console.error("Update Supplier Error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});


// Delete Supplier
export const deleteSupplier = createAsyncThunk(
  "Supplier/delete",
  async (id, thunkAPI) => {
    try {
      await baseUrl.delete(`/user/${id}`, config);
      return id;
    } catch (error) {
      console.log(error);
      
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);