import React from "react";
import { useSelector } from "react-redux";
import './home.css'
function Home() {
  const isDashSidebarOpen = useSelector(
    (state) => state.dashSidebar.isDashSidebarOpen
  );

  return (
    <section
      className={`dashboard dash-home ${isDashSidebarOpen ? "open" : ""} my-3`}
    >
      <div className="container">
        <div className="  my-3 py-4 px-4 text-center">
          <div className="row g-3 flex-wrap">
            
            <div className="col-lg-3 col-md-6">
              <div className="card statistic-card card-container shadow-sm">
                <div className="card-body  d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-start">
                    <h6 className="text-muted">Total Orders</h6>
                    <h4 className="mb-0">736</h4>
                  </div>
                  <div>
                    <i
                      className="bi bi-pie-chart"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="card statistic-card card-container card-container shadow-sm">
                <div className="card-body  d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-start">
                    <h6 className="text-muted">Total Drivers</h6>
                    <h4 className="mb-0">84</h4>
                  </div>
                  <div>
                    <i
                      className="bi bi-pie-chart"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
       
            <div className="col-lg-3 col-md-6">
              <div className="card statistic-card  card-container shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-start">
                    <h6 className="text-muted text-left">Completed Orders</h6>
                    <h4 className="mb-0">736</h4>
                  </div>
                  <div>
                    <i
                      className="bi bi-pie-chart"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="col-lg-3 col-md-6">
              <div className="card statistic-card card-container shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-start">
                    <h6 className="text-muted">Pending Orders</h6>
                    <h4 className="mb-0">0</h4>
                  </div>
                  <div>
                    <i
                      className="bi bi-pie-chart"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
