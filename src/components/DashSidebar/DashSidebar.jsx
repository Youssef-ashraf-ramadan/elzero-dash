import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeDashSidebar } from "../../redux/features/slices/dashSidebarSlice";
import "./dash-sidebar.css";

function DashSidebar() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );
  const dispatch = useDispatch();

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
          <span className="d-block fw-bold fs-5">Manegement</span>
        </div>
        <ul className="linkss">
          <li>
            <NavLink to="/dashboard" end>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msFilter: "",
                }}
              >
                <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path>
              </svg>{" "}
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/admin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msFilter: "",
                }}
              >
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
              </svg>
              Admins
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/suppliers-companies">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msFilter: "",
                }}
              >
                <path d="M18 2H6c-1.103 0-2 .897-2 2v17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zm0 18H6V4h12v16z"></path>
                <path d="M8 6h3v2H8zm5 0h3v2h-3zm-5 4h3v2H8zm5 .031h3V12h-3zM8 14h3v2H8zm5 0h3v2h-3z"></path>
              </svg>
              Companies
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/suppliers">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={"18px"}
                className="mx-1 "
                viewBox="0 0 448 512"
              >
                <path d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48l-59.9 0C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4l-59.9 0c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208l-12.4 0c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2L168 224c-22.1 0-40-17.9-40-40l0-14.4c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4l0 14.4c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z" />
              </svg>{" "}
              <span className="mx-1">Suppliers</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msFilter: "",
                }}
              >
                <path d="M13 19v-4h3l-4-5-4 5h3v4z"></path>
                <path d="M7 19h2v-2H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5z"></path>
              </svg>{" "}
              Upload
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/orders">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msFilter: "",
                }}
              >
                <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
                <circle cx="10.5" cy="19.5" r="1.5"></circle>
                <circle cx="17.5" cy="19.5" r="1.5"></circle>
              </svg>
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/drivers">

        <svg fill="none" height="24" stroke-width="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 19C8.10457 19 9 18.1046 9 17C9 15.8954 8.10457 15 7 15C5.89543 15 5 15.8954 5 17C5 18.1046 5.89543 19 7 19Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5"/><path d="M17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5"/><path d="M14 17V6.6C14 6.26863 13.7314 6 13.4 6H2.6C2.26863 6 2 6.26863 2 6.6V16.4C2 16.7314 2.26863 17 2.6 17H4.65" stroke="currentColor" stroke-linecap="round"/><path d="M14 17H9.05005" stroke="currentColor" stroke-linecap="round"/><path d="M14 9H19.6101C19.8472 9 20.0621 9.13964 20.1584 9.35632L21.9483 13.3836C21.9824 13.4604 22 13.5434 22 13.6273V16.4C22 16.7314 21.7314 17 21.4 17H19.5" stroke="currentColor" stroke-linecap="round"/><path d="M14 17H15" stroke="currentColor" stroke-linecap="round"/></svg>
              Drivers
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashSidebar;
