import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Trash2 } from "lucide-react"; // Import trash can icon
import baseUrl from "../../../src/api/baseURL"; // Ensure this path is correct

function Drivers() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [drivers, setDrivers] = useState([]); // State for fetched drivers
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading status
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const rowsPerPage = 16; // Increased rows per page

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true); // Start loading
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token is missing. Please log in again.");
          setLoading(false);
          return;
        }
        const response = await baseUrl.get("/drivers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDrivers(response.data.data || []); // Update state with fetched data
        setError(null); // Clear any existing errors
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
        setError("Failed to fetch drivers. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchDrivers();
  }, []);

  const handleDeleteById = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await baseUrl.delete(`/drivers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 || response.status === 204) {
          setDrivers((prevDrivers) =>
            prevDrivers.filter((driver) => driver.id !== id)
          );
          alert("Driver deleted successfully.");
        } else {
          alert("Failed to delete the driver. Please try again.");
        }
      } catch (error) {
        console.error("Failed to delete driver:", error);
        alert("An error occurred while deleting the driver.");
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all drivers?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await baseUrl.delete("/drivers/delete-all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 || response.status === 204) {
          setDrivers([]);
          alert("All drivers deleted successfully.");
        } else {
          alert("Failed to delete all drivers. Please try again.");
        }
      } catch (error) {
        console.error("Failed to delete all drivers:", error);
        alert("An error occurred while deleting all drivers.");
      }
    }
  };

  const pageCount = Math.ceil(drivers.length / rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayData = drivers.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container">
        <h1 className="fs-4">Drivers List</h1>
        <div style={{ overflowX: "auto" }} className="table-container my-3">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : loading ? (
            <Skeleton count={10} />
          ) : (
            <>
              <table id="example" className="table  table-centered" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Joined Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((driver) => (
                    <tr key={driver.id}>
                      <td>{driver.id}</td>
                      <td>{driver.name}</td>
                      <td>{driver.created_at}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-delete w-100  justify-content-center text-center py-2 d-flex align-items-center gap-2"
                          onClick={() => handleDeleteById(driver.id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {drivers.length > rowsPerPage && (
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  previousClassName={"page-item"}
                  nextClassName={"page-item"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                />
              )}
            </>
          )}
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-delete d-flex align-items-center gap-2 px-4 py-2"
            onClick={handleDeleteAll}
            disabled={drivers.length === 0}
          >
            <Trash2 size={20} />
            Delete All
          </button>
        </div>
      </div>
    </section>
  );
}

export default Drivers;