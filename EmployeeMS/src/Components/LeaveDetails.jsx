import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';

const LeaveDetails = () => {

  // console.log(_id)
  const [leaveData, SetleaveData] = useState([]);
  const [show, SetShow] = useState(false)
  const [show1, SetShow1] = useState(false)
  const [show2, SetShow2] = useState(false)
  
  useEffect(() => {
    axios.get('https://employee-management-system-e3di.onrender.com/auth/leave').then((result) => {
      console.log(result)
      SetleaveData(result.data.leaveData);
    }).catch((err) => {
      console.log(err)
    });

  }, [])
  const reqleave = leaveData.filter((val, ind) => val.status != 'approved' && val.status != 'rejected')
  const pendleave = leaveData.filter((val, ind) => val.status == 'rejected')
  const acceptleave = leaveData.filter((val, ind) => val.status == 'approved')
  const numOfAccept = acceptleave.length
  const numofpend = pendleave.length
  const numOfReq = reqleave.length;


  return (
    <>
      <div className="cotainer">
        <ToastContainer />
        <div className="row my-5">
          <div className="col-10   mx-auto">
            <div className="row row-cols-1 row-cols-md-3 ">
              <div className=' shadow-lg border border-primary m-2 p-2 div-1 rounded-3' style={{ cursor: 'pointer' }} onClick={() => SetShow(!show)}>
                <h3>Leave Request</h3>
                <hr />
                <p style={{fontSize:'21px'}}>Total : <span>{numOfReq}</span></p>
              </div>
              <div className=' shadow-lg border border-primary m-2 p-2 div-3 rounded-3' style={{ cursor: 'pointer' }} onClick={() => SetShow1(!show1)}>
                <h3>Rejected Leave</h3>
                <hr />
                <p style={{fontSize:'21px'}}>Total : <span>{numofpend}</span></p>
              </div>
              <div className=' shadow-lg border border-primary m-2 p-2 div-2 rounded-3' style={{ cursor: 'pointer' }} onClick={() => SetShow2(!show2)}>
                <h3>Accepted Leave</h3>
                <hr />
                <p style={{fontSize:'21px'}}>Total : <span>{numOfAccept}</span></p>
              </div>
            </div>
            <hr className=' bg-primary' />
            {!show ? '' : <div className="row my-5">
              <div className="  col-10 mx-auto">
                <h2 className=''>Leave Request's</h2>
                {reqleave.map((val, ind) => {
                  return (
                    <RequestLeave key={ind} leave={val} index={ind} />
                  )

                })}
              </div>
            </div>}

            {!show1 ? '' : <div className="row my-5">
              <div className="col-10 mx-auto">
                <h2 className=''>Rejected Leave  </h2>
                {pendleave.map((val, ind) => {
                  return (
                    <RejectedLeave key={ind} leave={val} index={ind} />
                  )

                })}

              </div>
            </div>}

            {!show2 ? '' : <div className="row my-5">
              <div className="col-10 mx-auto">
                <h2 className=''>Accepted Leave  </h2>
                {acceptleave.map((val, ind) => {
                  return (
                    <RejectedLeave key={ind} leave={val} index={ind} />
                  )

                })}

              </div>
            </div>}


          </div>
        </div>
      </div>

    </>
  )
}

export default LeaveDetails

const RequestLeave = ({ leave, index }) => {
  // const {_id}=useParams();
  const Accept = (_id) => {

    axios.put('http://localhost:3000/auth/leave/' + _id, { status: 'approved' }).then((result) => {
      console.log(result)
      if (result.data.Status) {
        toast.success('Approved request', { autoClose: 3000, theme: 'colored' })
      }
      else {
        toast.warning('request failed', { autoClose: 3000, theme: 'colored' })
      }

    }).catch((err) => {
      console.log(err)
      toast.error('Internal Server Error', { autoClose: 3000, theme: 'colored' })

    });
  }

  const Reject = (_id) => {
    axios.put('http://localhost:3000/auth/leave/' + _id, { status: 'rejected' }).then((result) => {
      console.log(result)
      if (result.data.Status) {
        toast.success('Deny Leave request', { autoClose: 3000, theme: 'colored',position:'top-center' })
      }
      else {
        toast.warning('request failed', { autoClose: 3000, theme: 'colored' })
      }

    }).catch((err) => {
      console.log(err)
      toast.error('Internal Server Error', { autoClose: 3000, theme: 'colored' })

    });


  }
  return (
    <>

      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center shadow-lg my-2" style={{ height: '9vh' }}>
          <div className="number">
            <span>{index + 1}</span>
          </div>
          <div className="name">
          <p>Reason --  <span className=' text-primary'> {leave.reason} </span> </p>
            
          </div>
          <div className="type">

          </div>
          <div className="accept-reject">
            <button className=' btn btn-success mx-1' onClick={() => Accept(leave._id)}  >Accept</button>
            <button className=' btn btn-danger mx-1' onClick={() => Reject(leave._id)}>Deny</button>

          </div>
        </div>
      </div>
    </>

  )
}



const RejectedLeave = ({ leave, index }) => {
 
  return (
    <>

      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center shadow-lg my-2" style={{ height: '9vh' }}>
          <div className="number">
            <span>{index + 1}</span>
          </div>
          <div className="name">
          <p>Reason --  <span className=' text-primary'> {leave.reason} </span> </p>
            
          </div>
      
           
        </div>
      </div>
    </>

  )
}


