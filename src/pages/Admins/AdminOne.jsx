import React from "react";
import { useParams } from "react-router-dom";
import useAdminDetails from "../../hooks/Admin/useAdminDetails";
import { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

const AdminOne = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const { id } = useParams();
  const { admin, isLoading, error, editData, setEditData, handleSave, navigate } = useAdminDetails(id);

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container mt-4">
        <Toaster position="top-center" />
        <h2 className="text-center mb-4">Edit Admin</h2>

        {isLoading ? (
          <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px" }}>
            <SkeletonTheme baseColor="#f0f0f0" highlightColor="#ffffff">
              <Skeleton height={40} className="mb-3" />
              <Skeleton height={40} className="mb-3" />
              <Skeleton height={40} className="mb-3" />
              <Skeleton height={40} />
            </SkeletonTheme>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error.message || "An error occurred while loading admin details"}
          </div>
        ) : admin ? (
          <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Enter admin name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  placeholder="Enter admin email"
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Password (Optional)</label>
                <input
                  type="password"
                  className="form-control"
                  value={editData.password}
                  onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                  placeholder="Leave blank to keep current password"
                />
                <small className="text-muted">
                  Must be at least 6 characters if provided
                </small>
              </div>
              <div className="d-flex justify-content-between gap-3">
                <button 
                  className="btn btn-primary flex-grow-1" 
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button 
                  className="btn text-white edit-admin-btn" 
                  onClick={() => navigate("/dashboard/admin")}
                  disabled={isLoading}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-warning text-center" role="alert">
            No admin found with the specified ID
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminOne;
