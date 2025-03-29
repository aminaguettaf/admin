import React, { useContext, useState, useEffect, useMemo } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

const Home = () => {
  const {ordersList, productsList, users, getAllProducts, getAllOrders, getAllUsers} = useContext(AdminContext);
  const [totalSalesPerMonth, setTotalSalesPerMonth] = useState([]);

  useEffect(()=>{
    getAllProducts();
    getAllOrders();
    getAllUsers();
  }, [])
  useEffect(() => {
    if (ordersList.length > 0) {
      calculateSalesByMonth();
    }
  }, [ordersList]);

  const calculateSalesByMonth= ()=>{
    const salesByMonth = {};
    ordersList.forEach((order)=>{
      if(order.createdAt && order.totalPrice){
        const date = new Date(order.createdAt);
        const month = date.toLocaleString('default', {month: 'short', year: 'numeric'});

        if (!salesByMonth[month]) {
          salesByMonth[month] = 0;
        }
        salesByMonth[month] += parseInt(order.totalPrice);
      }
    });
    const sortedData = Object.entries(salesByMonth)
      .map(([month, total]) => ({ month, totalPrice: total }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));

    setTotalSalesPerMonth(sortedData);
  }

  const topProducts = useMemo(() => {
    const productCount = {};

    ordersList.forEach((order) => {
      order.items.forEach((item) => {
        if (!productCount[item.name]) {
          productCount[item.name] = { name: item.name, quantity: 0 };
        }
        productCount[item.name].quantity += item.quantity;
      });
    });

    // Trier les produits par quantité vendue et prendre les 5 premiers
    return Object.values(productCount)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [ordersList]);



  return (
    <div className='home page-container p-4'>
      <div className='d-flex flex-wrap gap-4'>
        <div className='box flex-grow-1 rounded px-4 py-2'>
          <p className='title mb-4'>Total Orders</p>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{ordersList.length}</span>
          </div>
          <Link to='/orders'>View more...</Link>
        </div>
        <div className='box flex-grow-1 rounded px-4 py-2'>
          <p className='title mb-4'>Total Products</p>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <i className="fas fa-store"></i>
            <span>{productsList.length}</span>
          </div>
          <Link to='/products-list'>View more...</Link>
        </div>
        <div className='box flex-grow-1 rounded px-4 py-2'>
          <p className='title mb-4'>Total Users</p>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <i className="fa-solid fa-users"></i>
            <span>{users.length}</span>
          </div>
          <Link to='/users-list'>View more...</Link>
        </div>
      </div>
      <div className='d-flex flex-wrap  gap-4 mt-4 my-2'>
        <div className='chart rounded' style={{width:'57.5%'}}>
          <p className='title mb-4'>Earnings</p>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={totalSalesPerMonth} margin={{ top: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month"  />
              <YAxis tickFormatter={(value) => `${value} DA`}/>
              <Tooltip formatter={(value) => [`${value} DA`, "Total"]}/>
              <Line type="monotone" dataKey="totalPrice" stroke="#800020" strokeWidth={3} dot={{ fill: "#800020", r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>    
        <div className='chart rounded' style={{width:'40%'}}>
          <p className='title mb-4'>Popular Products</p>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={topProducts}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} stroke="white" tick={{ fill: "#333" }} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#800020" barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
            <p className="text-gray-300">No sales yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
