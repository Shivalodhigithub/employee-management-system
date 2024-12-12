import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
const Home = () => {
  const [cntEmp,SetCountEmp]=useState(0);
  const [cntAdmin,SetCntAdmin]=useState(0);
  const [totalSalary,SettotalSalary]=useState(0);
  useEffect(()=>{
    totalEmp();
    totalAdmin();
    totalSal();

  },[])
  const totalEmp=()=>{
    axios.get('https://employee-management-system-e3di.onrender.com/auth/employee_cnt').then((result) => {
      // console.log(result)
      SetCountEmp(result.data.count)
    }).catch((err) => {
      console.log(err)
    });
  }

  const totalAdmin=()=>{
    axios.get('https://employee-management-system-e3di.onrender.com/auth/adminlogin_cnt').then((result) => {
      // console.log(result)
      SetCntAdmin(result.data.count)
    }).catch((err) => {
      console.log(err)
    });
  }

  const totalSal=()=>{
    axios.get('https://employee-management-system-e3di.onrender.com/auth/employee_cntsalary').then((result) => {
      // console.log(result)
      SettotalSalary(result.data.totalSalary)
    }).catch((err) => {
      console.log(err)
    });
  }
  return (
    <>
      <div className="container">
        <h2 className='my-3'>Dashboard</h2>
        <div className="row">
        <div className="col-10 mx-auto">
          <div className="row">
          <div className="col shadow rounded mx-3 div-1 ">
            <h4 className=' text-center'>Employee</h4>
            <hr />
            <h5>Total: {cntEmp}</h5>
          </div>
          <div className="col shadow rounded mx-3 div-2 ">
            <h4 className=' text-center'>Admin</h4>
            <hr />
            <h5>Total: {cntAdmin}</h5>
          </div>
          <div className="col  shadow rounded mx-3 div-3  ">
            <h4 className=' text-center'>Salary</h4>
            <hr />
            <h5>Total: ${totalSalary}</h5>
          </div>

          </div>
        </div>
           
        </div>
      </div>
    </>
  )
}

export default Home
