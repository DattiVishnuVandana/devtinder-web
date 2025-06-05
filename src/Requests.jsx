import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from './utils/requestSlice'

export const Requests = () => {
    const requests=useSelector(store=>store.requests)
  const dispatch=useDispatch()

    const fetchReq = async () => {
  try {
    const res = await axios.get(BASE_URL + "/user/req/received", { withCredentials: true });
    dispatch(addRequests(res.data.data));
  } catch (err) {
    console.error("Error fetching connections:", err);
  }
};

const reviewReq=async(status,_id)=>{
    try{
        const res=await axios.post(BASE_URL+"/connectionReq/review/"+status+"/"+_id,{},{withCredentials:true});

   dispatch(removeRequests(_id))

    }catch(err){console.error(err)}
}

    useEffect(()=>{
        fetchReq();
    },[])
     if (!requests || requests.length === 0) {
    return (
      <h1 className="flex justify-center text-2xl my-10 text-green-300">
        No Requests found
      </h1>
    );
  }
 
  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-3xl text-pink-400 p-4">
        Requests ({requests.length})
      </h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-2 p-2  rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-14 h-14 rounded-full object-contain"
                src={photoUrl}
              />
            </div>
            <div className="text-left m-4 p-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewReq("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewReq("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );


        
      })}
    </div>
  );
};

