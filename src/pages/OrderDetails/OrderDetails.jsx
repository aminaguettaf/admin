import React, { useContext, useEffect, useState } from 'react';
import './OrderDetails.css';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const OrderDetails = () => {
    const navigate = useNavigate();
    const{ordersList, url} = useContext(AdminContext);
    const params = useParams();
    const order = ordersList?.find(o=>o.id === params.id);
    const[status, setStatus] = useState(localStorage.getItem(`orderStatus-${params.id}`) || 'Received');
    
    useEffect(() => {
      if (!localStorage.getItem(`orderStatus-${params.id}`)) {
        setStatus('Received');
        localStorage.setItem(`orderStatus-${params.id}`, 'Received');
      }
    }, [params.id]);

    const onSubmitHandler = async(e)=>{
      try {
        e.preventDefault();
        const response = await axios.post(`${url}/orders/${order.id}`, { orderStatus: status });
        if(response.data.success){
          toast.success(response.data.message);
          navigate('/orders')
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  return (
    <form onSubmit={onSubmitHandler} className='order page-container p-4'>
      <Title title='Order Details'/>
      <div className='user-infos d-flex pb-3'>
        <div className='flex-grow-1'>
            <p className='mb-3'><span className='fw-medium me-2'>User:</span> <span className='text-secondary'>{order?.userName}</span></p>
            <p className='mb-3'><span className='fw-medium me-2'>Phone Number:</span> <span className='text-secondary'>{order?.userNumber}</span></p>
            <p className='mb-3'><span className='fw-medium me-2'>Email:</span> <span className='text-secondary'>{order?.email}</span></p>
            <p className='mb-3'><span className='fw-medium me-2'>Adress:</span> <span className='text-secondary'>{order?.adress}</span></p>
        </div>
        <div className='flex-grow-1'>
            <p className='mb-3'><span className='fw-medium me-2'>Order Date:</span> <span className='text-secondary'>{new Date(order?.createdAt).toLocaleDateString()}</span></p>
            <div>
              <span className='fw-medium me-2'>Order Status:</span> 
              <select className='px-2 text-secondary' value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value='Received'>Received</option>
                <option value='Processing'>Processing</option>
                <option value='Shipped'>Shipped</option>
                <option value='Delivered'>Delivered</option>
                <option value='Cancelled'>Cancelled</option>
              </select>
            </div>
        </div>
      </div>
      <div className='products-infos mt-4'>
        <div className='header container mb-3'>
          <div className='row'>
            <p className='col-3 fw-medium'>Product</p>
            <p className='col-3  fw-medium'>Price</p>
            <p className='col-2 fw-medium'>Color</p>
            <p className='col-md-2 fw-medium'>Size</p>
            <p className='col-md-1 fw-medium'>Quantity</p>
            </div>
        </div>
        <div className='container mb-4'>
            {order?.items?.map((item, index)=>(
              <div key={index} className='row mb-2'>
                <p className='col-3 text-secondary'>{item?.name}</p>
                <p className='col-3 text-secondary'>{item?.price} D.A</p>
                <p className='col-2 text-secondary'>{item?.color}</p>
                <p className='col-1 col-md-2 text-secondary'>{item?.size}</p>
                <p className='col-1 col-md-2 text-secondary'>{item?.quantity}</p>
              </div>  
            ))} 
        </div>
        <p className='text-end p-4'><span className='fw-bold'>Total Price:</span> <span className='text-secondary'>{order.totalPrice} D.A</span></p>
      </div>
      <div className='d-flex justify-content-end gap-4 my-4'>
        <button className='btn border' onClick={()=>navigate('/orders')}>Back to orders list</button>
        <button className='btn text-white' type='submit' style={{backgroundColor:'var(--blue-color)'}}>Update order</button>
      </div>
    </form>
  )
}

export default OrderDetails
