
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

// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { BASE_URL } from "./constants";
// import { removeUserFromFeed } from "./utils/feedSlice";

// const UserCard = ({ user }) => {
//   const dispatch = useDispatch();

//   const handleSendReq = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/connectionReq/send/${status}/${userId}`,
//         {},
//         { withCredentials: true }
//       );

//       console.log("Connection request sent:", res.data);
//       if (res.data && res.data.data) {
//       dispatch(removeUserFromFeed(userId));
//     }
//       console.log("Removing user:", user);

//     } catch (err) {
//       console.error("Failed to send connection request:", err);
//     }
//   };

//   return (
//     <div className="flex justify-center my-1">
//       <div className="card bg-base-100 w-96 shadow-xl bg-black">
//         <figure>
//           <img src={user?.photoUrl} alt="User" />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
//           {user?.about && (
//             <p>{`${user.about} ${user.age || ""} ${user.gender || ""}`}</p>
//           )}
//           <div className="card-actions">
//             <button
//               className="btn btn-primary"
//               onClick={() => handleSendReq("ignored", user?._id)}
//             >
//               Ignore
//             </button>
//             <button
//               className="btn btn-secondary"
//               onClick={() => handleSendReq("interested", user?._id)}
//             >
//               Interested
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

// // import axios from "axios";
// // import React from "react";
// // import { BASE_URL } from "./constants";
// // import { useDispatch } from "react-redux";
// // import { removeUserFromFeed } from "./utils/feedSlice";

// // const UserCard = ({ user }) => {
// //   console.log(user);
// //   const dispatch = useDispatch();
// //   const { _id, firstName, lastName, age, gender, about, photoURL, skills } =
// //     user;

// //   console.log("Extracted Skills:", skills); // Debugging

// //   const handleSendRequest = async (status, userId) => {
// //     try {
// //       const res = await axios.post(
// //         BASE_URL + "/connectionReq/send/" + status + "/" + userId,
// //         {},
// //         {
// //           withCredentials: true,
// //         }
// //       );
// //       dispatch(removeUserFromFeed(userId));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div className="card grid-rows-1 bg-base-300 w-96 shadow-xl p-3">
// //       <figure>
// //         <img src={photoURL} alt="Shoes" />
// //       </figure>
// //       <div className="card-body">
// //         <h2 className="card-title">{firstName + " " + lastName}</h2>
// //         {age && gender && <p>{age + ", " + gender}</p>}
// //         <p>{about}</p>
// //         {skills && skills.length > 0 && (
// //           <div>
// //             <h3 className="font-semibold">Skills:</h3>
// //             <div className="flex flex-wrap gap-2">
// //               {skills.map((skill, index) => (
// //                 <span
// //                   key={index}
// //                   className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
// //                 >
// //                   {skill.trim()}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //         <div className="card-actions justify-center my-4">
// //           <button
// //             className="btn btn-accent"
// //             onClick={() => {
// //               handleSendRequest("ignored", _id);
// //             }}
// //           >
// //             Ignore
// //           </button>
// //           <button
// //             className="btn btn-secondary"
// //             onClick={() => {
// //               handleSendRequest("intrested", _id);
// //             }}
// //           >
// //             Intrested
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserCard;