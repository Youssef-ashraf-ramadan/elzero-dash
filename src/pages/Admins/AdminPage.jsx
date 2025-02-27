import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdmins from "../../hooks/Admin/useAdmins";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; 

const AdminPage = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const currentUserEmail = useSelector((state) => state.auth.admin?.email);
  const { admins, isLoading, error, handleDelete } = useAdmins();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  
  
  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (adminToDelete) {
      handleDelete(adminToDelete.id);
      setShowDeleteModal(false);
      setAdminToDelete(null);
    }
  };

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container mt-4">
        <h1 className="fs-4">Admins List</h1>

        <button
          className="btn btn-primary d-flex align-items-center gap-2 mb-3 my-3"
          onClick={() => navigate("/dashboard/admin/add")}
        >
          <i className="fa fa-user"></i> Add Admin
        </button>

        <div style={{ overflowX: "auto" }} className="table-container my-3">
          {isLoading ? (
            <SkeletonTheme baseColor="lightgray">
              <Skeleton count={5} height={50} />
            </SkeletonTheme>
          ) : error ? (
            <p className="text-danger text-center">Error: {error.message}</p>
          ) : admins.length > 0 ? (
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
{admins.map((admin, index) => {
  // Hide super admin from non-super admins
  if (admin.email === "admin@admin.com" && currentUserEmail !== "admin@admin.com") {
    return null;
  }

  return (
    <tr key={admin.id}>
      <td>{index + 1}</td>
      <td>{admin.name}</td>
      <td>
        {admin.email}
        {admin.email === "admin@admin.com" && (
          <span className="badge bg-primary ms-2">Super Admin</span>
        )}
      </td>
      <td className="actions-button">
        <button 
          className="btn btn-primary px-2 btn-sm me-2 my-1" 
          onClick={() => navigate(`/dashboard/admin/${admin.id}`)}
        >
          Edit
        </button>
        {admin.email !== "admin@admin.com" && (
          <button
            className="btn btn-delete btn-sm me-2"
            onClick={() => handleDeleteClick(admin)}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
})}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No admins found</p>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete admin: <strong>{adminToDelete?.name}</strong>?</p>
                  <p className="text-muted">This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPage;
