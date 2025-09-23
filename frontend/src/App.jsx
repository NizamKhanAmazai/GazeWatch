import { useContext, useState } from 'react' 
import './App.css' 
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login' 
import ContactUs from './Pages/ContactUs' 
import Nav from '../Components/Nav' 
import Collection from './Pages/Collection'
import About from '../Components/About'
import Cart from '../Components/Cart'
import ProductDetails from '../Components/ProductDetails'
import PlaceOrder from '../Components/PlaceOrder'
import Orders from './Pages/Orders'
import {ToastContainer} from "react-toastify"
import NotFound from "../Components/NotFound"
import Ai from '../Components/Ai' 
import { userDataContex } from './userContext/dataContext'

function App() { 
  const {userData} = useContext(userDataContex)
 

  return ( 
    <>
    <Ai/>
      <Nav/>    
      <ToastContainer />
      {/*userData && */} 
    <Routes>
      <Route path='/' element={ <Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} /> 
      <Route path='/contact' element={<ContactUs/>} />
      <Route path='/about' element={<About/>} />  
      <Route path='/collection' element={<Collection/>} />  
      <Route path='/cart' element={<Cart/>} />  
      <Route path='/product/:id' element={<ProductDetails  />} />  
      <Route path='/cart/placeorder' element={<PlaceOrder  />} />  
      <Route path='/orders' element={userData ? <Orders/> : <Navigate to={"/login"} state={{from: location.pathname}} /> }  />  
      <Route path='*' element={<NotFound />} />  
    </Routes>
    </>
  )
}

export default App
