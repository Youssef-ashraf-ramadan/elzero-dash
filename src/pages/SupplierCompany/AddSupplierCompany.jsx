

import useAddSupplierCompany from './../../hooks/SupplierCompany/useAddSupplierCompany';
import { useSelector } from "react-redux";

const AddSupplierCompany = () => {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const { formData, handleChange, handleSubmit, isLoading } = useAddSupplierCompany();


  return (
    <section
    className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
  >
    <div className="container mt-4">

      <h2 className="mb-3 text-center">Add New Supplier Company</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>



        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" name="confirm_password" className="form-control" value={formData.confirm_password} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Company"}
        </button>
      </form>
    </div>    </section>

  );
};

export default AddSupplierCompany;
