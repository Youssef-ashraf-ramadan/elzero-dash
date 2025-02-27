import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSuppliers from "../../hooks/Supplier/useSuppliers";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SuppliersPage = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const { suppliers, isLoading, error, handleDelete } = useSuppliers();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

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
        <h1 className="fs-4">Suppliers List</h1>

        <button
          className="btn btn-primary d-flex align-items-center gap-2 mb-3"
          onClick={() => navigate("/dashboard/supplier/add")}
        >
          <i className="fa fa-user"></i> Add Supplier
        </button>

        <div style={{ overflowX: "auto" }} className="table-container my-3">
          {isLoading ? (
            <SkeletonTheme baseColor="lightgray">
              <Skeleton count={5} height={50} />
            </SkeletonTheme>
          ) : error ? (
            <p className="text-danger text-center">Error: {error.message}</p>
          ) : suppliers.length > 0 ? (
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr key={supplier.id}>
                    <td>{index + 1}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td className="actions-button">
                      <button
                        className="btn btn-primary px-2 btn-sm  me-2 my-1"
                        onClick={() => navigate(`/dashboard/supplier/${supplier.id}`)}
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
          ) : (
            <p className="text-center">No suppliers found</p>
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
                  <p>Are you sure you want to delete supplier: <strong>{supplierToDelete?.name}</strong>?</p>
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

export default SuppliersPage;
