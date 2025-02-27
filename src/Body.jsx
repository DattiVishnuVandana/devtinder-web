import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from './constants'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import axios from 'axios'

const Body = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const fetchUser=async ()=>{
   try{
    const res=await axios.get("http://localhost:7777/profile",
      {withCredentials:true

    }

  
  );
  dispatch(addUser(res.data))
   }catch(err){
    //hand;e
    if(err.status==401)
      navigator("/login")
    console.log(err);
   }
  
  }
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>
   
         <NavBar/>
    
       <Outlet/> 
     <Footer/>
    </div>
  )
}

export default Body