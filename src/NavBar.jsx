import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants";
import { removeUser } from "./utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((store) => store.user);
const navigate=useNavigate()
  console.log("user"+user?.firstName); // ✅ Will return undefined instead of an error
const dispatch=useDispatch();

const handleLogout=async()=>{
await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
dispatch(removeUser())
return navigate("/login")
}
  return (
    <div>
<div className="navbar bg-base-300 shadow-sm ">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">👩‍💻DEVTINDER👨‍💻</Link>
  </div>
  {user &&
  <div className="flex gap-2">
  
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      {/* <p>welcome,{user.firstName}</p> */}
        <div className="w-10 rounded-full">
        <img src={user.photoUrl || "https://2.bp.blogspot.com/-LSiWgI-y66E/WlBwkJS0SLI/AAAAAAAABJA/zTZtxQQRDs8xdU8YVsqAtmR6Jox3kUIwACLcBGAs/s1600/Samantha-smiling-saree-images-pics.jpg"} alt="User" />
          {/* <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} /> */}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>

    </div>
  )
}

export default NavBar