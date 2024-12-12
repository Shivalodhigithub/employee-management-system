import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmpAttendence = () => {
    const navigate=useNavigate()
    const GoBack=(e)=>{
        e.perventDefault;
        navigate('/')
    }
  return (
    <>
    <div className="cotainer">
        <div className="row">
            <div className="col-10 mx-auto">
            <div className="div-atted  my-5 p-4 shadow-lg ">
                <h2> Your Attendence :- <span className=' text-info'>1/30</span></h2>
                <hr />
                <div className=' '>
                <button className=' btn btn-success' onClick={GoBack}>Go Back</button>
                </div>

            </div>

            </div>
        </div>
    </div>
      
    </>
  )
}

export default EmpAttendence
