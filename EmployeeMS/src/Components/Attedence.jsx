import React, { useEffect, useState } from 'react'
import axios from 'axios'
 

 


const Attedence = () => {
    const [d , Setd] = useState([])
    useEffect(()=>{
        axios.get('https://sheetdb.io/api/v1/0qdzi2jyk29hk').then((result) => {
            Setd(result.data)
            console.log(result)
            
        }).catch((err) => {
            console.log(err)
        });

 
    
    },[])
    const ad=d.map((val,ind)=>{
        return val['Gate Number']
    })
    // console.log(ad)
 

   
  return (
    <>
      
      <div className="container">
      
      <div className="alert alert-warning text-center mt-3" role="alert">
          Attendance system is implemented using <strong>RFID (Radio Frequency Identification)</strong>. It will only work when connected to the <strong>NodeMCU</strong>.
        </div>

        <div className="row">
             <div className="container mt-5">
              <h3 className='text-center p-3 '>Employee's Attendence</h3>
              <table class="table table-responsive table-bordered border-primary table-hover table-info">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Employee Id</th>
      <th scope="col">Name</th>
      <th scope="col">Date</th>
      <th scope="col">Time IN</th>
      <th scope="col">Time OUT</th>
      <th scope="col">Gate Number</th>
    </tr>
  </thead>
  <tbody>
  {d.map((val,ind)=>{
    return (
        <tr>
      <th scope="row">{ind+1}</th>
      <td>{val['Student Id']}</td>
      <td>{val['First Name' ] +" " + val['Last Name']}</td>
      <td>{val.Date}</td>
      <td>{val["Time In"]}</td>
      <td>{val["Time Out"]}</td>
      <td>{val["Gate Number"]}</td>
    </tr>
        
    )
  })}
    
  </tbody>
</table>
 
             </div>
        </div>
      </div>
    </>
  )
}

export default Attedence
