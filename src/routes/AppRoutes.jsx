import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../pages/login/login";
import DashHeader from "../components/DashHeader/DashHeader";
import DashSidebar from "../components/DashSidebar/DashSidebar";
import Orders from "../pages/Dashboard/Orders/Orders";
import UploadPage from "../pages/Dashboard/upload/upload";
import Home from "../pages/Dashboard/home/home";
import AdminPage from "../pages/Admins/AdminPage";
import AddAdmin from "../pages/Admins/AddAdmin";
import AdminOne from "../pages/Admins/AdminOne";
import SuppliersCompanies from "./../pages/SupplierCompany/SuppliersCompanies";
import SupplierOneCompany from "./../pages/SupplierCompany/SupplierOneCompany";
import AddSupplierCompany from "./../pages/SupplierCompany/AddSupplierCompany";
import SuppliersPage from "./../pages/Suppliers/Suppliers";
import SupplierOne from "./../pages/Suppliers/SupplierOne";
import AddSupplier from "./../pages/Suppliers/AddSupplier";
import ProtectedRoute from "../components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Drivers from "../pages/drivers/drivers";

export const AppRoutes = () => {
  const location = useLocation();
  const dashPath = location.pathname.startsWith("/dashboard");

  return (
    <>
            <Toaster position="top-center" />
      {dashPath && <DashHeader />}
      {dashPath && <DashSidebar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/drivers" element={<Drivers />} />

          <Route path="/dashboard/" element={<Home />} />

          <Route path="/dashboard/upload" element={<UploadPage />} />
          <Route path="/dashboard/admin" element={<AdminPage />} />
          <Route path="/dashboard/admin/add" element={<AddAdmin />} />
          <Route path="/dashboard/admin/:id" element={<AdminOne />} />

          <Route path="/dashboard/suppliers" element={<SuppliersPage />} />
          <Route path="/dashboard/supplier/add" element={<AddSupplier />} />
          <Route path="/dashboard/supplier/:id" element={<SupplierOne />} />

          <Route
            path="/dashboard/suppliers-companies"
            element={<SuppliersCompanies />}
          />
          <Route
            path="/dashboard/supplier-company/:id"
            element={<SupplierOneCompany />}
          />
          <Route
            path="/dashboard/supplier-company/add"
            element={<AddSupplierCompany />}
          />

          {/* <Route path="/dashboard/profile" element={<ProfilePage />} /> */}

        </Route>
      </Routes>
    </>
  );
};
