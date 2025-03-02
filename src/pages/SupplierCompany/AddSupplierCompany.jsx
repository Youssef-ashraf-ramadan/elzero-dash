import useAddSupplierCompany from "./../../hooks/SupplierCompany/useAddSupplierCompany";
import { useSelector } from "react-redux";

const AddSupplierCompany = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const { formData, handleChange, handleSubmit, isLoading } =
    useAddSupplierCompany();

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container mt-4">
        <h5 className="mb-3 fs-3 text-center">Add New Supplier Company</h5>
        <div className="card mx-auto py-4 px-5" style={{ maxWidth: "700px" }}>
          <form onSubmit={handleSubmit} className="w-100 mx-auto">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mx-auto w-100 mb-3 add-admin-btn text-center d-flex justify-content-center"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Company"}
            </button>
          </form>
        </div>
      </div>{" "}
    </section>
  );
};

export default AddSupplierCompany;
