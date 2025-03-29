import React, { useContext, useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import './AddCategory.css';
import Title from '../../components/Title/Title';
import {toast} from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

const AddCategory = ({state}) => {
  const{url, categories} = useContext(AdminContext);
  const navigate = useNavigate();
  const params = useParams();
  const storedCategory = JSON.parse(localStorage.getItem(`category-${params.id}`));
  const category = categories.find(c=>c.id === params.id) || storedCategory;
  const[name, setName] = useState(category?.name || '');
  const [image, setImage] = useState(category?.image ||null);
  
  useEffect(() => {
    if (state === 'update' && params.id) {
      localStorage.setItem(`category-${params.id}`, JSON.stringify({ name, image }));
    }
  }, [name, image, params.id, state]);
  
  const onSubmitHandler = async(e)=>{
    try {
      e.preventDefault();
      let imageUrl = image;
      if(image instanceof File){
        const imageForm = new FormData();
        imageForm.append('image', image);
        const uploadResponse = await axios.post(`${url}/upload`, imageForm, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Accept": "application/json"
            }
          }
        );
      imageUrl = uploadResponse.data.image_url;
      }
      const formData = new FormData();
      formData.append('name', name);
      if(imageUrl){
        formData.append('image', imageUrl);
      }
      if(state === 'add'){
        const response = await axios.post(`${url}/category`, formData)
        if(response.data.success){
          toast.success(response.data.message);
          navigate('/categories');
          setImage(null);
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(`${url}/category/${category.id}`, formData);
        if(response.data.success){
          toast.success(response.data.message)
          navigate('/categories');
        }
        else{
          toast.error(response.data.message);
        }
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='add-category page-container p-4'>
      <Title title={state === 'add' ? 'Add Category' : 'Update Category'}/>
      <form onSubmit={onSubmitHandler}>
        <div>
          <p className='label mb-2 fw-medium'>Category Name</p>
          <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)} className='border px-2 py-1 rounded w-50' required/>
        </div>
        <div className='mt-4'>
          <p className='label mb-2 fw-medium'>Upload Image</p>  
          <div className='pic w-50'>
            <label htmlFor='pic' className='border position-relative w-100 rounded d-flex justify-content-center align-items-center' style={{height: '180px'}}>
              {!image ?
                <i className="fa-solid fa-upload" style={{color:'#666', fontSize:'24px', cursor: 'pointer'}}></i>:
                <div>
                  <img src={image instanceof File ? URL.createObjectURL(image) : image} alt=''/>
                  <i onClick={(e)=>{e.preventDefault(); setImage(false)}} className="fa-solid fa-xmark position-absolute z-10"></i>
                </div>
              }
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} id='pic' type='file' hidden/>
          </div>
        </div>
        <div className='mt-4 d-flex gap-2'>
          <Link to='/categories' className='btn border'>Back to categories list</Link>
          <button type='submit' className='btn sumbit'>{state === 'add' ? 'Add Category' : 'Update Category'}</button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
