import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSuppliersCompany from "../../hooks/SupplierCompany/useSuppliersCompany";

const SuppliersCompanies = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const { suppliers, isLoading, error, handleDelete } = useSuppliersCompany();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliersPerPage] = useState(10);

  // Pagination logic
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = suppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  const totalPages = Math.ceil(suppliers.length / suppliersPerPage);

  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (supplierToDelete) {
      handleDelete(supplierToDelete.id);
      setShowDeleteModal(false);
      setSupplierToDelete(null);
    }
  };

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container mt-4">
      <div className="d-flex align-items-center flex-wrap justify-content-between">
        <h1 className="fs-4 mb-0">Suppliers Company List</h1>

        <button
          className="btn btn-primary d-flex align-items-center gap-2 my-3 mb-3"
          onClick={() => navigate("/dashboard/supplier-company/add")}
        >
          <i className="fa fa-user"></i> Add Supplier Company
        </button>
        </div>

        <div style={{ overflowX: "auto" }} className="table-container my-1">
          {isLoading ? (
            <SkeletonTheme baseColor="lightgray">
              <Skeleton count={5} height={50} />
            </SkeletonTheme>
          ) : error ? (
            <p className="text-danger text-center">Error: {error.message}</p>
          ) : suppliers.length > 0 ? (
            <>
              <table className="table  table-centered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSuppliers.map((supplier, index) => (
                    <tr key={supplier.id}>
                      <td>{indexOfFirstSupplier + index + 1}</td>
                      <td>{supplier.name}</td>
                      <td className="actions-button">
                        <button
                          className="btn btn-primary px-2 btn-sm me-2 my-1"
                          onClick={() =>
                            navigate(`/dashboard/supplier-company/${supplier.id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete btn-sm me-2"
                          onClick={() => handleDeleteClick(supplier)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            <p className="text-center">No suppliers found</p>
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
                    Are you sure you want to delete supplier company:{" "}
                    <strong>{supplierToDelete?.name}</strong>?
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

export default SuppliersCompanies;
