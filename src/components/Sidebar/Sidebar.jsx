import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul className='pt-4'>
        <li><Link to='/' className='p-3 d-inline-block w-full'><i className="fa-solid fa-house me-2 fa-fw"></i><span>Dashboard</span> </Link></li>
        <li><Link to='/orders' className='p-3 d-inline-block'><i className="fa-solid fa-list me-2 fa-fw"></i><span>Orders</span></Link></li>
        <li><Link to='/add-product' className='p-3 d-inline-block'><i className="fa-solid fa-plus me-2 fa-fw"></i><span>Add Product</span></Link></li>
        <li><Link to='/products-list' className='p-3 d-inline-block'><i className="fa-solid fa-p me-2 fa-fw"></i><span>Products List</span></Link></li>
        <li><Link to='/add-category' className='p-3 d-inline-block'><i className="fa-solid fa-table-columns me-2 fa-fw"></i><span>Add category</span></Link></li>
        <li><Link to='/add-user' className='p-3 d-inline-block'><i className="fa-solid fa-user me-2 fa-fw"></i><span>Add New User</span></Link></li>
        <li><Link to='/users-list' className='p-3 d-inline-block'><i className="fa-solid fa-users me-2 fa-fw"></i><span>Users List</span></Link></li>
      </ul>
      <div className='position-fixed bottom-0 d-block text-center fw-medium' style={{height:'30px', width:'20%'}}>Made with <span className='ms-2' style={{color:'var(--red-color)'}}><i className="fa-solid fa-heart"></i></span></div>
    </div>
  )
}

export default Sidebar
