import React, { useContext, useEffect, useState } from 'react';
import './UsersList.css';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const UsersList = () => {
  const{loading, users, getAllUsers} = useContext(AdminContext);
  const[search, setSearch] = useState('');

   useEffect(()=>{
    getAllUsers();
   },[])
  
  const filtredUsers = search ? users.filter(u=>u.name.toLowerCase().includes(search.toLowerCase())) : users;
  return (
    <div className='users page-container p-4'>
      <Title title='Users List'/>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} type='search' placeholder='Search for an user...' className='search d-block ms-auto px-2 py-1 rounded border-1 mb-4'/>
      {loading? (
        <div className="text-center my-5">
            <p className="fw-bold text-danger">Loading users...</p>
        </div>
       ):(
        <div>
          <div className='header container rounded py-2 mb-4' style={{border:'1px solid var(--red-color)'}}>
            <div className='row fw-medium'>
              <p className='hide col-1'>ID</p>
              <p className='col-3'>Name</p>
              <p className=' col-3'>Role</p>
              <p className='hide col-3'>Updated at</p>
              <p className='col-2'>Actions</p>
            </div>
          </div>
          <div>
            {filtredUsers.map((user, index)=>(
              <div key={index} className='body rounded container py-2'>
                <div className='row align-items-center'>
                  <p className='hide col-1'>#{index + 1}</p>
                  <p className='col-3'>{user.name}</p>
                  <p className='col-3 text-capitalize'>{user.role}</p>
                  <p className='hide col-3'>{new Date(user.created_at).toLocaleDateString()}</p>
                  <div className='actions col-2 d-flex gap-4'>
                    <Link to={`/update-user/${user.id}`} className='position-relative'>
                      <i className="fa-solid fa-pen-to-square"></i>
                      <p className='position-absolute px-2 py-1 rounded'>Update</p>
                    </Link>
                    <Link to='' className='position-relative'>
                      <i className="fa-solid fa-trash"></i>
                      <p className='position-absolute px-2 py-1 rounded'>Delete</p>
                    </Link>
                  </div>
              </div>
          </div>))} 
        </div>
      </div>)}
    </div>
  )
}

export default UsersList
