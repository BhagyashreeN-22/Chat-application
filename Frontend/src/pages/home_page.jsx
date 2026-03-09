import { useNavigate } from "react-router-dom"
import "../pages_css/home_page_css.css"

const HomePage = ()=>{
    const navigate =useNavigate();
    const handleRegister=(e)=>{
        e.preventDefault();
        navigate("/register");
    }
    const handleLogin=(e)=>{
        e.preventDefault();
        navigate("/login");
    }

    return(
        <div className="homePage-container">
            <h1 className="title-home">Welcome to mini - Social media app</h1>
          <div className="button-group">
            <button className="register" onClick={handleRegister}>Register</button>
            <button className="login" onClick={handleLogin}>Login</button>
          </div>
        </div>
    )
}

export default HomePage;