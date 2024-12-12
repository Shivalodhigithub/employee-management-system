import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const[category,SetCategory]=useState({
      categoryName:'',
      departmentname:''
    })
    const navigate = useNavigate()
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('https://employee-management-system-e3di.onrender.com/auth/category',{category}).then((result) => {
            console.log(result)
            SetCategory({
              categoryName:'',
              departmentname:''
            })
            if(result.data.Status){
                toast.success("Add Successfully",{autoClose:2000})
                navigate('/dashboard/category')
            }
            else{
                toast.error("Add category fail'd",{autoClose:3000})

            }
             
            
        }).catch((err) => {
            console.log(err)
            toast.error('Internal Server Error',{autoClose:3000})
        });
        
    }
  return (
    <>
       
      <div className="cotainer d-flex justify-content-center align-items-center ">
      <ToastContainer />
      <div className="category border p-3  my-5 rounded-4 shadow">
      <h3>Add your Category</h3>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="categoryName" class="form-label">Add Category</label>
    <input type="text" name='categoryName' value={category.categoryName} class="form-control" autoComplete='off' id=""   onChange={(e)=>{SetCategory({...category,categoryName:e.target.value})}} placeholder='Enter category'/>
    </div>
    <div class="mb-3">
    <label for="departmentname" class="form-label">Add Department</label>
    <input type="text" name='departmentname' value={category.departmentname} class="form-control" autoComplete='off' id=""   onChange={(e)=>{SetCategory({...category,departmentname:e.target.value})}}placeholder='Enter department'/>
    </div>
   
  <button type="submit" class="btn btn-success w-100">Add</button>
</form>

      </div>
         
      </div>
    </>
  )
}

export default AddCategory
