import React from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSupplierCompanyDetails from "../../hooks/SupplierCompany/useSupplierCompanyDetails";
import { useSelector } from "react-redux";

const SupplierOneCompany = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const { id } = useParams();
  const {
    supplier,
    isLoading,
    error,
    editData,
    setEditData,
    handleSave,
  } = useSupplierCompanyDetails(id);

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container mt-4">
        <Toaster />
        <h2 className="text-center mb-3">Edit Supplier</h2>

        {isLoading ? (
          <SkeletonTheme baseColor="lightgray">
            <Skeleton count={5} height={50} />
          </SkeletonTheme>
        ) : error ? (
          <p className="text-danger text-center">Error: {error.message}</p>
        ) : supplier ? (
          <div
            className="card shadow-lg p-4 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <div className="card-body">
             
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary w-100 mt-2" onClick={handleSave}>
                  Save
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

export default SupplierOneCompany;
