import React from 'react'
import { FaPaypal } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa6";
import FlutterWave from "./flutterwave.png"
import styles from "./PaymentSection.module.css"
import api from "../../api"

const PaymentSection = ({ cartTotal }) => {

  function makePayment(){
       api.post("initiate-payment/")
       .then((res)=>{
        console.log(res.data)
        window.location.href = res.data.data.link
       })
       .catch(e=>{
        console.log(e.message)
       })
  }


  return (
    <div className='row'>

      <div className='col-12'>
        <div className='card'>

            <div className='card-header bg-primary text-white'>Payment Options</div>

            <div className='card-body '>       
                <button 
                  onClick = {makePayment}
                  className='btn btn-warning text-white m-1 w-100'>
                  <img height='10' src={FlutterWave} alt="FlutterWave" />
                   &nbsp; FlutterWave
                </button>
                <button className='btn btn-primary text-white m-1 w-100'>
                  <FaPaypal /> 
                  &nbsp; PayPal
                </button>

                <button className='btn btn-info text-white m-1 w-100'>
                  <FaGooglePay /> 
                  &nbsp; GooglePay
                </button>
            </div>

          <div className='card-footer'>
            Total: ${cartTotal.toFixed(2)}  
          </div>

         </div>
        </div>
    </div>
  )
}

export default PaymentSection