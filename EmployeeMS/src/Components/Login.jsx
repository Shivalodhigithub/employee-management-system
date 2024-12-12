import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import './start.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const loginData = (event) => {
    event.preventDefault();

    axios
      .post('https://employee-management-system-e3di.onrender.com/auth/adminlogin', values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem('valid', true);
          navigate('/dashboard');
        } else {
          setError(result.data.Error || 'Login failed. Please try again.');
          toast.error('Failed to login', { autoClose: 3000 });
        }
        setValues({
          email: '',
          password: '',
        });
      })
      .catch((err) => {
        console.error('Error from catch:', err);
        toast.error('An error occurred while logging in.', { autoClose: 3000 });
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center vh-100 align-items-center loginPage">
        <ToastContainer />
        <div className="p-3 rounded border loginForm custom-width">
          <div className="text-warning">{error && <p>{error}</p>}</div>
          <h2>Login Page</h2>
          <form onSubmit={loginData}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="form-control rounded-0"
                autoComplete="off"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="form-control rounded-0"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="terms" required />
              <label htmlFor="terms" className="form-check-label">
                I agree with the terms & conditions
              </label>
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Submit
            </button>
            <div className="my-3">
              <p>
                Don't have an account?{' '}
                <span>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Sign up
                  </a>
                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content bg-body-tertiary text-black">
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">
                            Sign up
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label htmlFor="signupName" className="form-label">
                                Name
                              </label>
                              <input type="text" className="form-control" id="signupName" required />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="signupEmail" className="form-label">
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="signupEmail"
                                required
                              />
                              <div className="form-text">We'll never share your email with anyone.</div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="signupPassword" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="signupPassword"
                                required
                              />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
