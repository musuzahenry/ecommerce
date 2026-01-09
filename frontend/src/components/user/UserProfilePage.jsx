import React from 'react'
import UserInfo from './UserInfo'
import OrderHistoryItemContainer from './OrderHistoryItemContainer'
import api from '../../api'
import { useEffect, useState } from 'react'
import Spinner from '../ui/Spinner'



const UserProfilePage = () => {

    const [userInfo, setUserInfo] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function(){
        setLoading(true)
        api.get("user-items").then((res)=>{            
            setUserInfo(res.data)
            setLoading(false)
        }).catch((error)=>{
            //console.log(error.message)
            setLoading(false)
        })
    }, [])
    

    if (loading){
        return (
            <Spinner />
        )
    }

  return (
    <div className='row'>
        <UserInfo userInfo = { userInfo } />
    </div>
  )
}

export default UserProfilePage