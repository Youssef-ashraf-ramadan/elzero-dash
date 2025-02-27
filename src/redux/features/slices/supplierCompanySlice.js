import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSupplierCompany,
  getSupplierCompanyById,
  getAllSupplierCompanys,
  updateSupplierCompany,
} from "../actions/supplierCompanyAction";

const initialState = {
  suppliers: [],
  supplier: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const supplierCompanySlice = createSlice({
  name: "supplierCompany",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All Suppliers
      .addCase(getAllSupplierCompanys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSupplierCompanys.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllSupplierCompanys.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Supplier by ID
      .addCase(getSupplierCompanyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplierCompanyById.fulfilled, (state, action) => {
        state.supplier = action.payload;
        state.isLoading = false;
      })
      .addCase(getSupplierCompanyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Supplier
      .addCase(updateSupplierCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupplierCompany.fulfilled, (state, action) => {
        console.log("Updated Supplier Data:", action.payload);
        state.supplier = action.payload;
        state.isLoading = false;
      })

      .addCase(updateSupplierCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Supplier
      .addCase(deleteSupplierCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplierCompany.fulfilled, (state, action) => {
        state.supplier = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteSupplierCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutSupplier } = supplierCompanySlice.actions;
export default supplierCompanySlice.reducer;
