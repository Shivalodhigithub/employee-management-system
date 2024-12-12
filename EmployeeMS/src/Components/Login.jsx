import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import './start.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [values, Setvalues] = useState({
    email: '',
    password: ''

  })
  const [error, SetError] = useState(null)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const loginData = (event) => {
    event.preventDefault();

    // console.log(values)
    axios.post('https://employee-management-system-e3di.onrender.com/auth/adminlogin', values).then((result) => {
      // console.log(result.data)
      if (result.data.loginStatus) {
        // toast.success('Suceesfully login')
        localStorage.setItem("valid", true);
        navigate('/dashboard')

      }
      else {
        SetError(result.data.Error)
        toast.error("Fail'd Login", { autoClose: 3000 })

      }
      Setvalues({
        email: '',
        password: ''
      })


    }).catch((err) => {
      console.log("error from catch", err)

    });


  }

  return (
    <>
      <div className=' d-flex justify-content-center vh-100 align-items-center loginPage  '>
        <ToastContainer />
        <div className=' p-3  rounded border loginForm custom-width'> 
        <div className=" text-warning  ">
          {error && error}
          {/* <p> {error && error}</p> */}

        </div>
          <h2>Login Page</h2>

          <form action="" onSubmit={loginData}>
            <div className=' mb-3'>
              <label htmlFor="email"><strong>Email:</strong></label>
              <input type="email" name="email" value={values.email} id="" placeholder='Enter email' className=' form-control rounded-0' autoComplete='off' onChange={(e) => Setvalues({ ...values, email: e.target.value })} />
            </div>
            <div className=' mb-3' >
              <label htmlFor="password"> <strong>Password:</strong></label>
              <input type="password" name="password" value={values.password} id="" placeholder='Enter password' className=' form-control rounded-0' onChange={(e) => Setvalues({ ...values, password: e.target.value })} />
            </div>

            <div className=' mb-3' >
              <input type="checkbox" name="tick" id="tick-mark" />
              <label htmlFor="tick-mark">are your agree with term & condition</label> {/* Corrected label */}

            </div>
            <button className=' btn btn-success w-100 rounded-0'   >Submit</button>
            <div className="my-3">
              <p>Don't have an account ?:<span> <a href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Sign up</a>


                {/* <!-- Modal --> */}
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content bg-body-tertiary text-black">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Sign up</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                          </div>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                          </div>
                          <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" />
                          </div>
                          <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                          </div>
                          {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </div></span>  </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
