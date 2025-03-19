import React, { useState } from "react";
import { AdminContext } from "./AdminContext";
import {toast} from 'react-toastify';
import axios from 'axios';

const AdminContextProvider = (props)=>{
    const url = "http://127.0.0.1:8000/api";
    const[productsList, setProductsList] = useState([]);
    const[showDelete, setShowDelete] = useState(false);
    const[selectedProd, setSelectedProd] = useState(null);
    const[loading, setLoading] = useState(true);

    const getAllProducts = async()=>{
        try {
          const response = await axios.get(`${url}/products`);
          if(response.data.success){
            setProductsList(Object.values(response.data.products || {}));
            console.log(response.data.products);
            setLoading(false);
          }
          else{
            toast.error(response.data.message)
          }
        } catch (error) {
          toast.error(error.message);
        }
    }
    const value ={
        url,
        productsList, setProductsList,
        showDelete, setShowDelete,
        selectedProd, setSelectedProd,
        getAllProducts,
        loading, setLoading
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider