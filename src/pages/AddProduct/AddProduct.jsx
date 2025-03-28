import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './AddProducts.css';
import Title from '../../components/Title/Title';
import { colors, sizes } from '../../assets/assets';
import axios from 'axios'
import {toast} from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';


const AddProduct = ({state}) => {  
  const {url, productsList, categories, token} = useContext(AdminContext);  
  const navigate= useNavigate();
  const params = useParams();
  const storedProduct = JSON.parse(localStorage.getItem('updateProduct'));
  // rechercher dans productList avec params.id
  const product = productsList.find(p=>p.id === params.id)|| storedProduct;

  // les valeurs de formulaire
  const[data, setData] = useState({
    name: product?.name || '',
    price:product?.price || '',
    category:product?.category || '',
    description:product?.description || '',
  })  
  const[color, setColor] = useState(product?.color || []);
  const[size, setSize] = useState(product?.size || []);
  const [image, setImage] = useState(product?.image || false);
  const[available, setAvailable] = useState(product?.available || false);

  //si on ajoute un produit les valeurs sont réinitilisées sinon les valeurs existante du produit son chargées   
  useEffect(() => {
    if (state === 'add') {
        localStorage.removeItem('updateProduct');
        setData({ name: '', price: '', category: '', description: '' });
        setColor([]);
        setSize([]);
        setImage(false);
        setAvailable(false);
    } else if (state === 'update' && product) {
        setData({
            name: product.name || '',
            price: product.price || '',
            category: product.category || '',
            description: product.description || ''
        });
        setColor(product.color || []);
        setSize(product.size || []);
        setImage(product.image || false);
        setAvailable(product.available || false);
    }
}, [state, product]);

  //si la couleur est déja selectionée on la supprime sinon on l'ajoute   
  const handleColor = (e)=>{
    setColor((prev)=>{
        if(prev.includes(e)){
            return prev.filter((c)=> c!== e);
        }
        else{
            return [...prev, e];
        }
    })
  }
  // meme principe de handleColor   
  const handleSize = (e)=>{
    setSize((prev)=>{
        if(prev.includes(e)){
            return prev.filter((s) => s!== e);
        }
        else{
            return [...prev, e]
        }
    })
  }

  // chaque champ du formulaire met a jour son etat dans data 
  const onChangeHandler = (e)=>{
    const {name, value} = e.target;
    setData((prev)=>({...prev, [name]:value}));
  }
  // soumission du formulaire  
  const onSubmitHandler = async(e)=>{
    try { 
        e.preventDefault(); //empeche le rechargement de la page
        let imageUrl = image;
        // si l'image est un fichier il est envoyé a l'api
        if (image instanceof File) {
            const imageForm = new FormData();
            imageForm.append("image", image);
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
        //préparation des données a envoyer 
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category);
        size.forEach((s, index) => formData.append(`size[${index}]`, s));
        color.forEach((c, index) => formData.append(`color[${index}]`, c));
        formData.append('available', available ? '1' : '0');
        if (imageUrl) {
            formData.append('image', imageUrl);
        }
        // ajouter un produit
        if(state === 'add'){
            const response = await axios.post(`${url}/products`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.data.success){
                toast.success(response.data.message);
                setData({
                    name: '',
                    price: '',
                    category: '',
                    description: '',
                });
                setColor([]);
                setSize([]);
                setImage(false);
                setAvailable(false);
                navigate('/products-list');
            }
            else{
                toast.error(response.data.message);
            }
        }
        // mettre a jour un produit
        else{
            const response = await axios.post(`${url}/products/${product.id}`, formData);
            if(response.data.success){
                toast.success(response.data.message)
                navigate('/products-list');
            }
            else{
                toast.error(response?.data?.message);
            }
        } 
    } catch (error) {
        toast.error(error.message);
    }
  }
  
  return (
    <div className='add-product page-container p-4'>
      <Title  title={`${state === 'add' ? 'Add Product' : 'Update Product'}`} />
      <form onSubmit={onSubmitHandler} className='d-flex gap-5'>
        <div className='w-50'>
            <div className='mb-4'>
                <p className='label mb-2 fw-medium'>Product Name</p>
                <input type='text' name='name' value={data.name} onChange={onChangeHandler} className='border w-100 px-2 py-1 rounded' required/>
            </div>
            <div className='mb-4'>
                <p className='label mb-2 fw-medium'>Colors</p>
                <div className='d-flex gap-2 flex-wrap'>
                    {colors.map((c, index)=>(
                        <p onClick={()=>handleColor(c)} className={`color border rounded px-2 py-1 ${color.includes(c) && 'active'}`} style={{ cursor: 'pointer' }} key={index}>{c}</p>
                    ))}
                </div>
            </div>
            <div className='mb-4'>
                <p className='label mb-2 fw-medium'>Sizes</p>
                <div className='d-flex gap-2'>
                    {sizes.map((s, index)=>(
                        <p onClick={()=>handleSize(s)} className={`size border rounded px-2 py-1 ${size.includes(s) && 'active'}`} style={{ cursor: 'pointer' }} key={index}>{s}</p>
                    ))}
                </div>
            </div>
            <div className='input-container d-flex gap-3'>
                <div className='w-50'>
                    <p className='label mb-2 fw-medium'>Category</p>
                    <select name='category' value={data.category} onChange={onChangeHandler} className='w-100 px-2 py-1 rounded border' required>
                        <option value='' disabled selected>Select a category</option>
                        {categories.map((cat)=>(
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className='w-50'>
                    <p className='label mb-2 fw-medium'>Product Price</p>
                    <input type='number' name='price' value={data.price} onChange={onChangeHandler} className='w-10 px-2 py-1 rounded border' required/>
                </div>
            </div>
        </div>
        <div className='w-50'>
            <div className='mb-4'>
                <p className='label mb-2 fw-medium'>Upload Image</p>
                <div className='pic'>
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
            <div className='mb-4'>
                <p className='label mb-2 fw-medium'>Description</p>
                <textarea placeholder='' rows='5' name='description' value={data.description} onChange={onChangeHandler}  className='w-100 px-2 py-1 rounded border'/>
            </div>
            <div className='mb-4 d-flex gap-2'>
                <input id="available" type='checkbox' checked={available} onChange={(e)=>setAvailable(e.target.checked)}/>
                <label htmlFor="available" className='label'>Available</label>
            </div>
            <button className='btn rounded py-2 px-4 text-white' type='submit'>{state === 'add' ? "Add Product" : "Update Product"}</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
