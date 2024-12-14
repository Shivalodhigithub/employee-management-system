 

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

const Employee = () => {
  const [emp, setEmp] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://employee-management-system-e3di.onrender.com/auth/empolyee')
      .then((result) => {
        if (result.data.Status) {
          setEmp(result.data.empdata);
        } else {
          toast.warning("You don't have access");
        }
      })
      .catch((err) => {
        console.error('Internal server error', err);
        toast.error('Internal server error', { autoClose: 3000 });
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint for mobile devices
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const deleteEmp = (_id) => {
    axios
      .delete('https://employee-management-system-e3di.onrender.com/auth/employee/' + _id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload(); // Reload the page
        } else {
          toast.warning("Couldn't delete");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div
        className={`mt-3 ${isMobile ? '' : 'px-5'}`}
        style={isMobile ? { margin: '14px' } : {}}
      >
        <ToastContainer />
        <div className="d-flex justify-content-center align-items-center">
          <h3>Employee List</h3>
        </div>
        <Link to="/dashboard/add_employee" className="btn btn-success my-4">
          Add Employee
        </Link>
        <div className="table-responsive">
          <table className="table table-bordered table-hover border-primary">
            <thead>
              <tr>
                <th scope="col">S.no</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Salary</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {emp.map((val, ind) => (
                <tr key={ind}>
                  <th>{ind + 1}</th>
                  <td>{val.name}</td>
                  <td className="text-center">
                    <img
                      src={'https://employee-management-system-e3di.onrender.com/Images/' + val.img}
                      alt=""
                      className="img-fluid"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                      }}
                    />
                  </td>
                  <td>{val.salary}</td>
                  <td>{val.address}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/` + val._id}
                      className="btn btn-sm btn-success mx-1"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => deleteEmp(val._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;


