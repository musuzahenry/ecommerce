import React, { useState } from 'react'
import api, { BASE_URL } from '../../api'
import { toast } from 'react-toastify';



const CartItem = ({item, setCartTotal, cartItems, setCartItems, setNumCartItems}) => {
  
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)
  const itemData = {quantity:quantity, item_id:item.id}



  function deleteCartitem(){
    const confirmDelete = window.confirm("Are you sure you want to delete item?")

    if (confirmDelete){
       api.delete(`delete-cartitem/${item.id}`).then((res)=>{
          //remive that item from DOM  
          const new_cartset = cartItems.filter(cartitem => cartitem.id != item.id)
          setCartItems(new_cartset)   
          //Update cart total
          setCartTotal(new_cartset.map((cartitem)=>cartitem.id === item.id ? res.data.data : cartitem)
          .reduce((acc, curr)=> acc + curr.total, 0)  )
          //uodate number of items in cart total
          setNumCartItems(new_cartset.map((cartitem) => cartitem.id === item.id ? res.data.data : cartitem)
          .reduce((acc, curr) => acc + curr.quantity, 0) )
            //toast.success("Success, item deleted")

          toast.success("Cart item deleted successfully")
       })
       .catch((e)=>{
        console.log(e.message)
       })
    }
  }



  function updateCartItem(){

    setLoading(true)
    
    api.patch("update-cart/", itemData).then((res)=>{
      //console.log(JSON.stringify(res.data.data))
     // cartItems.map((ite)=>console.log("ll============="+JSON.stringify(ite.quantity)))
      //console.log("ll============="+JSON.stringify(cartitems))
     setCartTotal(cartItems.map((cartitem)=>cartitem.id === item.id ? res.data.data : cartitem)
     .reduce((acc, curr)=> acc + curr.total, 0)  )
    
     setNumCartItems(cartItems.map((cartitem) => cartitem.id === item.id ? res.data.data : cartitem)
     .reduce((acc, curr) => acc + curr.quantity, 0) )

     setLoading(false)  
     
     toast.success("Cart item updated successfully")

    
    }
    ).catch((error) => {
        console.log(error.message)
        setLoading(false)
      })
    }

  return (
    <div className='row'>
      
      <div className='col-md-2  col-2' >
        <img  className='img-fluid rounded p-1 my-2' src={`${BASE_URL}${item.product.image}`} alt={item.product.name}/>
      </div>
      
      <div className='col-md-5 col-12' >
        <h3>{item.product.name}</h3>
        <p>{item.product.price}</p>
      </div>
      
      <div className='col-md-2 col-12'>
  
          <table>
            <tbody>
              <tr>

                <td>
                  <input 
                    type='number' 
                    min='1' 
                    value ={quantity} 
                    onChange = {(e) => setQuantity(e.target.value) } 
                    style = {{width: '70px'}} 
                  />
                  </td>
                <td>
                  <button 
                     type='submit' 
                     onClick = {updateCartItem} 
                     className='btn btn-primary'
                     disabled = { loading }
                     >
                     { loading ? "Updating..." : "Update" }
                  </button>
                </td>

                <td>
                  <button 
                    type='submit' 
                    className='btn btn-danger'
                    onClick = { deleteCartitem }
                    >
                      Remove
                  </button>
                </td>
                
                </tr>
            </tbody>
       </table>



          

      </div>

    </div>
    
  )
}

export default CartItem