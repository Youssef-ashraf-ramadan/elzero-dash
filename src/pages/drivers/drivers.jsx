import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import baseUrl from "../../../src/api/baseURL"; // Ensure this path is correct

function Drivers() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [drivers, setDrivers] = useState([]); // State for fetched drivers
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(true); // State for loading status
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const rowsPerPage = 8; // Rows per page

  // Fetch data from the /drivers endpoint
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true); // Start loading
        const response = await baseUrl.get("/drivers"); // API call
        setDrivers(response.data.data || []); // Update state with fetched data
        console.log(response.data.data);
        setError(null); // Clear any existing errors
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
        setError("Failed to fetch drivers. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDrivers();
  }, []);

  const pageCount = Math.ceil(drivers.length / rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Filter out rows with any empty data
  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.id &&
      driver.name &&
      driver.created_at // Ensure all fields are present
  );

  // Paginated drivers data for display
  const displayData = filteredDrivers.slice(
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
            // Display error message if an error exists
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : loading ? (
            // Display skeleton placeholders during loading
            <table id="example" className="table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>
                    <Skeleton width={50} />
                  </th>
                  <th>
                    <Skeleton width={150} />
                  </th>
                  <th>
                    <Skeleton width={100} />
                  </th>
                  <th>
                    <Skeleton width={120} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowsPerPage }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={50} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                    </td>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    <td>
                      <Skeleton width={120} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <table id="example" className="table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.length > 0 ? (
                    displayData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.created_at}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No drivers available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Drivers;
