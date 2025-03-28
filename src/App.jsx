import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AddProduct from './pages/AddProduct/AddProduct';
import ProductsList from './pages/ProductsList/ProductsList';
import OrdersList from './pages/OrdersList/OrdersList';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import Categories from './pages/Categories/Categories';
import AddCategory from './pages/AddCategory/AddCategory';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import CreateAdmin from './pages/CreateAdmin/CreateAdmin';
import UsersList from './pages/UsersList/UsersList';



function App() {
  const{token} = useContext(AdminContext);
  return (
    <div>
    <ToastContainer />
    {!token ?
    <Login />:
    <BrowserRouter>
      <Navbar />
      <div className='d-flex' style={{marginTop: '80px'}}>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />}/> 
          <Route path='/add-product' element={<AddProduct state='add' />} />
          <Route path='/update-product/:id' element={<AddProduct state='update'/>} />
          <Route path='/products-list' element={<ProductsList />} />
          <Route path='/orders' element={<OrdersList />} />
          <Route path='/order-details/:id' element={<OrderDetails />}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/add-category' element={<AddCategory state='add'/>} />
          <Route path='/update-category/:id' element={<AddCategory state='update'/>}/>
          <Route path='/create-admin' element={<CreateAdmin />}/>
          <Route path='/users-list' element={<UsersList />}/>
        </Routes>
      </div>
    </BrowserRouter>
    }
    </div>
  )
}

export default App
