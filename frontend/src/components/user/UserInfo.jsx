import React from 'react'
import styles from "./UserInfo.module.css"
import pic from "../../assets/profilePic.jpg"

const UserInfo = ({userInfo}) => {
  return (
    <div className='row'>

        <div className='col-md-3 col-12 text-center my-5'>
            <img  className='shadow img-fluid rounded py-4 ' src ={pic} alt='Profile Pic' />
            <p className='my-0'>{userInfo.username}</p>
            <p className='my-0'>{userInfo.email}</p>
            <button className='btn btn-primary w-100 my-1'>Edit Profile</button>
        </div>

        <div className='col-md-9 col-12 my-3'>
          <h4 className='bg-primary text-white px-2 py-1'>Account Overview</h4>        
           <p><b>First Name:</b> {userInfo.first_name}</p>
           <p><b>Last Name:</b> {userInfo.last_name}</p>
           
        </div>
    </div>
  )
}

export default UserInfo