import React, { useContext } from 'react';
import './DeletePopup.css';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify';
import axios from 'axios';

const DeletePopup = ({state}) => {
  const { url,showDelete, setShowDelete, selectedProd, getAllProducts, selectedOrder, getAllOrders, getCategories, selectedCategory} = useContext(AdminContext);

  const remove = async()=>{
    try {
      if(state === 'product'){
        const response = await axios.delete(`${url}/products/${selectedProd.id}`);
        if(response.data.success){
          toast.success(response.data.message);
          setShowDelete(false);
          getAllProducts();
        }
        else{
          toast.error(response.data.message)
        }
      }
      else if(state === 'order'){
        const response = await axios.delete(`${url}/orders/${selectedOrder.id}`)
        if(response.data.success){
          toast.success(response.data.message);
          setShowDelete(false);
          getAllOrders();
        }
        else{
          toast.error(response.data.message)
        }
      }else if(state === 'category'){
        const response = await axios.delete(`${url}/category/${selectedCategory.id}`);
        if(response.data.success){
          toast.success(response.data.message);
          setShowDelete(false);
          getCategories();
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return showDelete && (
    <div className='delete-popup rounded'>
      <p className='mb-4'>Are you sure you want to delete this 
        <span> {state === 'product' ? 'product' : state === 'order' ? 'order' : 'category'} </span>
      </p>
      <div className='d-flex justify-content-end gap-2'>
        <button onClick={()=>remove()} className='btn btn-danger'>Delete</button>
        <button onClick={() => setShowDelete(false)} className='btn btn-dark'>Cancel</button>
      </div>
    </div>
  );
};

export default DeletePopup;
