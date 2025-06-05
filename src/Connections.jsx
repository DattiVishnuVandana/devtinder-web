import React, { useEffect } from 'react';
import { BASE_URL } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection, removeConnection } from './utils/connectionSlice';
import axios from 'axios';

const Connections = () => {
  const connections = useSelector((store) => store.connection); // Adjust if needed
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      dispatch(removeConnection());
      const response = await axios.get(BASE_URL + '/user/connected', {
        withCredentials: true,
      });
      console.log("Fetched:", response.data.data);
      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  console.log("Redux connections", connections);

  if (!connections || connections.length === 0) {
    return (
      <h1 className="flex justify-center text-2xl my-10 text-green-300">
        No connections found
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-pink-400">
        Connections ({connections.length})
      </h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

        return (
          <div key={_id} className="flex items-center m-2 p-2 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="profile"
                className="w-14 h-14 rounded-full object-contain"
                src={photoUrl}
              />
            </div>
            <div className="text-left m-4 p-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age} {gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
