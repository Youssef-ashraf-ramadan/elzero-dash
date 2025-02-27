import React from "react";
function ResetPassword() {
    return (
        <section className="login-page">
          <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
            <div className="card  shadow-lg border-0">
              <div className="row g-0">
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                  <div>
                    <img
                      src="/assets/images/sign-in.svg" // Replace with actual illustration link
                      alt="Illustration"
                      width="600px"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-md-5 p-5 login-card mx-auto mt-5">
                  <div className="text-center">
                  <img src="https://th.bing.com/th/id/OIP.2ywbeWX_5q28GGDHG8r0PgHaHa?rs=1&pid=ImgDetMain" className="rounded-circle mb-3" width={'80px'} height= {'80px'} />
    
                  </div>
                  <h3 className="text-center mb-2">Reset Password                  </h3>
                  <p className="text-center mb-4 text-muted">
                  Enter your email address and we'll send you an email with instructions to reset your password.




                  </p>
                  <form>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                      />
                    </div>

    
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-3 0 rounded-2 shadow-sm"
                    >
                      Reset Password
                    </button>
    
                  </form>
                </div>
              </div>
            </div>
            <p className="text-center mt-3 text-white">
              Already have an account?{" "}
              <a href="#" className="text-primary text-white fw-bold text-decoration-none">
                Sign In
              </a>
            </p>
            ;
          </div>
        </section>
      );
}

export default ResetPassword;
