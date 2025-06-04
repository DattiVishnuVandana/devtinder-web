import React, { useState } from 'react'
import { BASE_URL } from './constants';
import { useDispatch } from 'react-redux';


const EditProfile = ({user}) => {
  console.log(user);
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [error, setError] = useState( ""); // ✅ Defined `error`
    const dispatch=useDispatch()
const saveProfile=async ()=>{
  try{
    setError("")
const res=await axios.patch(BASE_URL+"/updateuser",{firstName,lastName,age,gender,photoUrl,about},{withCredentials:true})
dispatch(addUser(res.data))
  }
  catch(err){
    setError(err?.response?.data)
  }
}

  return (
    <div className="flex justify-center my-10 mb-60">
    <div className="flex justify-center card bg-base-200 w-96 shadow-xl ">
<div className="card-body">
  <h2 className="card-title justify-center">EDIT PROFILE</h2>
  <label className="form-control w-full max-w-xs py-4">
<div className="label my-1">
  <span className="label-text">firstName:</span>
  
  
</div>
<input type="text" 
onChange={(e)=>setFirstName(e.target.value)}
value={firstName}

placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />


</label>
<label className="form-control w-full max-w-xs py-4">
<div className="label my-1">
  <span className="label-text">lastName:</span>
  
  
</div>
<input type="text" 
onChange={(e)=>setLastName(e.target.value)}
value={lastName}

placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />


</label>
<label className="form-control w-full max-w-xs py-4">
<div className="label my-1">
  <span className="label-text">age:</span>
  
  
</div>
<input type="text" 
onChange={(e)=>setAge(e.target.value)}
value={age}

placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />


</label>
<label className="form-control w-full max-w-xs py-4">
<div className="label my-1">
  <span className="label-text">about:</span>
  
  
</div>
<input type="text" 
onChange={(e)=>setAbout(e.target.value)}
value={about}

placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />


</label>

<label className="form-control w-full max-w-xs py-4">
<div className="label my-1">
  <span className="label-text">gender:</span>
  
  
</div>
<input type="text" 
onChange={(e)=>setGender(e.target.value)}
value={gender}

placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />


</label>
<label className="form-control w-full max-w-xs py-4">
<div className="label my-1">
  <span className="label-text">photoUrl:</span>
  
  
</div>
<input type="text" 
onChange={(e)=>setPhotoUrl(e.target.value)}
value={photoUrl}

placeholder="Type here" className="input input-bordered w-full max-w-xs my-2" />


</label>
<p className='text-red-800'>{error}</p>
  <div className="card-actions justify-center m-10 ">
    <button className="btn btn-primary" onClick={saveProfile}>Save profile</button>
  </div>
</div>
</div>
  </div>
  )
}

export default EditProfile