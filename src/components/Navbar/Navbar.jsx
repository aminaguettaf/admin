import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png'
import {Link, useNavigate} from 'react-router-dom';
import {AdminContext} from '../../context/AdminContext';
import {toast} from 'react-toastify';

const Navbar = () => {
  const{setToken}= useContext(AdminContext);
  const navigate = useNavigate('');

  const logout = ()=>{
    setToken('');
    localStorage.removeItem('token');
    toast.success('You have logged out');
    navigate('/');
  }
  return (
    <div className='navbar py-0'>
      <div className='container d-flex align-items-center'>
        <div className='left-navbar d-flex align-items-center gap-2'>
          <Link to='/'>
            <img src={logo} alt='logo' style={{width:'80px'}}/>
          </Link>
          <p className='border rounded-start-5 rounded-end-5  px-2 py-1 '>Admin</p>
        </div>
        <button onClick={logout} className='px-4 py-2 rounded-start-5 rounded-end-5 fw-medium text-white'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
