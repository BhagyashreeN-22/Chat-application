import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "../pages_css/register_page_css.css"
import axios from "axios"

const RegisterPage =()=>{
 const navigate =useNavigate();
 const [formData ,setformData] = useState({
    userName : "",
    email :"",
    password :""
 });
 const [error,setError] = useState("");
 const [loading,setLoading] =useState(false);

 const handleChange =(e)=>{
    setformData ({
        ...formData,
        [e.target.name]: e.target.value,
    });
 }
 const handleSubmit =async (e)=>{
   e.preventDefault();
   setError("");
   setLoading(true);
   try{
    const response = await axios.post( "http://localhost:5000/auth/register",formData);
    navigate("/login");
   }catch(error){
    setError(
        error.response?.data?.message || 
        error.message || 
        "Register failed"
    );
    }
   finally{
    setLoading(false);
   }
 }
 return(
    <div className="register-container">
        <div className="register-div">
            <h1>Create Account</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <input 
                type="text"
                name = "userName"
                placeholder="Enter your name"
                value = {formData.userName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
               />
               <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
               />
               <button className="register-submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
               </button>
            </form>
        </div>
    </div>
 )
};

export default RegisterPage;