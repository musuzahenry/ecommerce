import React, { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import api from '../../api'
import { toast } from 'react-toastify'
import Spinner from '../ui/Spinner'
import Error from '../ui/Error'
import { AuthContext } from '../../context/AuthContext'
 

const LoginPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const { setIsAuthenticated } = useContext(AuthContext)
   

    function handleSubmit(e){
        e.preventDefault()  
        setLoading(true)

        api.post("/api/token/", {"username":username, "password":password})
             .then((res)=>{
                toast.success("Success, you have logged in")
                //console.log(res.data)
                localStorage.setItem("access", res.data.access)
                localStorage.setItem("refresh", res.data.refresh)                
                setUsername("")
                setPassword("")
                setErrorMessage("")             
                setLoading(false)
                //navigate to were user had clicked
                const from = location.state?.from?.pathname || "/"
                navigate(from, {replace:true}) 
                setIsAuthenticated(true)              
             })
            .catch((error)=>{
            setLoading(false)

            if (error.response && error.response.status === 401) {
               setErrorMessage("Invalid username or password. Please try again.");
               toast.error("Invalid credentials");
            }else{
               console.log(error.message)
               setErrorMessage(error.message)
            }
            //clear password field
            setPassword("")
        });
    }


  // if page still loading let user see spinner
  if (loading){
    return (
        <Spinner />
    )
  }

  //otherwise return login page
  return (
    <div className="row my-md-5 m-sm-2">
        <div className='col-12 col-md-4'></div>

        { errorMessage && <Error message = {errorMessage} /> }

        <form className="col-12 col-md-4 shadow px-2 py-5" onSubmit = {handleSubmit} method='POST'>
           
           <div className="col-12 col-md-12 text-center">
            <h1 className='display-6'>Welcome Back</h1>
            <p>Please Log Into Your account</p>
           </div>

            <div className="form-group row px-1">
                <label htmlFor="username" className="col-12 col-md-12 col-form-label ">Username</label>
                <div className="col-12 col-md-12">
                <input 
                    name="username" type="text" 
                    className="form-control border" 
                    id="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"  
                    />
                </div>
            </div>
            <div className="form-group row px-1">
                <label htmlFor="inputPassword" className="col-12 col-md-12 col-form-label ">Password</label>
                <div className="col-12 col-md-12">
                <input 
                     type="password" name="password" 
                     className="form-control border" 
                     value = {password} onChange = {(e)=>setPassword(e.target.value)}
                     id="inputPassword" 
                     placeholder="Password" 
                     />
                </div>
            </div>

            <div className="form-group row px-1">

                <div className="col-sm-10 my-4 px-2 text-center w-100 d-flex justify-content-center">
                     <button className='btn btn-primary w-100' type="submit" >Login</button>
                </div>
            </div>

           <div className="col-12 col-md-12 text-center">
              <p className='m-1'><Link to="#">Forgot password?</Link></p>
              <p className='m-1'>Don't have an account? <Link to="#">Signup</Link></p>
           </div>

        </form>
        
    </div>
  )
}

export default LoginPage


