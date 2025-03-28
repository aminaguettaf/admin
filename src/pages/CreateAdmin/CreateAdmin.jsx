import React, { useContext, useState } from 'react';
import './CreateAdmin.css';
import Title from '../../components/Title/Title';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateAdmin = () => {
  const{url} = useContext(AdminContext);
  const navigate = useNavigate();
  const[data, setData] = useState({
    name: '',
    email:'',
    password:''
  })

  const onChangeHandler = (e)=>{
    const {name, value} = e.target;
    setData((prev)=>({...prev, [name]:value}))
  }

  const onSubmitHandler = async(e)=>{
    try {
      e.preventDefault();
      const response = await axios.post(`${url}/admin/create`, data);
      if(response.data.success){
        toast.success(response.data.message);
        navigate('/users-list');
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='create-admin page-container p-4'>
        <Title title='Create Admin'/>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <p className='label mb-2 fw-medium'>Admin Name</p>
            <input type='text' name='name' value={data.name} onChange={onChangeHandler} className='border px-2 py-1 rounded w-50' required/>
          </div>
          <div className='mb-4'>
            <p className='label mb-2 fw-medium'>Admin Email</p>
            <input type='text' name='email' value={data.email} onChange={onChangeHandler} className='border px-2 py-1 rounded w-50' required/>
          </div>
          <div className='mb-4'>
            <p className='label mb-2 fw-medium'>Admin Password</p>
            <input type='password' name='password' value={data.password} onChange={onChangeHandler} className='border px-2 py-1 rounded w-50' required/>
          </div>
          <button className='btn rounded py-2 px-4 text-white' type='submit' style={{backgroundColor:'var(--blue-color)'}}>Create Admin</button>
        </form>
    </div>
  )
}

export default CreateAdmin
