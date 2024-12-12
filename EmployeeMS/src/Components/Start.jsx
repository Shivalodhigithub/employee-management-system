// import React, { useEffect } from 'react'
// import { Link,useNavigate } from 'react-router-dom'
// import axios from 'axios'
// const Start = () => {
//   const navigate=useNavigate();
//   axios.defaults.withCredentials = true;
//   useEffect(()=>{
//     axios.get('http://localhost:3000/auth/verifyuser').then((result) => {
//       // console.log(result)
//       if(result.data.Status){
//         if(result.data.role === 'admin'){
          
//           navigate('/dashboard') 
//         }
//         else{
//           navigate('/employeedetails/'+result.data._id)

//         }
//       }
 
//     }).catch((err) => {
//       console.log(err)
      
//     });

//   },[])

//   return (
//     <>
//                 <div className=' d-flex justify-content-center vh-100 align-items-center loginPage'> 
//             {/* <ToastContainer /> */}
//                 <div className=' p-3  w-25   rounded border loginForm'> <div className=" text-warning ">
//                 <h2 className=' text-center'>Login As</h2>
//                 <div className='d-flex justify-content-around align-items-center'>
//                     <button className=' btn btn-primary' onClick={()=>{navigate('/employeelogin')}}>Employee</button>
//                     <button className=' btn btn-primary' onClick={()=>{navigate('/adminlogin')}}>Admin</button>
//                 </div>
         
                       
//                     </div>
                     
                     
                     
//                 </div>
//             </div>
      
//     </>
//   )
// }

// export default Start

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './start.css'; // Import custom styles including media queries

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/verifyuser')
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/employeedetails/' + result.data._id);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <>
      <div className="d-flex flex-column justify-content-center vh-100 align-items-center loginPage">
        {/* Modal */}
        <div
          className="modal fade"
          id="credentialsModal"
          tabIndex="-1"
          aria-labelledby="credentialsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="credentialsModalLabel">
                  Login Credentials
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Admin Login:</strong>
                </p>
                <ul>
                  <li>
                    Email: <code>admin123@gmail.com</code>
                  </li>
                  <li>
                    Password: <code>admin@123</code>
                  </li>
                </ul>
                <p className="text-danger">
                  Note: The admin access is restricted and requires prior
                  permission. Please contact (9009613607) to gain access. For
                  seeing the working of the website you can use given
                  credentials. Thank you so much for visiting.
                </p>
                <p>
                  <strong>Employee Login:</strong>
                </p>
                <ul>
                  <li>
                    Email: <code>user123@gmail.com</code>
                  </li>
                  <li>
                    Password: <code>12345</code>
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-3 rounded border loginForm custom-width">
          <div className="text-warning">
            <h2 className="text-center">Login As</h2>
            <div className="d-flex flex-column flex-md-row justify-content-around align-items-center gap-3">
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  navigate('/employeelogin');
                }}
              >
                Employee
              </button>
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  navigate('/adminlogin');
                }}
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Trigger Modal Button */}
        <button
          type="button"
          className="btn btn-warning position-fixed top-0 end-0 m-3"
          style={{ zIndex: 1050 }}
          data-bs-toggle="modal"
          data-bs-target="#credentialsModal"
        >
          View Credentials
        </button>
      </div>
    </>
  );
};

export default Start;
