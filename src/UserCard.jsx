
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./constants";
import { removeUserFromFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  console.log("userdata:", user); // Better logging

  const handleSendReq = async (status, userId) => {
    if (!userId) return console.warn("Invalid user ID");

    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/connectionReq/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId)); // remove from feed
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-1">
      <div className="card bg-base-100 w-96 shadow-xl bg-black">
        <figure>
          <img src={user?.photoUrl} alt="User" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
          {user?.about && (
            <p>
              {user.about} | {user.age} | {user.gender}
            </p>
          )}
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSendReq("ignored", user?._id)}
              disabled={loading}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendReq("interested", user?._id)}
              disabled={loading}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
