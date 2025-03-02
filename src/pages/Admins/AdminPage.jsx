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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(10);

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(admins.length / adminsPerPage);

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
        <div className="d-flex align-items-center flex-wrap justify-content-between">
          <h1 className="fs-4 mb-0">Admins List</h1>

          <button
            className="btn btn-primary d-flex align-items-center gap-2 mb-3 my-3"
            onClick={() => navigate("/dashboard/admin/add")}
          >
            <i className="fa fa-user"></i> Add Admin
          </button>
        </div>

        <div style={{ overflowX: "auto" }} className="table-container mt-2">
          {isLoading ? (
            <SkeletonTheme baseColor="lightgray">
              <Skeleton count={5} height={50} />
            </SkeletonTheme>
          ) : error ? (
            <p className="text-danger text-center">Error: {error.message}</p>
          ) : admins.length > 0 ? (
            <>
              <table className="table table-centered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAdmins.map((admin, index) => {
                    if (
                      admin.email === "admin@admin.com" &&
                      currentUserEmail !== "admin@admin.com"
                    ) {
                      return null; // Hide super admin for non-super admin users
                    }
                    return (
                      <tr key={admin.id}>
                        <td>{indexOfFirstAdmin + index + 1}</td>
                        <td>{admin.name}</td>
                        <td>
                          {admin.email}
                          {admin.email === "admin@admin.com" && (
                            <span className="badge bg-primary ms-2">
                              Super Admin
                            </span>
                          )}
                        </td>
                        <td className="actions-button">
                          <button
                            className="btn btn-primary px-2 btn-sm me-2 my-1"
                            onClick={() =>
                              navigate(`/dashboard/admin/${admin.id}`)
                            }
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

              {/* Pagination */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      &laquo;
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <p className="text-center">No admins found</p>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to delete admin:{" "}
                    <strong>{adminToDelete?.name}</strong>?
                  </p>
                  <p className="text-muted">This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
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
