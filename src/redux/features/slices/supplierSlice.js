import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSupplier,
  getSupplierById,
  getAllSuppliers,
  updateSupplier,
} from "../actions/supplierAction";

const initialState = {
  suppliers: [],
  supplier: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All Suppliers
      .addCase(getAllSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Supplier by ID
      .addCase(getSupplierById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplierById.fulfilled, (state, action) => {
        state.supplier = action.payload;
        state.isLoading = false;
      })
      .addCase(getSupplierById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Supplier
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        console.log("Updated Supplier Data:", action.payload);
        state.supplier = action.payload;
        state.isLoading = false;
      })

      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Supplier
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.supplier = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;
