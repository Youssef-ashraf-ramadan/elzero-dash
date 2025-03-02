import React from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useSupplierDetails from "../../hooks/Supplier/useSupplierDetails";
import { useSelector } from 'react-redux';

const SupplierOne = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const { id } = useParams();
  const { supplier, isLoading, error, editData, setEditData, handleSave, navigate, companies } = useSupplierDetails(id);

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
    <div className="container mt-4">
      <Toaster position="top-center" />
      <h2 className="text-center mb-3">Edit Supplier</h2>

      {isLoading ? (
        <SkeletonTheme baseColor="lightgray">
          <Skeleton count={5} height={50} />
        </SkeletonTheme>
      ) : error ? (
        <p className="text-danger text-center">Error: {error.message}</p>
      ) : supplier ? (
        <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Company</label>
              <select
                className="form-control"
                value={editData.company_id || ""}
                onChange={(e) => setEditData({ ...editData, company_id: e.target.value })}
              >
                <option value="">Select a company</option>
                {companies?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Password (Optional)</label>
              <input
                type="password"
                className="form-control"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div className="d-flex justify-content-between gap-3">
              <button className="btn btn-primary flex-grow-1" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary text-white edit-admin-btn" onClick={() => navigate("/dashboard/suppliers")}>
                Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">No Supplier found</p>
      )}
    </div>
    </section>
  );
};

export default SupplierOne;
