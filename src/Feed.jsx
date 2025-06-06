

// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { BASE_URL } from './constants'
// import { useDispatch, useSelector } from 'react-redux'
// import { addFeed } from './utils/feedSlice'
// import UserCard from './UserCard'

// const Feed = () => {
//   const dispatch = useDispatch()
//   const feed = useSelector((store) => store.feed)

//   console.log("feed", feed)

//   const getFeed = async () => {
//     try {
//       if (feed) return

//       const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
//       console.log("fetched data", res.data)
//       dispatch(addFeed(res.data))
//     } catch (err) {
//       console.error("Error fetching feed:", err)
//     }
//   }

//   useEffect(() => {
//     getFeed()
//   }, [])

// //   return (
// //     feed?.data && feed.data.length > 0 ? (
// //       <div>
// //         <UserCard user={feed.data[0]} />
// //       </div>
// //     ) : (
// //       <p>{feed ? "No users found." : "Loading feed..."}</p>
// //     )
// //   )

// return (
// feed?.data && feed.data.length > 0 ? (
//   <UserCard user={feed.data[0]} />
// ) : (
//   <p>No users found.</p>
// )

// )
// }

// export default Feed
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './utils/feedSlice'
import UserCard from './UserCard'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const feed = useSelector((store) => store.feed)

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
    } catch (err) {
      console.error("Feed fetch error:", err)
      const status = err.response?.status
      const message = err.response?.data?.message || ""

      if (status === 401 || status === 400 || message.includes("jwt")) {
       return navigate("/login") // 🔁 redirect to login
      }
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (!feed) return 

  return (
    feed.data && feed.data.length > 0 ? (
      <UserCard user={feed.data[0]} />
    ) : (
      <p>No users found.</p>
    )
  )
}

export default Feed
