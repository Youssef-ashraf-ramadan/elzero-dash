import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import * as XLSX from "xlsx";
import "./upload.css";

function UploadPage() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target.result;
    
      try {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
    
        // Convert sheet to JSON with headers
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", range: 2});    
        console.log("Parsed Data:", jsonData);
        console.log(jsonData[0])
        // Process cleaned data
        const driverData = jsonData.map((row) => ({
          name: row["Driver Name"] || "",
          username: row["Driver Username"] || "",
          phone: row["Phone"] || "",
        }));
    
        const orderData = jsonData.map((row) => ({
          orderId: row["Order ID"] || "",
          refId: row["Ref. ID"] || "",
          amount: row["Order Amount"] || "",
        }));
    
        console.log("Driver Data:", driverData);
        console.log("Order Data:", orderData);
    
        // Post to APIs
        const driverResponse = await axios.post("/drivers", driverData);
        console.log("Driver Response:", driverResponse.data);
    
        const orderResponse = await axios.post("/orders", orderData);
        console.log("Order Response:", orderResponse.data);
    
        setUploadStatus("Data successfully uploaded.");
      } catch (error) {
        console.error("Error processing the file:", error);
        setUploadStatus("Failed to process the file.");
      }
    };
    

    reader.onerror = () => {
      console.error("File could not be read.");
      setUploadStatus("Failed to read the file.");
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container">
        <h1 className="fs-4">Upload Files</h1>
        <div className="table-container my-3 py-4 px-4 text-center">
          <div
            className="upload-area border border-dashed border-primary rounded p-2 d-flex flex-column align-items-center justify-content-center"
            style={{ borderStyle: "dashed", position: "relative" }}
          >
            <i className="bi bi-upload" style={{ fontSize: "30px" }}></i>
            <p className="mb-2 my-2">Drag & drop files here or click to upload</p>
            <input
              type="file"
              className="form-control"
              style={{
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                cursor: "pointer",
              }}
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
            />
          </div>
          {selectedFile && (
            <div className="file-info mt-3 text-start">
              <p><strong>File Name:</strong> {selectedFile.name}</p>
              <p><strong>File Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
              <p><strong>File Type:</strong> {selectedFile.type}</p>
            </div>
          )}
          <button className="btn btn-primary px-4 mt-3" onClick={handleSubmit}>
            Submit
          </button>
          {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
        </div>
      </div>
    </section>
  );
}

export default UploadPage;
