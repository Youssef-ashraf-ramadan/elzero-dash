import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./upload.css";
import baseUrl from "../../../api/baseURL";

function UploadPage() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [fileInfo, setFileInfo] = useState(null);
  const [driversData, setDriversData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

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
          const sheetName = workbook.SheetNames[0]; // Get the first sheet
          const sheet = workbook.Sheets[sheetName];
          let data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to 2D array

          // Remove empty rows and columns
          data = data.filter((row) =>
            row.some(
              (cell) => cell !== undefined && cell !== null && cell !== ""
            )
          );
          data = data.map((row) =>
            row.filter(
              (cell) => cell !== undefined && cell !== null && cell !== ""
            )
          );

          if (data.length < 2) {
            throw new Error("The Excel file is empty or improperly formatted.");
          }

          // Extract drivers and orders data from sheet
          const [headers, ...rows] = data;

          const extractedDrivers = rows
            .map((row) => {
              const rowObj = Object.fromEntries(
                headers.map((header, index) => [header, row[index]])
              );
              return {
                name: rowObj["Driver Name"] || "",
                created_at: new Date().toISOString(),
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
                driver_id: rowObj["Driver ID"] || "",
                credit: rowObj["Driver Credit Amount"] || "0",
                debit: rowObj["Driver Depit Amount"] || "0",
                created_at: rowObj["Dispatch Time"] || "",
              };
            })
            .filter(
              (order) =>
                order.order_number.trim() &&
                order.driver_id.trim() &&
                (order.amount || order.credit.trim() || order.debit.trim())
            );

          setDriversData(extractedDrivers);
          setOrdersData(extractedOrders);
          toast.success("File parsed successfully!");
        } catch (parseError) {
          console.error("Error parsing file:", parseError);
          toast.error(
            "Failed to parse the file. Ensure the file format is correct."
          );
        }
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("An unexpected error occurred while reading the file.");
    }
  };

  const handleSubmit = async () => {
    console.log(ordersData);
    console.log(driversData);
    if (!driversData.length && !ordersData.length) {
      toast.warning("No valid data to upload. Please check your file.");
      return;
    }

    try {
      if (ordersData.length > 0) {
        await axios.post(`${baseUrl}/orders`, ordersData);
      }
      if (driversData.length > 0) {
        await axios.post(`${baseUrl}/drivers`, driversData);
      }

      toast.success("Data uploaded successfully!");
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        console.error("Server Error:", error.response.data);
        toast.error(
          `Server error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        // No response received
        console.error("Network Error:", error.request);
        toast.error("Network error. Please check your connection or server.");
      } else {
        // Other unexpected error
        console.error("Unexpected Error:", error.message);
        toast.error(`Unexpected error: ${error.message}`);
      }
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
            className="upload-area border border-dashed border-primary rounded p-2 d-flex flex-column align-items-center justify-content-center"
            style={{ borderStyle: "dashed", position: "relative" }}
          >
            <i className="bi bi-upload" style={{ fontSize: "30px" }}></i>
            <p className="mb-2 my-2">
              Drag & drop files here or click to upload
            </p>
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

          <button className="btn btn-primary px-4 mt-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}

export default UploadPage;
