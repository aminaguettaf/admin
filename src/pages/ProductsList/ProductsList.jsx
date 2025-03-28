import React, { useContext, useEffect, useState } from 'react'
import './ProductsList.css'
import Title from '../../components/Title/Title'
import { AdminContext } from '../../context/AdminContext'
import { Link, useNavigate } from 'react-router-dom'
import DeletePopup from '../../components/DeletePopup/DeletePopup'

const ProductsList = () => {
  const{setShowDelete, setSelectedProd, getAllProducts, productsList, loading} = useContext(AdminContext);
  const[search, setSearch] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    getAllProducts();
  },[])

  const sortedProducts = [...productsList].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const filtredProducts = search ? sortedProducts.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())) : sortedProducts;
  return (
    <div className='product-list page-container p-4'>
      <Title title='All Products'/>
      <div className='d-flex justify-content-end gap-4 mb-4'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type='search' placeholder='Search for a product...' className='search px-2 py-1 rounded border-1'/>
        <button onClick={()=>navigate('/add-product')} className='btn text-white' style={{backgroundColor:'var(--blue-color)'}}>Add a new product</button>
      </div>
      {loading ?(
        <div className="text-center my-5">
         <p className="fw-bold text-danger">Loading products...</p>
        </div>
      ):(
      <>
      <div className='header container rounded py-2 mb-4' style={{border:'1px solid var(--red-color)'}}>
        <div className='row fw-medium'>
          <p className='col-lg-1'>ID</p>
          <p className='col-lg-3'>Product</p>
          <p className='col-lg-1'>Price</p>
          <p className='col-lg-2'>Category</p>
          <p className='col-lg-1'>Available</p>
          <p className='col-lg-2'>Updated at</p>
          <p className='col-lg-2'>Actions</p>
        </div>
      </div>
      <>
      {filtredProducts.map((product, index)=>(
        <div key={index} className='body rounded container py-2'>
          <div className='row align-items-center'>
            <p className='id col-1'>#{sortedProducts.length - index}</p>
            <div className='col-4 col-md-3  d-flex align-items-center gap-2'>
              <div className='hide img'>
                <img src={product.image}/>
              </div>
              <p className='fw-semibold'>{product.name}</p>
            </div>
            <p className='col-2 col-md-1 fw-medium'>{product.price} D.A</p>
            <p className='hide col-3 col-md-2'>{product.category}</p>
            <p className='hide col-3 col-md-1'>{product.available === "1" ? 'Yes' : 'NO'}</p>
            <p className='hide col-3 col-md-2'>{product.created_at}</p>
            <div className='actions col-2 d-flex gap-4'>
              <Link to={`/update-product/${product.id}`} className='position-relative'>
                <i className="fa-solid fa-pen-to-square"></i>
                <p className='position-absolute px-2 py-1 rounded'>Update product</p>
              </Link>
              <Link className='position-relative'>
                <i onClick={()=>{setShowDelete(true); setSelectedProd(product)}} className="fa-solid fa-trash"></i>
                <p className='position-absolute px-2 py-1 rounded'>Delete product</p>
              </Link>
            </div>
          </div>
        </div>
      ))} 
      </>
      <DeletePopup state='product' />
    </>)}
    </div>
  )
}

export default ProductsList
