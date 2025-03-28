import React, { useContext, useEffect } from 'react';
import './Categories.css';
import Title from '../../components/Title/Title';
import { AdminContext } from '../../context/AdminContext';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import {Link, useNavigate} from 'react-router-dom';

const Categories = () => {
    const{loading, getCategories, categories, setShowDelete, setSelectedCategory} = useContext(AdminContext);
    const navigate = useNavigate();
    useEffect(()=>{
        getCategories();
    },[])
    const sortedCategories = [...categories].sort((a, b)=> new Date(b.created_at) - new Date(a.created_at));
  return (
    <div className='categories page-container p-4'>
      <Title title='Categories'/>
      <button onClick={()=>navigate('/add-category')} className='add btn mb-4'>Add a new category</button>
      {loading? (
        <div className="text-center my-5">
            <p className="fw-bold text-danger">Loading categories...</p>
        </div>
       ):(
        <div>
            <div className='header container rounded py-2 mb-4' style={{border:'1px solid var(--red-color)'}}>
                <div className='row fw-medium'>
                    <p className='hide col-1'>ID</p>
                    <p className='col-3'>Name</p>
                    <p className='hide col-3'>Image</p>
                    <p className='hide col-3'>Updated at</p>
                    <p className='col-2'>Actions</p>
                </div>
            </div>
            <div>
                {sortedCategories.map((category, index)=>(
                    <div key={index} className='body rounded container py-2'>
                        <div className='row align-items-center'>
                            <p className='hide col-1'>#{sortedCategories.length - index}</p>
                            <p className='col-3'>{category.name}</p>
                            <div className='hide img'>
                                <img src={category.image}/>
                            </div>
                            <p className='hide col-3'>{category.created_at}</p>
                            <div className='actions col-2 d-flex gap-4'>
                                <Link to={`/update-category/${category.id}`} className='position-relative'>
                                   <i className="fa-solid fa-pen-to-square"></i>
                                   <p className='position-absolute px-2 py-1 rounded'>Update</p>
                                </Link>
                                <Link to='' className='position-relative'>
                                   <i onClick={()=>{setShowDelete(true); setSelectedCategory(category)}} className="fa-solid fa-trash"></i>
                                   <p className='position-absolute px-2 py-1 rounded'>Delete</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))} 
            </div>
        </div>
      )}
      <DeletePopup state='category'/>
    </div>
  )
}

export default Categories
