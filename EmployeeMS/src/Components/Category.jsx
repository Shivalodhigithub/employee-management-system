import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
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
      toast.error('Internal Server Error', { autoClose: 3000 })
      console.log(err)


    });

  }, [])


  // console.log(caty)
  return (
    <>
      <div className="px-5 mt-3">
        <ToastContainer />
        <div className=' d-flex justify-content-center align-items-center'>
          <h3 className=''>Category List</h3>
        </div>
        <Link to='/dashboard/add_category' className=' btn btn-success my-4'>Add Category</Link>
        <div className="row">
          <div className="col">
            <table class="table table-responsive  table-bordered border-primary  table-primary table-hover ">
              <thead>
                <tr className=' table-secondary'>
                  <th scope="col">S.no</th>
                  <th scope="col">Category </th>
                  <th scope="col">Department</th>

                </tr>
              </thead>
              <tbody>

                {catData.map((val, ind) => {
                  return (
                    <>
                      <tr>

                        <th scope="row">{ind+1}</th>
                        <td>{val.CategoryName}</td>
                        <td>{val.DepartmentName}</td>

                      </tr>

                    </>

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

export default Category


