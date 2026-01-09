import react from "react"
import HomeCard from "./HomeCard"


const CardContainer = ({products})=>{
    return (
        <div className="shop row"> 

            {
                products.map((product)=> {
                return <HomeCard key={product.id} product = {product} />
            })
            }
                
        </div>
    );
}


export default CardContainer