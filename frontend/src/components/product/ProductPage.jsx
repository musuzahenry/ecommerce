import react  from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPagePlaceHolder from "./ProductPagePlaceHolder";
import RelatedProducts from "./RelatedProducts";
import api, { BASE_URL } from "../../api";
import Error from "../ui/Error";
import { toast } from 'react-toastify';



const ProductPage = ({setNumCartItems}) =>{

    const { slug } = useParams()
    const [product, setProduct] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [itemInCart, setItemInCart] = useState(false)
    const cart_code = localStorage.getItem("cart_code")
    const new_items = {cart_code:cart_code, product_id:product.id}


    function add_item(){
        api.post("add-item", new_items).then((res) => {
            console.log(res.data)
            setItemInCart(true)
            setNumCartItems(curr => curr + 1)
            toast.success("Product added successfully")
        }).catch((error) =>{
            console.log(error.message)
        })

    }

   
    useEffect(function(){
        api.get(`product-detail/${slug}`).then((res) => {
            setProduct(res.data)  
            setLoading(false)
        }).catch((error)=>{
            setLoading(true)
            setErrorMessage(error.message)
        })    
        } 
        ,[slug, cart_code, product]
        )
    
    
    useEffect(function(){
        if(product.id){
            api.get(`product-in-cart?cart_code=${cart_code}&product_id=${product.id}`).then((res) => {
                console.log(res.data)  
                setItemInCart(res.data.product_exists_in_cart)
            }).catch((error)=>{
                setLoading(true)
                setErrorMessage(error.message)
            })  
        }  
        } 
        ,[cart_code, product.id]
        )



    return (
      <div className="row">  
        <h2 className="my-10 text-center d-block">Product Details</h2>
        {errorMessage && <Error message = {errorMessage} />}
        {loading && <ProductPagePlaceHolder /> }
        
        { product && 
        <>
                <div className="row w-100 d-flex justify-content-center align-items-center">

                <div className="col-md-6 card border-0 p-50" >
                    <div className='card-header'>
                        <h3>{ product.name }</h3>
                        <p>CATEGORY: <b><i>{ product.category }</i></b></p>
                    </div>
                    <div className='card-body'>
                        <img className="img-fluid" src= {`${BASE_URL}${product.image}`} />                     
                    </div>
                </div>

                <div className="col-md-6 card border-0 p-50">
                    <div>
                       { product.description }
                        <p><b><em>{ ` $${product.price} `}</em></b></p>
                    </div>

                    <div className='card-footer'>
                        <p className="g-5">
                            <button 
                            onClick = {add_item} 
                            disabled = {itemInCart}
                            className="btn btn-success color-white mx-1">
                            { itemInCart ? "Product Added To Cart ": "Add To Cart"}
                            </button>
                        </p>
                    </div>
                </div>
                </div>

            <h2 className="my-50 text-center d-block">Related Products</h2>
            <RelatedProducts key ={product.id} products = {product.similar_products} /> 
        </>
        }
      </div>);
}

export default ProductPage