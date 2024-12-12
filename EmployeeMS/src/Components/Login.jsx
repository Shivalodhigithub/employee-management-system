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

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3000/auth/adminlogin', values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem('valid', true);
          navigate('/dashboard');
        } else {
          setError(result.data.Error);
          toast.error("Login Failed", { autoClose: 3000 });
        }
        setValues({ email: '', password: '' });
      })
      .catch((err) => {
        console.error("Error during login:", err);
      });
  };

  return (
    <>
      <div className='d-flex justify-content-center vh-100 align-items-center loginPage'>
        <ToastContainer />
        <div className='p-3 rounded border loginForm custom-width'>
          {error && <div className="text-warning">{error}</div>}
          <h2>Login Page</h2>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email:</strong></label>
              <input
                type="email"
                name="email"
                value={values.email}
                placeholder='Enter email'
                className='form-control rounded-0'
                autoComplete='off'
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor="password"><strong>Password:</strong></label>
              <input
                type="password"
                name="password"
                value={values.password}
                placeholder='Enter password'
                className='form-control rounded-0'
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>

            <div className='mb-3'>
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">Agree to terms & conditions</label>
            </div>

            <button className='btn btn-success w-100 rounded-0'>Submit</button>
          </form>

          {/* Signup Trigger */}
          <div className="my-3">
            <p>
              Don't have an account? 
              <span>
                <a href="#" data-bs-toggle="modal" data-bs-target="#signupModal">Sign up</a>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Signup Modal (Moved Outside Login Form) */}
      <div
        className="modal fade"
        id="signupModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="signupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-body-tertiary text-black">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="signupModalLabel">Sign up</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="signupName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="signupName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="signupEmail" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="signupEmail" />
                  <div className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="signupPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id="signupPassword" />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="signupTerms" />
                  <label className="form-check-label" htmlFor="signupTerms">I agree to the terms & conditions</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
