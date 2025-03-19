import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AddProduct from './pages/AddProduct/AddProduct';
import ProductsList from './pages/ProductsList/ProductsList';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Navbar />
      <div className='d-flex' style={{marginTop: '80px'}}>
        <Sidebar />
        <Routes>
          {/* <Route path='/' element={<Home />}/> */}
          <Route path='/add-product' element={<AddProduct state='add' />} />
          <Route path='/update-product/:id' element={<AddProduct state='update'/>} />
          <Route path='/products-list' element={<ProductsList />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
