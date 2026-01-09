import React, { useState, useEffect }from 'react'
import Header from './Header'
import CardContainer from './CardContainer'
import api from '../../api'
import PlaceholderContainer from '../ui/PlaceholderContainer'
import Error from '../ui/Error'
import { randomValue } from '../../GenerateCartcode/GenerateCartcode'


const HomePage = () => {
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(function(){
    if(localStorage.getItem("cart_code") === null){
      localStorage.setItem("cart_code", randomValue)
    }
  }, [])


  useEffect(()=>{
    api.get("/products").then(res=>{
    //console.log(res.data)
    setProducts(res.data)
    setLoading(false)
  }).catch((error)=>{
   // console.log(error.message)
     setErrorMessage(error.message)
  })
  }, [])

  return (
    <div>
        <Header />       
        { errorMessage && <Error message = {errorMessage} /> }
        { !loading ? <CardContainer products = {products} /> : <PlaceholderContainer /> }
    </div>
  )
}

export default HomePage

