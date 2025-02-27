
import { Toaster } from "react-hot-toast";
import useAddAdmin from "../../hooks/Admin/useAddAdmin";
import { useSelector } from "react-redux";

const AddAdmin = () => {
    const isDashSidebarOpen = useSelector(
        (state) => state.dashSidebar.isDashSidebarOpen
      );
  const { formData, handleChange, handleSubmit, isLoading } = useAddAdmin();


  return (
    <section
    className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
  >
    <div className="container mt-4">
      <Toaster />
      <h2 className="mb-3 text-center">Add New Admin</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
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
          {isLoading ? "Adding..." : "Add Admin"}
        </button>
      </form>
    </div>    </section>

  );
};

export default AddAdmin;
