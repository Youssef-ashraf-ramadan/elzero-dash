import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "./Orders.css";

function Orders() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  // Sample data
  const data = [
    { id: "4", orderNumber: "3232324323232", Amount : "21212", DriverId: "212121",  driverFees: "63", driverCredit: "3232", driverDebit: "$170,750", DespatchTime : "20 h" },
    { id: "5", orderNumber: "3232324323232", Amount : "21212", DriverId: "2121",  driverFees: "32", driverCredit: "323223", driverDebit: "$86,000", DespatchTime : "20 h" },
    { id: "6", orderNumber: "3232324323232", Amount : "21212", DriverId: "3232332",  driverFees: "22", driverCredit: "212112", driverDebit: "$433,060" , DespatchTime : "20 h"},
    { id: "6", orderNumber: "3232324323232", Amount : "21212", DriverId: "3232332",  driverFees: "22", driverCredit: "212112", driverDebit: "$433,060" , DespatchTime : "20 h"},
    { id: "6", orderNumber: "3232324323232", Amount : "21212", DriverId: "3232332",  driverFees: "22", driverCredit: "212112", driverDebit: "$433,060" , DespatchTime : "20 h"},
    { id: "6", orderNumber: "3232324323232", Amount : "21212", DriverId: "3232332",  driverFees: "22", driverCredit: "212112", driverDebit: "$433,060" , DespatchTime : "20 h"},
    { id: "6", orderNumber: "3232324323232", Amount : "21212", DriverId: "3232332",  driverFees: "22", driverCredit: "212112", driverDebit: "$433,060" , DespatchTime : "20 h"},
    { id: "6", orderNumber: "3232324323232", Amount : "21212", DriverId: "3232332",  driverFees: "22", driverCredit: "212112", driverDebit: "$433,060" , DespatchTime : "20 h"},
    { id: "6", orderNumber: "3232324323232", Amount : "21212", DriverId: "3232332",  driverFees: "22", driverCredit: "212112", driverDebit: "$433,060" , DespatchTime : "20 h"},
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 8;

  const pageCount = Math.ceil(data.length / rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayData = data.slice(
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
          <table id="example" className="table " style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Number</th>
                <th>Amount</th>
                <th>Driver Id</th>
                <th>Driver Fees</th>
                <th>Driver Credit </th>
                <th>Driver Debit </th>
                <th>Dispatch Time</th>

              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.orderNumber}</td>
                  <td>{row.Amount}</td>
                  <td>{row.DriverId}</td>
                  <td>{row.driverFees}</td>
                  <td>{row.driverCredit}</td>
                  <td>{row.driverDebit}</td>
                  <td>{row.DespatchTime}</td>

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
        </div>
      </div>
    </section>
  );
}

export default Orders;
