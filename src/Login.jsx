import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from './utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from './constants'

const Login = () => {
  const navigate=useNavigate();
  const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const [isLoginForm,setIsLoginForm]=useState(false)



  const [error,setError]=useState("");
  const dispatch=useDispatch()
  
const handleSignUp=async()=>{
  try{
const res=await axios.post(BASE_URL+"/signup",{firstName,lastName,email,password},{withCredentials:true})
   console.log(res);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }}

const handleLogin=async ()=>{
  try{
const res=await axios.post("http://localhost:7777/login",{
  email,password
},{
  withCredentials:true//**** */
});
// console.log("Response Data:", res.data);

dispatch(addUser(res.data))
return navigate("/Feed")
}
catch(err){
  setError(err?.response?.data || "something went wrong")
  console.error(err)
}}

  return (
      <div className="flex justify-center my-10">
        <div className="flex justify-center card bg-base-200 w-96 shadow-xl ">
    <div className="card-body">
      <h2 className="card-title justify-center">{isLoginForm?"LOGIN":"SIGNUP"}</h2>
     
     { !isLoginForm &&  <>
     <label className="form-control w-full max-w-xs py-4">
    <div className="label my-1">
      <span className="label-text"> FIRST NAME:{firstName}</span>
      
      
    </div>
    <input type="text" 
    onChange={(e)=>setFirstName(e.target.value)}
    value={firstName}

    placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />


 <div className="label my-1">
      <span className="label-text">LastName :{lastName}</span>
      
      
    </div>
    <input type="text" 
    onChange={(e)=>setLastName(e.target.value)}
    value={lastName}

    placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />



     
       </label>

     </>} 
  <label className="form-control w-full max-w-xs py-4">
     <div className="label my-1">
      <span className="label-text">EMAIL ID:{email}</span>
      
      
    </div>
    <input type="text" 
    onChange={(e)=>setEmail(e.target.value)}
    value={email}

    placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />

    <div className="label ">
      <span className="label-text">password</span>
    </div>
    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs my-2"
    value={password}
    onChange={(e)=>setPassword(e.target.value)} />
    <p className='text-red-800'>{error}</p>
  </label>

      <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?"Login":"SignUp"}</button>
      </div>
    <p className='m-auto cursor-pointer py-2' onClick={()=>setIsLoginForm(!isLoginForm)}>{isLoginForm?"New user?Sign Up":"already have an account login"}</p>
    </div>
  </div>
    </div>
  )
}

export default Login