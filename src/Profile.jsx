import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

const Profile = () => {
  const user=useSelector((store)=>store.user)
  // console.log("user..\n"+user);
  // const user = useSelector((state) => state.auth.user); 
  return ( user &&
    <div>
      <EditProfile user={user}/>
     
    </div>
  )
}

export default Profile