import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import axios from "axios";
import baseUrl from "../../../api/baseURL"; // Adjust the path if necessary
import "./Orders.css";

function Orders() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [orders, setOrders] = useState([]); // State for fetched data
  const [error, setError] = useState(null); // State for error message
  const [currentPage, setCurrentPage] = useState(0); // State for pagination
  const rowsPerPage = 8;

  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await baseUrl.get("/orders"); // Fetch from /orders endpoint
        setOrders(response.data.data || []); // Update state with fetched data
        setError(null); // Clear any previous errors
        console.log(response.data.data)
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to fetch orders. Please try again later."); // Set error message
      }
    };

    fetchOrders();
  }, []);

  const pageCount = Math.ceil(orders.length / rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayData = orders.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container">
        <h1 className="fs-4">Orders List</h1>
        <div style={{ overflowX: "auto" }} className="table-container my-3">
          {error ? (
            // Display error message if there's an error
            <div className="alert alert-danger" role="alert">
              {error}
              <button
                className="btn btn-primary ms-3"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : orders.length > 0 ? (
            <>
              <table id="example" className="table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Order Number</th>
                    <th>Amount</th>
                    <th>Driver Id</th>
                    <th>Driver Fees</th>
                    <th>Driver Credit</th>
                    <th>Driver Debit</th>
                    <th>Dispatch Time</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.order_number || "N/A"}</td>
                      <td>{row.amount || "N/A"}</td>
                      <td>{row.DriverId || "N/A"}</td>
                      <td>{row.driver_fees || "N/A"}</td>
                      <td>{row.credit || "N/A"}</td>
                      <td>{row.debit || "N/A"}</td>
                      <td>{row.created_at || "N/A"}</td>
                    </tr>
                  ))}
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
          ) : (
            <p className="px-2">No orders available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Orders;
