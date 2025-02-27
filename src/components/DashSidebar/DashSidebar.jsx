import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeDashSidebar } from "../../redux/features/slices/dashSidebarSlice";
import "./dash-sidebar.css";

function DashSidebar() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
localStorage.removeItem("token");
  window.location.href="/"
  };

  return (
    <div className={`Dashsidebar ${isDashSidebarOpen ? "open" : "closed"}`}>
      <button
        className="close-btn btn btn-primary d-flex align-items-center justify-content-center"
        onClick={() => dispatch(closeDashSidebar())}
      >
        <i className="fa-solid fa-xmark"></i> 
      </button>
      <div className="heading">
        <div className="side-logo flex-column">
          <h1 className="text-black fs-3 mt-5 mb-0">Drivers</h1>
          <span className="d-block fw-bold fs-5" >Manegement</span>
        </div>
        <ul className="linkss">
          <li className={({ isActive }) => (isActive ? "active" : "")}>
            <NavLink to="/dashboard/home">
            <i className="fa-solid fa-house"></i> Dashboard
            </NavLink>
          </li>


          <li className={({ isActive }) => (isActive ? "active" : "")}>
  <NavLink to="/dashboard/admin">
    <i className="fa-solid fa-user-shield"></i> Admins
  </NavLink>
</li>

<li className={({ isActive }) => (isActive ? "active" : "")}>
  <NavLink to="/dashboard/suppliers-companies">
    <i className="fa-solid fa-building"></i>  Companies
  </NavLink>
</li>

<li className={({ isActive }) => (isActive ? "active" : "")}>
  <NavLink to="/dashboard/suppliers">
    <i className="fa-solid fa-truck-field"></i> Suppliers
  </NavLink>
</li>




          <li className={({ isActive }) => (isActive ? "active" : "")}>
            <NavLink to="/dashboard/upload">
            <i className="fa-solid fa-upload"></i> Upload
            </NavLink>
          </li>
          <li className={({ isActive }) => (isActive ? "active" : "")}>
            <NavLink to="/dashboard/orders">
            <i className="fa-solid fa-dolly"></i> Orders
            </NavLink>
          </li>
          <li className={({ isActive }) => (isActive ? "active" : "")}>
            <NavLink to="/dashboard/Drivers">
            <i className="fa-solid fa-truck-fast"></i> Drivers
            </NavLink>
          </li>
        </ul>
      </div>


      <div onClick={handleLogout} className="log-out" style={{ cursor:"pointer" }}>
    <i className="fa-regular fa-circle-user"></i>
    <p className="mb-0">Log out</p>
    <span className="log-btn">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
    </span>
</div>


      
    </div>
  );
}

export default DashSidebar;
