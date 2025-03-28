import React, { useContext, useEffect, useState } from 'react';
import './OrdersList.css';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import {Link} from 'react-router-dom';
import Title from '../../components/Title/Title';
import { AdminContext } from '../../context/AdminContext';

const OrdersList = () => {
    const{loading, getAllOrders, ordersList, setSelectedOrder, setShowDelete} = useContext(AdminContext);
    const[search, setSearch] = useState('');

    useEffect(()=>{
      getAllOrders();
    },[])

    const sortedOrders = [...ordersList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const filtredOrders = search ? sortedOrders.filter(o=>o.userName.toLowerCase().includes(search.toLowerCase())) : sortedOrders;
  return (
    <div className='orders-list page-container p-4'>
      <Title title='All Orders'/>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} type='search' placeholder='Search for an order...' className='search d-block ms-auto px-2 py-1 rounded border-1 mb-4'/>
      {loading ?(
        <div className="text-center my-5">
         <p className="fw-bold text-danger">Loading orders...</p>
        </div>
      ):(
        <>
        <div className='header container rounded py-2 mb-4' style={{border:'1px solid var(--red-color)'}}>
          <div className='row fw-medium'>
            <p className='col-lg-1'>ID</p>
            <p className='col-lg-2'>User</p>
            <p className='col-lg-2'>Total Price</p>
            <p className='col-lg-2'>Date</p>
            <p className='col-lg-2'>Status</p>
            <p className='col-lg-2'>Actions</p>
          </div>
        </div>
        <>
        {filtredOrders.map((order, index)=>(
          <div key={index} className='body rounded container py-2'>
            <div className='row align-items-center'>
              <p className='id col-1'>#{sortedOrders.length - index}</p>
              <p className='col-4 col-md-2  d-flex align-items-center gap-2'>{order.userName}</p>
              <p className='col-2 col-md-2 fw-medium'>{order.totalPrice} D.A</p>
              <p className='hide col-3 col-md-2'>{new Date(order.createdAt).toLocaleDateString()}</p>
              <p className='hide col-3 col-md-2'>{order.orderStatus}</p>
              <div className='actions col-2 col-md-2 d-flex gap-4'>
                <Link to={`/order-details/${order.id}`} className='position-relative'>
                  <i className="fa-solid fa-eye"></i>
                  <p className='position-absolute px-2 py-1 rounded'>Order Details</p>
                </Link>
                <Link to='' className='position-relative'>
                  <i onClick={()=>{setSelectedOrder(order);setShowDelete(true)}} className="fa-solid fa-trash"></i>
                  <p className='position-absolute px-2 py-1 rounded'>Delete order</p>
                </Link>
              </div>
            </div>
          </div>
        ))} 
        </>
        <DeletePopup state='order'/>
      </>)}
    </div>
  )
}

export default OrdersList
