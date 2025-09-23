import { use, useContext, useState } from 'react' 
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './pages/Login';
import {adminDataContext} from '../userContext/DataContext';
import { ToastContainer } from 'react-toastify'; 
import NotFound from '../components/NotFound'; 
import FinishedOrders from './pages/FinishedOrders';

function App() {
  const [count, setCount] = useState(0) 
  const {userData} = useContext(adminDataContext)
  return (
    <> 
    {
      userData ? 
    
       <>
       <ToastContainer /> 
       <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/add' element={ <Add/> }/>
        <Route path='/list' element={ <List/> }/>
        <Route path='/orders' element={ <Orders/> }/>
        <Route path='/Login' element={ <Login/> }/>
        <Route path='/orders/finished' element={ <FinishedOrders/> }/>
        <Route path='*' element={<NotFound/>} />
       </Routes>
       </>
       : <Login/> }
     </>
  )
}

export default App
