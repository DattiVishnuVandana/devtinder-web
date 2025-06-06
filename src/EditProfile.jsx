// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addUser } from './utils/userSlice';
// import UserCard from './UserCard';
// import axios from 'axios';
// import { BASE_URL } from './constants';

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user?.firstName || "");
//   const [lastName, setLastName] = useState(user?.lastName || "");
//   const [age, setAge] = useState(user?.age || 0);
//   const [gender, setGender] = useState(user?.gender || "others" );
//   const [about, setAbout] = useState(user?.about || "");
//   const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
//   const [error, setError] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const dispatch = useDispatch();

//   const saveProfile = async () => {
//     setError("");
//     try {
//       const res = await axios.patch(
//         `${BASE_URL}/profile/edit`,
//         { firstName, lastName, age, gender, photoUrl, about },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res?.data?.data));
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000);
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center my-10 mb-60">
//       {/* Form Card */}
//       <div className="flex justify-center card bg-base-200 w-96 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center">EDIT PROFILE</h2>

//           <label className="form-control w-full max-w-xs py-2">
//             <span className="label-text">First Name:</span>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           <label className="form-control w-full max-w-xs py-2">
//             <span className="label-text">Last Name:</span>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           <label className="form-control w-full max-w-xs py-2">
//             <span className="label-text">Age:</span>
//             <input
//               type="text"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           <label className="form-control w-full max-w-xs py-2">
//             <span className="label-text">Gender:</span>
//             <input
//               type="text"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           <label className="form-control w-full max-w-xs py-2">
//             <span className="label-text">About:</span>
//             <textarea
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             ></textarea>
//           </label>

//           <label className="form-control w-full max-w-xs py-2">
//             <span className="label-text">Photo URL:</span>
//             <input
//               type="text"
//               value={photoUrl}
//               onChange={(e) => setPhotoUrl(e.target.value)}
//               className="input input-bordered w-full max-w-xs"
//             />
//           </label>

//           <p className="text-red-800 text-sm text-center">{error}</p>

//           <div className="card-actions justify-center mt-4">
//             <button className="btn btn-primary" onClick={saveProfile}>
//               Save Profile
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Preview Card */}
//       <div className="flex flex-col items-center gap-6 my-10 mx-7">
//         <UserCard user={{ firstName, lastName,  photoUrl, age, gender, about }} />
//       </div>

//       {/* Toast Message */}
//       {showToast && (
//         <div className="toast toast-top toast-center pt-20 ">
//           <div className="alert alert-success">
//             <span>Profile saved successfully</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditProfile;    
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from './constants';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "others");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const saveProfile = async () => {
    setError("");

    // Client-side validation
    if (!firstName || !lastName || !age || !gender || !photoUrl) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isNaN(age) || Number(age) <= 0) {
      setError("Age must be a valid positive number.");
      return;
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age: Number(age),
          gender: gender.trim() || undefined,
          photoUrl: photoUrl.trim() || undefined,
          about: about.trim()
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
     setTimeout(() => {
  setShowToast(false);
  navigate("/Feed");
}, 2000);
      
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong";
      setError(message);
    }
  };

  return (
    <div className="flex justify-center my-10 mb-60">
      {/* Form Card */}
      <div className="flex justify-center card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">EDIT PROFILE</h2>

          <label className="form-control w-full max-w-xs py-2">
            <span className="label-text">First Name:</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs py-2">
            <span className="label-text">Last Name:</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs py-2">
            <span className="label-text">Age:</span>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs py-2">
            <span className="label-text">Gender:</span>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs py-2">
            <span className="label-text">About:</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            ></textarea>
          </label>

          <label className="form-control w-full max-w-xs py-2">
            <span className="label-text">Photo URL:</span>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          {error && (
            <p className="text-red-800 text-sm text-center">
              {typeof error === 'string' ? error : error?.error || "Something went wrong"}
            </p>
          )}

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="flex flex-col items-center gap-6 my-10 mx-7">
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="toast toast-top toast-center pt-20">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
