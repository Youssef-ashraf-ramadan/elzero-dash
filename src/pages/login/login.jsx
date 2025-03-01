import React from "react";
import './login.css'
import { Toaster } from "react-hot-toast";

import useLogin from './../../hooks/Auth/useLogin';
function LoginPage() {
  const { credentials, errors, handleChange, handleSubmit, isLoading, error } = useLogin();

  return (
    <section className="login-page">
                  <Toaster />

      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
        <div className="card  shadow-lg border-0">
          <div className="row g-0">
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
              <div>
                <img
                  src="/assets/images/image-del.png" 
                  alt="Illustration"
                  width="600px"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-5 p-5 my-5 login-card mx-auto">
              <div className="text-center">
              <img src="https://th.bing.com/th/id/OIP.2ywbeWX_5q28GGDHG8r0PgHaHa?rs=1&pid=ImgDetMain" className="rounded-circle mb-3" width={'80px'} height= {'80px'} />

              </div>
              <h3 className="text-center mb-2">Sign In</h3>
              <p className="text-center mb-4 text-muted">
                Enter your email address and password to login
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                      onChange={handleChange}
                  />
                                                        {errors.email && <p className="text-danger">{errors.email}</p>}

                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                    {error && (
                    <ul className="text-danger">
                      {Array.isArray(error)
                        ? error.map((err, index) => <li key={index}>{err}</li>)
                        : <li>{typeof error === "string" ? error : JSON.stringify(error)}</li>}
                    </ul>
                  )}
                  {/* <Link to="/reset-password" className="text-primary small float-end mt-1">
                    Reset password
                  </Link> */}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ margin: "10px 0" }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sign in" : "Sign in"}
                  </button>

              </form>
            </div>
          </div>
        </div>

        ;
      </div>
    </section>
  );
}

export default LoginPage;
