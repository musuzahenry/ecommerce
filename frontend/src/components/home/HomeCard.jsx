import react from "react"
import styles from "./HomeCard.module.css"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../api";



const HomeCard = ({product}) =>{

    
    return (
        <div className="col-md-3">
            <div className="card p-1 my-2 my-sm-3">
                <img width='100%'height='200' className= "card-img-top" src= {`${BASE_URL}${product.image}`} />
            
            <div className="card-body">
                <div className="card-title">
                <h3>{ product.name }</h3>
                </div>
                <div >
                
                </div>
                <div>
                { product.description && product.description.slice(0,100) }
                </div>
                <p>{ ` $${product.price} `}</p>
                <p className="g-5">
                    <Link to={ `/products/${product.slug}` } className="btn btn-info color-white mx-1">See Details</Link>
                </p>
            </div>


            </div>

        </div>
        
    );
}


export default HomeCard