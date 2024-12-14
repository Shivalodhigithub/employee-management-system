import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const AddEmployee = () => {
    const [employee,SetEmployee]=useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        
        category_id:''
    })
    const [catData, SetcatData] = useState([])
    useEffect(() => {
      axios.get('http://localhost:3000/auth/category').then((result) => {
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
  
    }, [])

    //handle form data 
    const navigate=useNavigate();
    
    const handleFormData=(event)=>{
      event.preventDefault(); 
      const formData = new FormData();
       
      formData.append('name',employee.name)
      formData.append('email',employee.email)
      formData.append('password',employee.password)
      formData.append('salary',employee.salary)
      formData.append('address',employee.address)
       
      formData.append('category_id',employee.category_id)
       
      axios.post('http://localhost:3000/auth/empolyee', formData).then((result) => {
        console.log(result)
        if(result.data.Status){
          navigate('/dashboard/employee')
        }
        else{
          toast.info("'didn't add empolyee")
        }
 
      }).catch((err) => {
        toast.error(err,{autoClose:3000})
        console.log('internal server error',err)
      });
    }
  return (
    <>
      <div className="container">
      <ToastContainer/>
        <div className="row d-flex justify-content-center align-items-center">
            <div className=" col-10  col-md-6 border border-primary p-3  my-5 rounded-4 shadow">
            <h3 className=' text-center'>Add your Empolyee</h3>
            <form onSubmit={handleFormData}>
            <div class="mb-3">
    <label for="exampleInputName" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputName" onChange={(e)=>SetEmployee({...employee , name:e.target.value})}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>SetEmployee({...employee , email:e.target.value})}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e)=>SetEmployee({...employee , password:e.target.value})}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputSalary" class="form-label">Salary</label>
    <input type="string" class="form-control" id="exampleInputSalary" onChange={(e)=>SetEmployee({...employee , salary:e.target.value})}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="exampleInputAddress" onChange={(e)=>SetEmployee({...employee , address:e.target.value})}/>
  </div>
   
   {/* images  */}
  <div class="mb-3">
    <label for="exampleInputCategory" class="form-label">Select Category</label>
    <select name="category" id="category" className='form-select' onChange={(e)=>SetEmployee({...employee , category_id:e.target.value})}>
    {catData.map((val,ind)=>{
        return <option value={val._id}>{ val.CategoryName}</option>
    })}

    </select>
   
  </div>

  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary w-100">Add Empolyee</button>
</form>
            </div>
        </div>
      </div>
    </>
  )
}

export default AddEmployee
