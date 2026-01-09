import react from "react"
import { Link } from "react-router-dom"


const NotFoundPage = () =>{
    return(
        <>
           <h1>Sorry resource not found</h1>
           <p>
            <Link to="/" className="btn btn-light btn-lg">
             Back
            </Link>
           </p>

        </>
    )
}

export default NotFoundPage