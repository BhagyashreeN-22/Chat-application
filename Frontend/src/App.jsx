import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home_page"
import RegisterPage from "./pages/register_page"
import LoginPage from "./pages/login_page"
import ProfilePage from "./pages/profile_page";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage/>}/>
    </Routes>
  );
}
export default App;