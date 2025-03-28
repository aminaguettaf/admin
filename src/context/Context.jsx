import React, { useState, useEffect } from "react";
import { AdminContext } from "./AdminContext";
import {toast} from 'react-toastify';
import axios from 'axios';

const AdminContextProvider = (props)=>{
    const url = "https://zesty-freedom.up.railway.app/api";
    const[token, setToken] = useState('');
    const[users, setUsers] = useState([]);
    const[productsList, setProductsList] = useState([]);
    const[categories, setCategories] = useState([]);
    const [ordersList, setOrdersList] = useState(JSON.parse(localStorage.getItem("ordersList")) || []);
    const[showDelete, setShowDelete] = useState(false);
    const[selectedProd, setSelectedProd] = useState(null);
    const[selectedOrder, setSelectedOrder] = useState(null);
    const[selectedCategory, setSelectedCategory] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
      }
    },[])

    useEffect(() => {
      localStorage.setItem("ordersList", JSON.stringify(ordersList));
    }, [ordersList]);

    const getAllProducts = async()=>{
      try {
        const response = await axios.get(`${url}/products`);
        if(response.data.success){
          setProductsList(Object.values(response.data.products || {}));
          setLoading(false);
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const getCategories = async()=>{
      try {
        const response = await axios.get(`${url}/category`);
        if(response.data.success){
          setCategories(Object.values(response.data.categories || {}))
          setLoading(false);
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    const getAllOrders = async()=>{
      try {
        const response = await axios.get(`${url}/orders`);
        if(response.data.success){
          setOrdersList(Object.values(response.data.orders || {}));
          setLoading(false);
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    const getAllUsers= async()=>{
      try {
        const response = await axios.get(`${url}/admins`);
        if(response.data.success){
          setUsers(Object.values(response.data.admins|| {}));
          setLoading(false);
          console.log(response.data.admins);
        }
        else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    useEffect(()=>{
      getCategories();
      getAllOrders();
      getAllUsers();
    },[])
    const value ={
      url,
      token, setToken,
      productsList, setProductsList,
      showDelete, setShowDelete,
      selectedProd, setSelectedProd,
      getAllProducts,
      getCategories,
      categories, setCategories,
      loading, setLoading,
      getAllOrders,
      ordersList, setOrdersList,
      selectedOrder, setSelectedOrder,
      selectedCategory, setSelectedCategory,
      getAllUsers,
      users
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider