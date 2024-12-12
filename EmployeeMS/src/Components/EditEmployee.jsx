import React, { useState,useEffect } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEmployee = () => {
    const {_id}=useParams(); 
    const [employee,SetEmployee]=useState({
        name:'',
        email:'',
        salary:'',
        address:'', 
        category_id:''
    })
    
    const [catData, SetcatData] = useState([])

    useEffect(() => {
      axios.get('https://employee-management-system-e3di.onrender.com/auth/category').then((result) => {
        // console.log(result)
        if (result.data.Status) {
          SetcatData(result.data.categories)
  
        }
        else {
          toast.warning(result.data.Error, { autoClose: 3000 })
        } 
      }).catch((err) => {
        // toast.error('Internal Server Error', { autoClose: 3000 })
        console.log(err)
      });
       
      axios.get('https://employee-management-system-e3di.onrender.com/auth/employee/'+_id).then((result) => {
        // console.log(result)
         
        SetEmployee({
            ...employee,
            name:result.data.empdata.name,
            email:result.data.empdata.email,
  
            salary:result.data.empdata.salary,
            address:result.data.empdata.address,
             category_id:result.data.empdata.category
        })
      }).catch((err) => {
        console.log(err)
        
      });
  
    }, [])

const navigate=useNavigate()
    const handleForm=(event)=>{
        event.preventDefault();
         
        axios.put('https://employee-management-system-e3di.onrender.com/auth/employee/'+_id,employee).then((result) => {
            // console.log(result)
            if(result.data.Status){
              navigate('/dashboard/employee')
            }
            else{
              toast.warning("did'nt update record")
            }
            
        }).catch((err) => {
            console.log(err)
            
        });
    }

 
 
    
  return (
    <>
            <div className="container">
      <ToastContainer/>
        <div className="row d-flex justify-content-center align-items-center">
            <div className=" col-10  col-md-6 border border-primary p-3  my-5 rounded-4 shadow">
            <h3 className=' text-center'>Edit Empolyee Record</h3>
            <form onSubmit={handleForm} >
            <div class="mb-3">
    <label for="exampleInputName" class="form-label">Name</label>
    <input type="text" value={employee.name} class="form-control" id="exampleInputName" onChange={(e)=>SetEmployee({...employee , name:e.target.value})}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" value={employee.email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>SetEmployee({...employee , email:e.target.value})}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  
  <div class="mb-3">
    <label for="exampleInputSalary" class="form-label">Salary</label>
    <input type="string" value={employee.salary} class="form-control" id="exampleInputSalary" onChange={(e)=>SetEmployee({...employee , salary:e.target.value})}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputAddress" class="form-label">Address</label>
    <input type="text" value={employee.address} class="form-control" id="exampleInputAddress" onChange={(e)=>SetEmployee({...employee , address:e.target.value})}/>
  </div>
   
   
  <div class="mb-3">
    <label for="exampleInputCategory" class="form-label">Select Category</label>
    <select name="category" value={employee.category_id} id="category" className='form-select' onChange={(e)=>SetEmployee({...employee , category_id:e.target.value})}>
    {catData.map((val,ind)=>{
        return <option value={val._id}>{ val.CategoryName}</option>
    })}

    </select>
   
  </div>

  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary w-100">Edit Empolyee</button>
</form>
            </div>
        </div>
      </div>
      
    </>
  )
}

export default EditEmployee
