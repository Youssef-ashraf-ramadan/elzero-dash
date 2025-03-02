/* eslint-disable react/prop-types */
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDashSidebar } from "../../redux/features/slices/dashSidebarSlice";
import "./dash-header.css";
import { Link } from "react-router-dom";

function DashHeader() {
  const [adminData, _] = useState(null);
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <header className="dashboard dashboard-header">
      <div className="container">
        <button
          className="side-bar-toggle-btn btn btn-primary"
          onClick={() => dispatch(toggleDashSidebar())}
        >
          <i class="fa-solid fa-bars"></i>{" "}
        </button>
        <div className="profile notification">
          <Link to={"/dashboard"} className="profile-img">
            <img
              src={adminData?.image || "/assets/images/doctor.png"}
              alt="avatar"
            />
          </Link>
          <div>
            <h5 className="fs-6 mb-1">{name || "Elzero "}</h5>
            <p className="text-muted fs-6">{role || ""}</p>
          </div>
          <div className="dropdown">
            <i
              className="fa fa-chevron-down "
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            ></i>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li onClick={handleLogout}>
                <a className="dropdown-item" href="#">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>   Log out
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashHeader;
