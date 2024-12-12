import React, { useEffect, useState } from 'react'
import {Outlet, useParams} from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar';
import './style.css'
const EmpDetails = () => {
    const {_id}=useParams();
    const [emp,SetEmp]=useState([])
    console.log(_id)
    useEffect(()=>{
        axios.get('https://employee-management-system-e3di.onrender.com/auth/employee/'+_id).then((result) => {
            console.log(result)
            SetEmp(result.data.empdata)
        }).catch((err) => {
            console.log(err)
            
        });

    },[])
    // const emp_img={
    //   height: '380px',
    // width: '380px',
    // borderRadius:' 100%'
    // }
  return (
    <>
      <Navbar empdata={emp} _id={_id}/>
      <div className="">
      <Outlet/>
        
      </div>

    </>
  )
}

export default EmpDetails
