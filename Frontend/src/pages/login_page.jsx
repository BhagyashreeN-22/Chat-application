import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../pages_css/login_page_css.css"

const LoginPage = ()=>{
    const navigate =useNavigate()
    const [formData,setformData] = useState({
        email:"",
        password:""
    });
    const [error,setError]= useState("");
    const [loading,setLoading] =useState(false);
    const handleChange =(e)=>{
    setformData ({
        ...formData,
        [e.target.name]: e.target.value,
    });
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
        const response = await axios.post("http://localhost:5000/auth/login",formData);
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("userName",response.data.user.userName)
        navigate("/profile")
        }
        catch (error) {
        setError(
            error.response?.data?.message || 
            error.message || 
            "Login failed"
        );
        }
        finally{
            setLoading(false)
        }
    }
    return(
        <div className="login-page">
           <h1 className="title">Login</h1>
           <form className="login-form" onSubmit={handleSubmit}>
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
               <button className="login-submit" disabled={loading}>
                {loading ? "loging in..." : "logging"}
               </button>
            </form>
        </div>
    )

}
export default LoginPage;