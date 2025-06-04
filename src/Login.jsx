import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from './utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate();

  const [email,setEmail]=useState("samu@datti.com")
  const [password,setPassword]=useState("samu@123")
  const [error,setError]=useState("");
  const dispatch=useDispatch()
  
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
    <h2 className="card-title justify-center">LOGIN</h2>
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
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login