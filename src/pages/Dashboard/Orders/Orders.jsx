import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import baseUrl from "../../../api/baseURL";
import "./Orders.css";
import { Trash2 } from "lucide-react";

function Orders() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 15;

  // Fetch all orders once
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const response = await baseUrl.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Assume API returns an array of orders in response.data.data
        setOrders(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await baseUrl.delete(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 || response.status === 204) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        alert("Order successfully deleted.");
      } else {
        alert("Failed to delete the order. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while deleting order:", error);
      alert("An error occurred while deleting the order. Please try again.");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all orders?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await baseUrl.delete(`/orders/delete-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 || response.status === 204) {
        setOrders([]);
        alert("All orders have been successfully deleted.");
      } else {
        alert("Failed to delete all orders. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete all orders:", error);
      alert("Failed to delete all orders. Please try again.");
    }
  };

  // Client-side pagination logic
  const pageCount = Math.ceil(orders.length / rowsPerPage);
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
            <div className="alert alert-danger" role="alert">
              {error}
              <button
                className="btn btn-primary ms-3"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <p className="px-2">Loading...</p>
          ) : (
            <>
              <table id="example" className="table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Order Number</th>
                    <th>Amount</th>
                    <th>Driver Credit</th>
                    <th>Driver Debit</th>
                    <th>Dispatch Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.order_number}</td>
                      <td>{order.amount}</td>
                      <td>{order.credit}</td>
                      <td>{order.debit}</td>
                      <td>{order.created_at}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger d-flex justify-content-center py-2 w-100 align-items-center gap-1"
                          onClick={() => handleDelete(order.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length > rowsPerPage && (
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
        <div className="d-flex justify-content-center align-items-center mb-3">
          <button
            className="btn btn-danger d-flex align-items-center gap-2 px-4 py-2"
            onClick={handleDeleteAll}
            disabled={orders.length === 0}
          >
            <Trash2 size={20} />
            Delete All
          </button>
        </div>
      </div>
    </section>
  );
}

export default Orders;
