import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
 
import './style.css'
const EmpInfo = () => {
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
    const emp_img={
      height: '380px',
    width: '380px',
    borderRadius:' 100%'
    }
  return (
    <>
       
      <div className="cotainer">
        <div className="row">
          <div className="col-10 mx-auto ">
          <div className="row justify-content-center align-items-center mt-5">
            <div className="col-5">
             <h3>Hii,I'm</h3>
             <h5>{emp.name} , from {emp.address}</h5>
             <p>{emp.email}</p>
             {/* <p>{emp.category}</p> */}
            </div>
            <div className="col-5">
            <img src={"https://employee-management-system-e3di.onrender.com/Images/"+emp.img} alt="" className=' img-thumbnail img-fluid emp_img' style={emp_img} />

            </div>
          </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default EmpInfo
