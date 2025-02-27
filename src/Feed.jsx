import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const dispatch=useDispatch()
    const feed=useSelector(store=>store.feed)
    console.log("feed"+feed);
    // if (feed)
    //     return

    const getFeed=async ()=>{
        try{
const res=await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
console.log(res.data);
dispatch(addFeed(res.data))


}catch(err){
    console.log(err);
}
    }

useEffect(()=>{
    getFeed();
},[])

  return (
    feed?.data && feed.data.length > 0 ? (
        <div>
            <UserCard user={feed.data[0]} />
        </div>
    ) : (
        <p>Loading feed...</p>
    )
  )
}

export default Feed