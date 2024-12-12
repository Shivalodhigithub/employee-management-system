import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Navbar = ({ empdata ,_id }) => {
  console.log(_id)
  const navigate=useNavigate()
  const handleLogOut=()=>{
    axios.get('http://localhost:3000/auth/employeelogout').then((result) => {
      console.log(result)
      if(result.data.Status){
        // localStorage.removeItem("valid")//protected route
        navigate('/')
      }
      else{
        alert('network issue')
      }
      
    }).catch((err) => {
      console.log(err)
      
    });
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg emp-navbar">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">{empdata.name}</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className='nav-link' to='/'>Home</Link>
              </li>
              <li className="nav-item">
 
                <Link className='nav-link' to={`/employeedetails/${_id}/leave`}>Leave</Link>
              </li>
              {/* <li className="nav-item">
                <Link className='nav-link' to='/query'>Query</Link>
              </li> */}
              <li className="nav-item">
                <Link className='nav-link' to={`/employeedetails/${_id}/attendence`}>Attendance</Link>
              </li>
            </ul>
            <div className="logout">
              <li className="nav-item text-white d-flex justify-content-center align-items-center" onClick={handleLogOut}>
              <Link className='nav-link'> 
              <i className='fs-4 bi-power ms-2'></i>
                <span className='ms-2 d-none d-sm-inline'>Log out</span>
              </Link>
                 
              </li>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
