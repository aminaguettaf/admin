import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const Login = () => {
    const {url, setToken} = useContext(AdminContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(`${url}/admin/login`, {email, password});
            if(response.data.success){
                setToken(response.data.token);
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token);
            }
            else{
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
    <div className='login'>
        <h3 className='text-center fw-bold'> Login </h3>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3'>
                <p className='mb-1'>Email</p>
                <input type='email' className='w-100 px-2 py-1 rounded' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className='mb-3'>
                <p className='mb-1'>Password</p>
                <input type='password' className='w-100 px-2 py-1 rounded' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
            </div>
            <button type='submit' className='mb-3 w-100 px-2 py-1 rounded'>Login</button>
        </form>
    </div>
  )
}

export default Login
