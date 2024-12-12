import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer , toast} from 'react-toastify';
import './style.css'
 
 

const LeaveEmployee = () => {
    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const {_id}=useParams()
  const navigate = useNavigate()
  // console.log("leave:", _id)
  const handleSubmit = async (e) => {
     
     
    e.preventDefault();
    // console.log(`/employeedetails/${_id}/leave`)
    axios.post(`http://localhost:3000/employeedetails/${_id}/leave`,{ startDate, endDate, reason }).then((result) => {
      console.log(result)
      if(result.data.Status){
        alert("Sent Leave Request")
        // toast.success('Sent Successfully Leave request',{autoClose:3000,position:'top-center'})
        navigate('/')
         
      }
      else{
        toast.error(result.data.Error,{autoClose:3000,position:'top-center'})
      }
      setStartDate('')
      setEndDate('')
      setReason('')
      
    }).catch((err) => {
      console.log(err)
      toast.info("Internal Server Error")
      
    });
  };
  return (
    <>
     
       <div className=' d-flex justify-content-center align-items-center my-5 row '>
       <ToastContainer/>
       <div className=' shadow-lg p-2  form-div  col-6'> 
      <form onSubmit={handleSubmit} className=''>
      
      <h2 className=' h2'>Apply for Leave</h2>
      <div className="mb-3">
        <label htmlFor="" className=' form-label'>Start Date</label>
        <input type="date" value={startDate} className=' form-control' onChange={(e) => setStartDate(e.target.value)} required /> 
      </div>
    
        <div className="mb-3"> 
        <label className=' form-label'>End Date:</label>
        <input type="date" value={endDate} className=' form-control' onChange={(e) => setEndDate(e.target.value)} required  /> 
        </div>
        <div className="mb-3"> 
        <label className=' form-label'>Reason:</label>
        <textarea value={reason} className=' form-control' onChange={(e) => setReason(e.target.value)} required  /> 
        </div>
        <button type="submit" className=' btn btn-outline-secondary'>Submit</button>
        
      </form>
      </div>
    </div>
    </>
  )
}

export default LeaveEmployee
