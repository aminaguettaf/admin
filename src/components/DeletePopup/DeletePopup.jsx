import React, { useContext } from 'react';
import './DeletePopup.css';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify';
import axios from 'axios';

const DeletePopup = () => {
  const { url,showDelete, setShowDelete, selectedProd, getAllProducts } = useContext(AdminContext);

  const removeProduct = async()=>{
    try {
      const response = await axios.delete(`${url}/products/${selectedProd.id}`);
      if(response.data.success){
        toast.success(response.data.message);
        setShowDelete(false);
        getAllProducts();
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return showDelete && (
    <div className='delete-popup rounded'>
      <p className='mb-4'>Are you sure you want to delete this product?</p>
      <div className='d-flex justify-content-end gap-2'>
        <button onClick={()=>removeProduct()} className='btn btn-danger'>Delete</button>
        <button onClick={() => setShowDelete(false)} className='btn btn-dark'>Cancel</button>
      </div>
    </div>
  );
};

export default DeletePopup;
