/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDashSidebar } from "../../redux/features/slices/dashSidebarSlice";
import "./dash-header.css";
import { Link } from "react-router-dom";

function DashHeader() {
  const [adminData, setAdminData] = useState(null);
  const dispatch = useDispatch();
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  return (
    <header className="dashboard dashboard-header">
      <div className="container">
        <button
          className="side-bar-toggle-btn btn btn-primary"
          onClick={() => dispatch(toggleDashSidebar())}
        >
   <i class="bi bi-grid-3x3-gap-fill"></i>
        </button>
        <div className="profile notification">
          <Link to={"/dashboard"} className="profile-img">
            <img
              src={adminData?.image || "/assets/images/doctor.png"}
              alt="avatar"
            />
          </Link>
          <div>
            <h4 className="fs-5">{name || "Elzero "}</h4>
            <p className="text-muted fs-6">{role || ""}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashHeader;
