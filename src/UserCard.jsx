const UserCard = ({user}) => {
     console.log("userdata"+user)
  return (
   
    <div className='flex justify-center my-1'>
        <div className="card bg-base-100 w-96 shadow-xl bg-black">
  <figure>
    <img
      src={user.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName+" "+user.lastName}</h2>
    {user.about && (<p>{user.about+" "+user.age+" "+user.gender}</p>)}
    <div className="card-actions justify-end">
      <button className="btn btn-primary">ignore</button>
      <button className="btn btn-secondary">interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard