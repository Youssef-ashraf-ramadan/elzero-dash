import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./upload.css";

function UploadPage() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [fileInfo, setFileInfo] = useState(null);
  const [driversData, setDriversData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  const [isUploading, setIsUploading] = useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.warning("No file selected. Please choose a valid Excel file.");
      return;
    }

    try {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        type: file.type,
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          let data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          data = data.filter((row) =>
            row.some(
              (cell) => cell !== undefined && cell !== null && cell !== ""
            )
          );

          if (data.length < 2) {
            throw new Error("The Excel file is empty or improperly formatted.");
          }

          const [headers, ...rows] = data;

          const extractedDrivers = rows
            .map((row) => {
              const rowObj = Object.fromEntries(
                headers.map((header, index) => [header, row[index]])
              );
              return {
                name: rowObj["Driver Name"] || "",
              };
            })
            .filter((driver) => driver.name.trim());

          const extractedOrders = rows
            .map((row) => {
              const rowObj = Object.fromEntries(
                headers.map((header, index) => [header, row[index]])
              );
              return {
                order_number: rowObj["No"] || "",
                amount: rowObj["Amount"] || "",
                credit: rowObj["Driver Credit Amount"] || "0",
                debit: rowObj["Driver Depit Amount"] || "0",
                created_at: rowObj["Dispatch Time"] || "",
              };
            })
            .filter(
              (order) =>
                order.order_number.trim() &&
                (order.amount || order.credit.trim() || order.debit.trim())
            );

          setDriversData(extractedDrivers);
          setOrdersData(extractedOrders);
          toast.success("File parsed successfully!");
        } catch (parseError) {
          console.error("Error parsing file:", parseError);
          toast.error(parseError.message || "Failed to parse the file.");
        }
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("An unexpected error occurred while reading the file.");
    }
  };

  const handleSubmit = async () => {
    if (!ordersData.length && !driversData.length) {
      toast.warning("No valid data to upload. Please check your file.");
      return;
    }
  
    setIsUploading(true);
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or Redux
  
    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      setIsUploading(false);
      return;
    }
  
    try {
      // Upload drivers
      if (driversData.length) {
        try {
          await axios.post(
            "https://dev.brmjatech.uk/api/drivers",
            { data: driversData },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in headers
              },
            }
          );
          toast.success("Drivers uploaded successfully!");
        } catch (error) {
          if (error.response && error.response.status === 409) {
            toast.error("Driver data conflict detected. Possible duplicates.");
          } else {
            console.error("Error uploading drivers:", error);
            toast.error("An error occurred while uploading driver data.");
          }
        }
      }
  
      // Upload orders
      if (ordersData.length) {
        try {
          await axios.post(
            "https://dev.brmjatech.uk/api/orders",
            { data: ordersData },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in headers
              },
            }
          );
          toast.success("Orders uploaded successfully!");
        } catch (error) {
          if (error.response && error.response.status === 409) {
            toast.error("Order data conflict detected. Possible duplicates.");
          } else {
            console.error("Error uploading orders:", error);
            toast.error("An error occurred while uploading order data.");
          }
        }
      }
  
      setFileInfo(null);
      setDriversData([]);
      setOrdersData([]);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred while processing your request.");
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        <h1 className="fs-4">Upload Files</h1>
        <div className="table-container my-3 py-4 px-4 text-center">
          <div
            className="upload-area  border-dashed border-primary rounded p-2 d-flex flex-column align-items-center justify-content-center"
            style={{ borderStyle: "dashed", position: "relative" }}
          >
            <i className="bi bi-upload" style={{ fontSize: "30px" }}></i>
            <p className="mb-2 my-2">Click to upload File</p>
            <input
              type="file"
              className="form-control"
              style={{
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              accept=".xls,.xlsx"
              onChange={handleFileChange}
            />
          </div>

          {fileInfo && (
            <div className="file-info mt-3 text-start">
              <h5>File Information:</h5>
              <p>
                <strong>Name:</strong> {fileInfo.name}
              </p>
              <p>
                <strong>Size:</strong> {fileInfo.size}
              </p>
              <p>
                <strong>Type:</strong> {fileInfo.type}
              </p>
            </div>
          )}

          <button
            className="btn btn-primary add-admin-btn px-4 mt-3"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default UploadPage;
