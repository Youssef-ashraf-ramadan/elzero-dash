import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./upload.css";

function UploadPage() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  const [fileInfo, setFileInfo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB
        type: file.type,
      });
    } else {
      setFileInfo(null);
    }
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
                cursor: "pointer",
              }}
              onChange={handleFileChange}
            />
          </div>

          {fileInfo && (
            <div className="file-info mt-3 text-start">
              <h5>File Information:</h5>
              <p><strong>Name:</strong> {fileInfo.name}</p>
              <p><strong>Size:</strong> {fileInfo.size}</p>
              <p><strong>Type:</strong> {fileInfo.type}</p>
            </div>
          )}

          <button className="btn btn-primary px-4 mt-3">Submit</button>
        </div>
      </div>
    </section>
  );
}

export default UploadPage;
