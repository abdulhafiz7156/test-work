import './App.css';
import SignUp from './pages/signup/SignUp.tsx';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './UserContext.tsx';
import Home from './pages/home/Home.tsx';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function App() {
    return (
        <Router>
            <GoogleOAuthProvider clientId="1041924221263-bvm79ds6tmdffeeg46dh7atehusbskg0.apps.googleusercontent.com">
                <UserProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<RedirectToSignUp />} />
                    </Routes>
                </UserProvider>
            </GoogleOAuthProvider>
        </Router>
    );
}

function RedirectToSignUp() {
    const navigate = useNavigate();

    useEffect(() => {
        const formData = Cookies.get('formData');
        if (!formData) {
            navigate('/signup');
        }
    }, [navigate]);

    return <Home />;
}

export default App;