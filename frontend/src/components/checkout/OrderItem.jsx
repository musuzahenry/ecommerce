import React from 'react'
import { BASE_URL } from '../../api'

const OrderItem = ({ cartitem }) => {
  return (

    <tr>
        <td >
          <img width='90' className='img-thumbnail rounded mt-1' 
                src ={`${BASE_URL}${cartitem.product.image}` } 
                alt='Product Image' 
          /> <br/> 
           {cartitem.product.name}
        </td> 
        <td>
          <br/>
          {cartitem.quantity}
        </td>
        <td>
          <br/>
           {cartitem.product.price} 
        </td>
        <td>
          <br/>
          {cartitem.product.price * cartitem.quantity} 
        </td>

      </tr>

  )
}

export default OrderItem